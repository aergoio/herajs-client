import rpcTypes from './client/types.js';
const CommitStatus = rpcTypes.CommitStatus;

const fromHexString = hexString => new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));

const toHexString = bytes => bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');

const fromNumber = (d) => {
    if (d >= Math.pow(2, 64)) {
        throw new Error('Number exeeds uint64 range');
    }
    const arr = new Uint8Array(8);
    for (let i=0, j=1; i<8; i++, j *= 0x100) {
        arr[i] = (d / j) & 0xff;
    }
    return arr;
};

const toBytesUint32 = (num) => {
    const arr = new ArrayBuffer(8);
    const view = new DataView(arr);
    view.setUint32(0, num, true); // byteOffset = 0; litteEndian = true
    return arr;
};

const errorMessageForCode = (code) => {
    let errorMessage = 'UNDEFINED_ERROR';
    if (code && code < Object.values(CommitStatus).length) {
        errorMessage = Object.keys(CommitStatus)[Object.values(CommitStatus).indexOf(code)];
    }
    return errorMessage;
};

export {
    fromHexString,
    toHexString,
    fromNumber,
    toBytesUint32,
    errorMessageForCode
};