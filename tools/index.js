#! /usr/bin/env node
const rimraf = require('rimraf');

// Clean up the dist folder
rimraf.sync('node_modules/.next-typed-connect');
const pkg = {
  name: ".next-typed-connect",
  version: "1.0.0",
  types: "index.d.ts"
}
require('fs').mkdirSync('node_modules/.next-typed-connect');
require('fs').writeFileSync('node_modules/.next-typed-connect/package.json', JSON.stringify(pkg, null, 2));
require('./lib/index.js');
