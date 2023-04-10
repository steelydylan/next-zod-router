#! /usr/bin/env node

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