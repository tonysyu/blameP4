/*global require*/

var angular = require('angular');
var mustache = require('mustache');


angular.module('blameP4')
    .service('BlameFormatter', function () {
        var tableRowTemplate = "<tr><td> {{commit}} </td><td> <code><pre>{{code}}</pre></code> </td><tr>";
        var tableTemplate = ''
            + '<table class="pure-table">'
            + '  <thead> {{{header}}} </thead>'
            + '  <tbody> {{{body}}} </tbody>'
            + '</table>';

        function blameLineToTableRow(line) {
            var pair = line.split(/: (.+)?/);  // Split on first colon.
            var opts = {commit: pair[0], code: pair[1]};
            return mustache.to_html(tableRowTemplate, opts);
        }

        function blameOutputToTable(text) {
            var lines = text.split(/\r?\n/);
            var rows = [];
            lines.forEach(function (line) {
                rows.push(blameLineToTableRow(line));
            });
            var opts = {
                header: "<tr> <th>commit</th> <th>code</th> </tr>",
                body: rows.join('\n'),
            }
            return mustache.to_html(tableTemplate, opts);
        }

        return {
            format: blameOutputToTable
        };
    })
