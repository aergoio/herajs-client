import { Personal, Empty, Account, TxBody, Tx } from '../../types/rpc_pb.js';
import { txToTransaction } from '../transactions/utils.js';
import base58check from 'base58check';

class Accounts {
    constructor (aergo) {
        this.client = aergo.client;
    }
    
    create (passphrase) {
        return new Promise((resolve, reject) => {
            const personal = new Personal();
            personal.setPassphrase(passphrase);
            try {
                this.client.createAccount(personal, (err, rsp) => {
                    if (err) {
                        reject(err);
                    } else {
                        const createdAddress = rsp.getAddress_asU8();
                        resolve(base58check.encode(Buffer.from(createdAddress), '42'));
                    }
                });
            } catch (exception) {
                reject(exception);
            }
        });
    }

    get () {
        return new Promise((resolve, reject) => {
            const empty = new Empty();
            try {
                this.client.getAccounts(empty, (err, rsp) => {
                    if (err) {
                        reject(err);
                    } else {
                        const accounts = rsp.getAccountsList();
                        const addresses = accounts.map(account => base58check.encode(Buffer.from(account.getAddress_asU8()), '42'));
                        resolve(addresses);
                    }
                });
            } catch (exception) {
                reject(exception);
            }
        });
    }

    unlock (address, passphrase) {
        return new Promise((resolve, reject) => {
            const account = new Account();
            account.setAddress(base58check.decode(address).data);

            const personal = new Personal();
            personal.setPassphrase(passphrase);
            personal.setAccount(account);

            try {
                this.client.unlockAccount(personal, (err, rsp) => {
                    if (err) {
                        reject(err);
                    } else {
                        const createdAddress = rsp.getAddress_asU8();
                        resolve(base58check.encode(Buffer.from(createdAddress), '42'));
                    }
                });
            } catch (exception) {
                reject(exception);
            }
        });
    }

    lock (address, passphrase) {
        return new Promise((resolve, reject) => {
            const account = new Account();
            account.setAddress(base58check.decode(address).data);

            const personal = new Personal();
            personal.setPassphrase(passphrase);
            personal.setAccount(account);

            try {
                this.client.lockAccount(personal, (err, rsp) => {
                    if (err) {
                        reject(err);
                    } else {
                        const createdAddress = rsp.getAddress_asU8();
                        resolve(base58check.encode(Buffer.from(createdAddress), '42'));
                    }
                });
            } catch (exception) {
                reject(exception);
            }
        });
    }


    signTransaction (tx) {
        return new Promise((resolve, reject) => {
            const msgtxbody = new TxBody();
            msgtxbody.setNonce(tx.nonce);
            msgtxbody.setAccount(base58check.decode(tx.from).data);
            msgtxbody.setRecipient(base58check.decode(tx.to).data);
            msgtxbody.setAmount(tx.amount);
            msgtxbody.setPayload(tx.payload);
            msgtxbody.setType(tx.type);

            const msgtx = new Tx();
            msgtx.setBody(msgtxbody);

            this.client.signTX(msgtx, (err, signedtx) => {
                if (err == null) {
                    resolve(txToTransaction(signedtx));
                } else {
                    reject(err);
                }
            });
        });
    }
}



export default Accounts;