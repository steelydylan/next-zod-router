#! /usr/bin/env node
const { program } = require('commander');
const { main } = require('./lib/index.js');
const path = require('path');

program
  .option('-p, --pagesDir <dir>', '--pagesDir <path>', path.resolve("pages"))
  .option('-b, --baseDir <dir>', '--baseDir <path>', path.resolve("."))
  .option('-d, --distDir <dir>', '--distDir <path>', path.resolve("node_modules/.next-typed-connect"))
  .option('-m, --moduleNameSpace <dir>', '--moduleNameSpace <path>', ".next-typed-connect")
program.parse(process.argv);
const options = program.opts();
main(options);