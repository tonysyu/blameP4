#!/usr/bin/env node

var child_process = require('child_process');
var process = require('process');

var rootDir = __dirname + '/..';
var electron = rootDir + '/node_modules/.bin/electron';
var additionalArgs = process.argv.slice(2).join(' ');

var isWindows = /^win/.test(process.platform);
if (isWindows) {
    electron += '.cmd';
}

console.log("Executing: " + electron + " " + rootDir + " " + additionalArgs);
var appProcess = child_process.spawn(electron, [rootDir, additionalArgs]);

appProcess.stderr.on('data', function (error) {
    console.log('blameP4 Error: ' + error);
});

appProcess.stdout.on('data', function (data) {
    console.log('blameP4: ' + data);
});
