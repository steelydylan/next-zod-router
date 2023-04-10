#! /usr/bin/env node
const rimraf = require('rimraf');

// Clean up the dist folder
rimraf.sync('./types/pages/api');

// Locate d.ts files
require('ts-node').register({
  compilerOptions: {
    "target": "es5",
    "module": "commonjs",
    "moduleResolution": "node",
    "allowJs": true,
    "strict": true,
    "esModuleInterop": true,
    "rootDir": "src",
    "outDir": "./dist"
  }
});
require('./src/index.ts');