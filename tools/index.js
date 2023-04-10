#! /usr/bin/env node
const rimraf = require('rimraf');

// Clean up the dist folder
rimraf.sync('./types/pages/api');
require('./lib/index.js');
