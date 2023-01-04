#!/usr/bin/node

import uglifyjs from 'uglify-js';
import PackageJSON from '../package.json' assert { type: "json" };
import fs from 'fs';

import esbuild from 'esbuild';

// clear dist folder
fs.rmSync("./dist", { recursive: true, force: true });

const banner = `// ==UserScript==
// @name         ${PackageJSON.name}
// @namespace    ${PackageJSON.homepage}
// @version      ${PackageJSON.version}
// @description  ${PackageJSON.description}
// @author       ${PackageJSON.author}
// @match        https://rey.fm/*
// @grant        none
// ==/UserScript==`;

const commonOpts = {
    logLevel: "info",
    bundle: true,
    minify: true,
    sourcemap: false,
    legalComments: "linked",
    tsconfig: "./tsconfig.json"
};


const browserCommonOpts = {
    ...commonOpts,
    format: "iife",
    platform: "browser",
    target: ["esnext"],
    minify: true,
    bundle: true,
};


await esbuild.build({
    ...browserCommonOpts,
    entryPoints: ["./src/index.ts"],
    outfile: "./dist/final/reyfm.user.js",
})


// add banner to minified file

const minified = fs.readFileSync("./dist/final/reyfm.user.js", "utf8");
fs.writeFileSync("./dist/final/reyfm.user.js", banner + "\n" + minified);