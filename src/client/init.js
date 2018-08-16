import { AergoRPCServiceClient as WebClient } from '../../types/web/rpc_pb_service.js';
import { AergoRPCServiceClient as NodeClient} from '../../types/rpc_grpc_pb.js';
import grpc from 'grpc';

export function initClientWeb(AergoClient) {
    AergoClient.prototype.initClient = (config) => {
        return new WebClient('http://' + config.url); 
    };
}

export function initClientNode(AergoClient) {
    AergoClient.prototype.initClient = (config) => {
        return new NodeClient(config.url, grpc.credentials.createInsecure()); 
    };
}