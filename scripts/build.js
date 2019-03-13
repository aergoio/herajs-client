/* eslint-disable */
import { existsSync, mkdirSync, writeFile } from "fs";
import { relative } from "path";
import { gzip } from "zlib";
import { rollup } from "rollup";
import { minify } from "uglify-js";

if (!existsSync("dist")) {
    mkdirSync("dist");
}

let builds = require("./config").getAllBuilds();

build(builds);

function build (builds) {
    let built = 0;
    const total = builds.length;
    const next = () => {
        buildEntry(builds[built]).then(() => {
            built++;
            if (built < total) {
                next();
            }
        }).catch(logError);
    };

    next();
}

function buildEntry (config) {
    const output = config.output;
    const { file, banner } = output;
    const isProd = /min\.js$/.test(file);
    return rollup(config).then(bundle => bundle.generate(output)).then(({ output }) => {
        if (isProd) {
            return write(file, (banner ? banner + "\n" : "") + output[0].code, true);
        } else {
            return write(file, output[0].code);
        }
    });
}

function write (dest, code, zip) {
    return new Promise((resolve, reject) => {
        function report (extra) {
            console.log(blue(relative(process.cwd(), dest)) + " " + getSize(code) + (extra || ""));
            resolve();
        }

        writeFile(dest, code, err => {
            if (err) return reject(err);
            if (zip) {
                gzip(code, (err, zipped) => {
                    if (err) return reject(err);
                    report(" (gzipped: " + getSize(zipped) + ")");
                });
            } else {
                report();
            }
        });
    });
}

function getSize (code) {
    return (code.length / 1024).toFixed(2) + "kb";
}

function logError (e) {
    console.log(e);
}

function blue (str) {
    return "\x1b[1m\x1b[34m" + str + "\x1b[39m\x1b[22m";
}