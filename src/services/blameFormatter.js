/*global require*/

var angular = require('angular');
var mustache = require('mustache');


angular.module('blameP4')
    .service('BlameFormatter', function () {
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

        return {
            format: blameOutputToTable
        };
    })
