import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
const assert = chai.assert;

import AergoClient from '../src';
import Address from '../src/models/address';

import { longPolling } from '../src/utils';

import JSBI from 'jsbi';

const waitFor = (ms) => new Promise(resolve => {
    setTimeout(resolve, ms);
});

describe('Aergo.Accounts', () => {
    const aergo = new AergoClient(); //default connect to 127.0.0.1:7845
    let testAddress: string | Address = 'INVALIDADDRESS';
    beforeEach(async ()=>{
        const created = await aergo.accounts.create('testpass');
        const unlocked = await aergo.accounts.unlock(created, 'testpass');
        assert.deepEqual(created.value, unlocked.value);
        testAddress = unlocked;
    });

    describe('create()', () => {
        it('should return created base58 encoded address', async () => {
            testAddress = await aergo.accounts.create('testpass');
            assert.isString(testAddress.toString());
        });
    });

    describe('get()', () => {
        it('should return address list in the aerge node', (done) => {
            aergo.accounts.get().then((accounts) => {
                assert.isArray(accounts);
                done();
            });
        });
    });

    describe('unlock()', () => {
        it('should return unlocked address', (done) => {
            aergo.accounts.unlock(testAddress, 'testpass').then((address) => {
                assert.isString(address.toString());
                done();
            });
        });
    });

    describe('lock()', () => {
        it('should return locked address', (done) => {
            aergo.accounts.lock(testAddress, 'testpass').then((address) => {
                assert.isString(address.toString());
                done();
            });
        });
    });

    describe('sendTransaction()', () => {
        it('should return hash for signed and comitted tx', async () => {
            await aergo.accounts.unlock(testAddress, 'testpass');
            const testtx = {
                from: testAddress,
                to: testAddress,
                amount: '123 aer',
                chainIdHash: await aergo.getChainIdHash()
            };
            return aergo.accounts.sendTransaction(testtx)
                .then((txhash) => {
                    assert.typeOf(txhash, 'string');
                });
        });
        it('should send to a name', async () => {
            const name = '' + (Math.random() * 99999999999 + 100000000000).toFixed(0);
            await aergo.accounts.unlock(testAddress, 'testpass');
            const testtx = {
                from: testAddress,
                to: 'aergo.name',
                amount: '1 aergo',
                payload: `{"Name":"v1createName","Args":["${name}"]}`,
                type: 1,
                chainIdHash: await aergo.getChainIdHash()
            };
            const txhash = await aergo.accounts.sendTransaction(testtx);
            await longPolling(async () => {
                return await aergo.getTransaction(txhash);
            }, result => 'block' in result, 2000);

            const testtx2 = {
                from: testAddress,
                to: name,
                chainIdHash: await aergo.getChainIdHash()
            };
            await aergo.accounts.sendTransaction(testtx2);
        });
    });

    describe('signTX()', () => {
        it('should return tx which has a unlocked account sign', async () => {
            const testtx = {
                nonce: 1,
                from: testAddress,
                to: testAddress,
                amount: '123 aer',
                payload: null,
                chainIdHash: await aergo.getChainIdHash()
            };
            return aergo.accounts.signTransaction(testtx)
                .then((result) => {
                    assert.equal(testtx.nonce, result.nonce);
                    assert.deepEqual(testtx.from.toString(), result.from.toString());
                    assert.typeOf(result.sign, 'string');
                    assert.equal(result.sign.length, 96);
                });
        });
    });

    describe('sendSignedTransaction()', () => {
        it('should sign, commit, and retrieve transaction', async () => {
            const createdAddress = await aergo.accounts.create('testpass');
            const address = await aergo.accounts.unlock(createdAddress, 'testpass');
            assert.deepEqual(address.value, createdAddress.value);
            const testtx = {
                nonce: 1,
                from: address,
                to: address,
                amount: '123 aer',
                payload: null,
                chainIdHash: await aergo.getChainIdHash()
            };
            // Tx is signed and submitted correctly
            const tx = await aergo.accounts.signTransaction(testtx);
            const txhash = await aergo.sendSignedTransaction(tx);
            assert.typeOf(txhash, 'string');

            // Tx can be retrieved again from mempool
            await waitFor(500);
            const tx2 = await longPolling(async () => {
                return await aergo.getTransaction(txhash);
            }, result => 'block' in result, 5000);
            assert.equal(tx2.tx.hash, tx.hash);
            assert.isTrue(JSBI.equal(tx2.tx.amount.value, tx.amount.value));

            // Tx has receipt
            const txReceipt = await aergo.getTransactionReceipt(tx.hash);
            assert.isTrue(txReceipt.fee.equal(0));
            assert.isTrue(txReceipt.cumulativefee.equal(0));
            assert.equal(txReceipt.blockhash, tx2.block.hash);

            // Submitting same tx again should error
            return assert.isRejected(aergo.sendSignedTransaction(tx));
        });
        it('should catch a max payload error', async () => {
            const createdAddress = await aergo.accounts.create('testpass');
            const address = await aergo.accounts.unlock(createdAddress, 'testpass');
            assert.deepEqual(address.value, createdAddress.value);
            const testtx = {
                nonce: 1,
                from: address,
                to: address,
                amount: '123 aer',
                payload: Buffer.allocUnsafe(250000).fill(1),
                chainIdHash: await aergo.getChainIdHash()
            };
            const tx = await aergo.accounts.signTransaction(testtx);
            return assert.isRejected(
                aergo.sendSignedTransaction(tx),
                Error, 'UNDEFINED_ERROR: size of tx exceeds max length'
            );
        });
    });

    describe('signTX(),sendSignedTransaction()Multiple', () => {
        it('should not timeout', async () => {
            const createdAddress = await aergo.accounts.create('testpass');
            const address = await aergo.accounts.unlock(createdAddress, 'testpass');
            for (let i = 1; i <= 20; i++) {
                const testtx = {
                    nonce: i,
                    from: address,
                    to: createdAddress,
                    amount: `${i} aer`,
                    chainIdHash: await aergo.getChainIdHash()
                };
                const signedtx = await aergo.accounts.signTransaction(testtx);
                const txhash = await aergo.sendSignedTransaction(signedtx);
                assert.typeOf(txhash, 'string');
            }
        }).timeout(10000);
    });

    describe('getNameInfo()', () => {
        it('should return account information for name', async () => {
            const name = '' + (Math.random() * 99999999999 + 100000000000).toFixed(0);
            await aergo.accounts.unlock(testAddress, 'testpass');
            const testtx = {
                from: testAddress,
                to: 'aergo.name',
                amount: '1 aergo',
                payload: `{"Name":"v1createName","Args":["${name}"]}`,
                type: 1,
                chainIdHash: await aergo.getChainIdHash()
            };
            const txhash = await aergo.accounts.sendTransaction(testtx);
            await longPolling(async () => {
                return await aergo.getTransaction(txhash);
            }, result => 'block' in result, 2000);

            const info = await aergo.getNameInfo(name);
            assert.equal(info.owner.toString(), testAddress);
            assert.equal(info.destination.toString(), testAddress);
        });
    });

    describe('staking', () => {
        let testaddress;

        it('should stake', async () => {
            const info = await aergo.getChainInfo();

            testaddress = await aergo.accounts.create('testpass');
            await aergo.accounts.unlock(testaddress, 'testpass');
            const testtx = {
                from: testaddress,
                to: 'aergo.system',
                amount: info.stakingminimum,
                payload: '{"Name":"v1stake"}',
                type: 1,
                chainIdHash: await aergo.getChainIdHash()
            };
            const txhash = await aergo.accounts.sendTransaction(testtx);
            await longPolling(async () => {
                return await aergo.getTransaction(txhash);
            }, result => 'block' in result, 2000);
        }).timeout(2500);

        /*it('should return staking info', async () => {
            const state = await aergo.getStaking(testaddress);
            assert.equal(state.amount.toUnit('aergo').toString(), '1 aergo');
            assert.isTrue(state.when > 0);
        });*/
    });
});