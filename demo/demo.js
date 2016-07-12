// native dependencies
const fs   = require('fs');
const path = require('path');

// third-party dependencies
const Bluebird = require('bluebird');

const Inspector = require('../lib');

/**
 * Instantiate a Inspector
 * @type {Inspector}
 */
var inspector = new Inspector();

window.inspector = inspector;
