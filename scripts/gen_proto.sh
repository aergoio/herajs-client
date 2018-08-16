#!/bin/bash
REPOPATH=`go env GOPATH`/src/github.com/aergoio/aergo

protoc \
    --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
    --ts_out=service=true:./types/web/ \
    --js_out=import_style=commonjs,binary:./types/web/ \
    --proto_path=$REPOPATH/types rpc.proto account.proto blockchain.proto node.proto

grpc_tools_node_protoc --js_out=import_style=commonjs,binary:./types/ \
		--grpc_out=./types/ --plugin=protoc-gen-grpc=`which grpc_tools_node_protoc_plugin` \
		--proto_path=$REPOPATH/types rpc.proto account.proto blockchain.proto node.proto