#!/bin/bash
REPOPATH=`go env GOPATH`/src/github.com/aergoio/aergo/

protoc \
    --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
    --ts_out=service=true:./types/ \
    --js_out=import_style=commonjs,binary:./types/ \
    --proto_path=$REPOPATH/types/ rpc.proto account.proto blockchain.proto node.proto
