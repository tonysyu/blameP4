/*global require*/

var angular = require('angular');
var hljs = require('highlight.js');


angular.module('blameP4')
    .service('BlameParser', function () {
        "use strict";

        /*
         * Replace code in parsed text with highlighted code.
         *
         * This modifies `code` in rows array in-place.
         */
        function _highlightCode(rows) {
            // Join code to contiguous block before highlighting since
            // individual lines generally aren't valid code.
            var code = rows.map(function (x) { return x.code; }).join('\n');
            code = hljs.highlightAuto(code).value;
            var hlLines = code.split('\n');

            var i;
            for (i = 0; i < rows.length; i++) {
                // hljs.fixMarkup should make pre-tags unnecessary, but it
                // doesn't seem to preserve indentation.
                rows[i].code = '<pre>' + hlLines[i] + '</pre>';
            }
        }

        /*
         * Return object array with commit ID and code line for code block.
         */
        function parseBlameOutput(text) {
            var pair;
            var lines = text.split(/\r?\n/);
            var rows = [];

            console.log("Parse blame output ...");
            lines.forEach(function (line) {
                pair = line.split(/: (.+)?/);  // Split on first colon.
                rows.push({commit: pair[0], code: pair[1]});
            });
            console.log("Parse blame output complete.");

            console.log("Highlighting syntax ...");
            _highlightCode(rows);
            console.log("Highlighting syntax complete.");
            return rows;
        }

        return {
            parse: parseBlameOutput
        };
    });
