import base58check from 'base58check';
import rpcTypes from '../client/types.js';
import { toHexString, fromHexString } from '../utils.js';

/*
tansaction = {
    hash : byte of base64 
    nonce : uint
    from : byte of base58
    to : byte of base58
    amount : uint
    payload : byte of base64
    sign : byte of base64
    type : int
}
*/

export function transactionToTx(tx) {
    const msgtxbody = new rpcTypes.TxBody();
    msgtxbody.setNonce(tx.nonce);
    msgtxbody.setAccount(base58check.decode(tx.from).data);
    msgtxbody.setRecipient(base58check.decode(tx.to).data);
    msgtxbody.setAmount(tx.amount);
    if (tx.payload != null) {
        msgtxbody.setPayload(tx.payload);
    }
    msgtxbody.setSign(tx.sign);
    msgtxbody.setType(tx.type);
    const msgtx = new rpcTypes.Tx();

    if (tx.hash != null) {
        msgtx.setHash(tx.hash);
    }
    msgtx.setBody(msgtxbody);

    return msgtx;
}

export function txToTransaction(tx) {
    const transaction = {};
    transaction.hash = tx.getHash_asB64();
    transaction.nonce = tx.getBody().getNonce();
    transaction.from = base58check.encode(Buffer.from(tx.getBody().getAccount_asU8()), '42');
    transaction.to = base58check.encode(Buffer.from(tx.getBody().getRecipient_asU8()), '42');
    transaction.amount = tx.getBody().getAmount();
    transaction.payload = tx.getBody().getPayload();
    transaction.sign = tx.getBody().getSign_asB64();
    transaction.type = tx.getBody().getType();
    return transaction;
}

