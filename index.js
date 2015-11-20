#!/usr/bin/env node

var child_process = require('child_process');
var fs = require('fs');
var mustache = require('mustache');
var open = require('open');

var filename = process.argv[2];  // 0 = node, 1 = index.js, 2 = target file
var blameFile = __dirname + '/tmp.html';
var electron = __dirname + '/node_modules/.bin/electron';

if (!filename) {
    console.log("Expected path to a file for blaming!");
    process.exit(1);
}

var indexTemplate = fs.readFileSync(__dirname + '/index.mustache', 'utf-8');
var tableRowTemplate = "<tr><td> {{commit}} </td><td> <code><pre>{{code}}</pre></code> </td><tr>";
var tableTemplate = "<table>\n{{{body}}}\n</table>";

function blameLineToTableRow(line) {
    var pair = line.split(/: (.+)?/);  // Split on first colon.
    return mustache.to_html(tableRowTemplate, {commit: pair[0], code: pair[1]});
}

function blameOutputToTable(text) {
    var lines = text.split(/\r?\n/);
    var rows = [];
    lines.forEach(function (line) {
        rows.push(blameLineToTableRow(line));
    });
    return mustache.to_html(tableTemplate, {body: rows.join('\n')});
}

var annotateCmd = 'p4 annotate -I -q ' + filename;
var execOptions = {maxBuffer: 1024 * 2000};
child_process.exec(annotateCmd, execOptions, function (error, stdout, stderr) {
    if (error) {
        throw error;
    }
    var html = mustache.to_html(indexTemplate, {body: blameOutputToTable(stdout)});
    fs.writeFileSync(blameFile, html);
    open('file:///' + blameFile);

});
