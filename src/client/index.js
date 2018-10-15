import Accounts from '../accounts';
import rpcTypes from './types.js';
import { fromHexString, toHexString, fromNumber, toBytesUint32, errorMessageForCode } from '../utils.js';
import promisify from '../promisify.js';
import { transactionToTx, txToTransaction, decodeTxHash, encodeTxHash } from '../transactions/utils.js';
import { decodeAddress } from '../accounts/utils.js';


const CommitStatus = rpcTypes.CommitStatus;
export { CommitStatus };

/**
 * Main aergo client controller.
 */
class AergoClient {
    /**
     * Create a new auto-configured client with:
     * 
     * .. code-block:: javascript
     * 
     *     import AergoClient from 'herajs';
     *     const aergo = new AergoClient();
     * 
     * @param [object] configuration. Unused at the moment.
     * @param [Provider] custom configured provider. By default a provider is configured automatically depending on the environment.
     */
    constructor (config, provider = null) {
        this.version = 0.1;
        this.config = {
            ...config
        };
        this.client = provider || this.defaultProvider();
        this.accounts = new Accounts(this);
    }

    defaultProvider() {
        // Platform-specific override, see ../platforms/**
        // for auto-configuration of a provider.
        // Can also manually pass provider to constructor.
    }

    /**
     * Set a new provider
     * @param {Provider} provider
     */
    setProvider(provider) {
        this.client = provider;
    }

    getConfig () {
        return this.config;
    }

    isConnected () {
        return false;
    }

    /**
     * Request current status of blockchain.
     * @returns {Promise<object>} an object detailing the current status
     */
    blockchain () {
        const empty = new rpcTypes.Empty();
        return promisify(this.client.blockchain, this.client)(empty).then(result => ({
            ...result.toObject(),
            bestBlockHash: toHexString(result.getBestBlockHash_asU8())
        }));
    }

    /**
     * Get transaction information in the aergo node. 
     * If transaction is in the block return result with block hash and index.
     * @param {string} txhash transaction hash
     * @returns {Promise<object>} transaction details
     */
    getTransaction (txhash) {
        const singleBytes = new rpcTypes.SingleBytes();
        singleBytes.setValue(decodeTxHash(txhash));
        return new Promise((resolve, reject) => {
            this.client.getBlockTX(singleBytes, (err, result) => {
                if (err) {
                    this.client.getTX(singleBytes, (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            const res = {};
                            res.tx = txToTransaction(result);
                            resolve(res);
                        }
                    });
                } else {
                    const res = {};
                    res.block = result.getTxidx().toObject();
                    res.block.hash = toHexString(result.getTxidx().getBlockhash_asU8());
                    res.tx = txToTransaction(result.getTx());
                    resolve(res);
                }
            });
        });
    }

    /**
     * Retrieve information about a block.
     * 
     * @param {string|number} hashOrNumber either 32-byte block hash encoded as a hex string or block height as a number.
     * @returns {Promise<object>} block details
     */
    getBlock (hashOrNumber) {
        if (typeof hashOrNumber === 'string') {
            hashOrNumber = fromHexString(hashOrNumber);
            if (hashOrNumber.length != 32) {
                throw new Error('Invalid block hash. Must be 32 byte encoded in hex. Did you mean to pass a block number?');
            }
        } else
        if (typeof hashOrNumber === 'number') {
            hashOrNumber = fromNumber(hashOrNumber);
        }
        const singleBytes = new rpcTypes.SingleBytes();
        singleBytes.setValue(hashOrNumber);
        return promisify(this.client.getBlock, this.client)(singleBytes).then(result => {
            const obj = result.toObject();
            obj.hash = toHexString(result.getHash_asU8());
            obj.header.prevblockhash = toHexString(result.getHeader().getPrevblockhash_asU8());
            obj.body.txsList = result.getBody().getTxsList().map(tx => txToTransaction(tx));
            return obj;
        });
    }

    /**
     * Retrieve the last n blocks, beginning from given block .
     * 
     * @param {string|number} hashOrNumber either 32-byte block hash encoded as a hex string or block height as a number.
     * @param {number} size number of blocks to return
     * @returns {Promise<object[]>} list of block headers
     */
    getBlockHeaders (hashOrNumber, size = 10, offset = 0, desc = true) {
        const params = new rpcTypes.ListParams();
        if (typeof hashOrNumber === 'string') {
            hashOrNumber = fromHexString(hashOrNumber);
            if (hashOrNumber.length != 32) {
                throw new Error('Invalid block hash. Must be 32 byte encoded in hex. Did you mean to pass a block number?');
            }
            params.setHash(hashOrNumber);
        } else
        if (typeof hashOrNumber === 'number') {
            params.setHeight(hashOrNumber);
        } else {
            throw new Error('Block hash or number required.');
        }
        params.setSize(size);
        params.setOffset(offset);
        params.setAsc(!desc);
        return promisify(this.client.listBlockHeaders, this.client)(params).then(result => {
            return result.getBlocksList().map(item => {
                const obj = item.toObject();
                obj.hash = toHexString(item.getHash_asU8());
                obj.header.prevblockhash = toHexString(item.getHeader().getPrevblockhash_asU8());
                return obj;
            });
        });
    }

    getBlockStream () {
        const empty = new rpcTypes.Empty();
        const stream = this.client.listBlockStream(empty);
        try {
            stream.on('error', (error) => {
                if (error.code === 1) { // grpc.status.CANCELLED
                    return;
                }
            });
        } catch (e) {
            // ignore. 'error' does not work on grpc-web implementation
        }
        return stream;
    }
    
    /**
     * Retrieve account state, including current balance and nonce.
     * @param {string} address Account address encoded in Base58check
     * @returns {Promise<object>} account state
     */
    getState (address) {
        const singleBytes = new rpcTypes.SingleBytes();
        singleBytes.setValue(Buffer.from(decodeAddress(address)));
        return promisify(this.client.getState, this.client)(singleBytes).then(state => state.toObject());
    }
    
    getNonce(address) {
        const singleBytes = new rpcTypes.SingleBytes();
        singleBytes.setValue(Buffer.from(decodeAddress(address)));
        return promisify(this.client.getState, this.client)(singleBytes).then(state => state.getNonce());
    }

    verifyTransaction (tx) {
        return promisify(this.client.verifyTX, this.client)(transactionToTx(tx));
    }

    /**
     * Send a signed transaction to the network.
     * @param {Transaction} tx signed transaction
     * @returns {Promise<string>} transaction hash
     */
    sendSignedTransaction (tx) {
        return new Promise((resolve, reject) => {
            const txs = new rpcTypes.TxList();
            txs.addTxs(transactionToTx(tx), 0);
            this.client.commitTX(txs, (err, result) => {
                if (err == null && result.getResultsList()[0].getError()) {
                    err = new Error();
                    err.code = result.getResultsList()[0].getError(); 
                    err.message = errorMessageForCode(err.code);
                }
                if (err) {
                    reject(err);
                } else {
                    resolve(encodeTxHash(result.getResultsList()[0].getHash()));
                }
            });
        });
    }

    getVoteResult(count) {
        const singleBytes = new rpcTypes.SingleBytes();
        singleBytes.setValue(new Uint8Array(toBytesUint32(count)));
        return promisify(this.client.getVotes, this.client)(singleBytes)
            .then(state => state.getVotesList());
    }

    getTransactionReceipt (hash, callback) { // eslint-disable-line
        return true;
    }
}

export default AergoClient;