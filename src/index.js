import AergoClient from './client';
import { initClientWeb, initClientNode } from './client/init.js';

const platformWeb = typeof process === 'undefined' || process.env.TARGET == 'web';
if (platformWeb) {
    initClientWeb(AergoClient);
} else {
    initClientNode(AergoClient);
}

export default AergoClient;