/* eslint-disable */
const path = require('path');
const node_resolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const json = require('rollup-plugin-json');
const builtins = require('rollup-plugin-node-builtins');
const globals = require('rollup-plugin-node-globals');
const progress = require('rollup-plugin-progress');
const version = process.env.VERSION || require('../package.json').version;

const banner =
  '/*!\n' +
  ' * herajs v' + version + '\n' +
  ' * (c) ' + new Date().getFullYear() + ' AERGO\n' +
  ' * Released under the MIT License.\n' +
  ' */';

const resolve = p => path.resolve(__dirname, '../', p);

const external = [
    'grpc',
    'google-protobuf',
    'google-protobuf/google/protobuf/timestamp_pb.js',
    'base-58',
    'grpc-web-client'
];

const builds = {
    // CommonJS build (CommonJS)
    'node-cjs': {
        entry: resolve('src/index.js'),
        dest: resolve('dist/herajs.common.js'),
        format: 'cjs',
        banner,
        external
    },
    // CommonJS build (ES Modules)
    'node-esm': {
        entry: resolve('src/index.js'),
        dest: resolve('dist/herajs.esm.js'),
        format: 'es',
        banner,
        external
    },
    // Development build (Browser)
    'web-dev': {
        entry: resolve('src/index.js'),
        dest: resolve('dist/herajs.js'),
        format: 'umd',
        env: 'development',
        banner,
        plugins: [
            node_resolve({
                jsnext: true,
                preferBuiltins: false
            })
        ],
        context: 'window'
    },
    // Production build (Browser)
    'web-prod': {
        entry: resolve('src/index.js'),
        dest: resolve('dist/herajs.min.js'),
        format: 'umd',
        env: 'production',
        banner,
        plugins: [
            node_resolve({
                jsnext: true,
                preferBuiltins: false
            })
        ],
        context: 'window'
    },
};

function genConfig (name) {
    const opts = builds[name];

    const namedExports = {
        [resolve('types/rpc_pb.js')]: 'Empty, Personal, Account, SingleBytes, TxList, TxBody, Tx, CommitStatus'.split(', ')
    };

    const config = {
        input: opts.entry,
        external: opts.external || [],
        plugins: [

            commonjs({
                include: [ 'types/**'  ],
                namedExports
            }),

            json(),

            //builtins(),

            babel({
                babelrc: false,
                exclude: 'node_modules/**',
                plugins: ['external-helpers', 'transform-object-rest-spread'],
                presets: [
                    ["env", {
                        "modules": false
                    }]
                ]
            }),

            progress(),
        ].concat(opts.plugins || []),
        output: {
            file: opts.dest,
            format: opts.format,
            banner: opts.banner,
            name: 'herajs'
        },
        context: opts.context || 'undefined'
    };

    Object.defineProperty(config, '_name', {
        enumerable: false,
        value: name
    });

    return config;
}

if (process.env.TARGET) {
    module.exports = genConfig(process.env.TARGET);
} else {
    exports.getBuild = genConfig;
    exports.getAllBuilds = () => Object.keys(builds).map(genConfig);
}