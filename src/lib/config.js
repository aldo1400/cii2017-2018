'use strict';

var fs = require('fs');
var yaml = require('js-yaml');
var env = require('./env');

var config = yaml.load(fs.readFileSync(__dirname + '/../config/config.yml'));

module.exports = getConfig;

/**
 * Returns the selected environment configuration
 */
function getConfig() {
    return config[env().name] || {};
}
