/*global require*/

var angular = require('angular');


angular.module('blameP4')
    .service('BlameParser', function () {
        "use strict";

        function parseBlameOutput(text) {
            var pair;
            var lines = text.split(/\r?\n/);
            var rows = [];
            lines.forEach(function (line) {
                pair = line.split(/: (.+)?/);  // Split on first colon.
                rows.push({commit: pair[0], code: pair[1]});
            });
            return rows;
        }

        return {
            parse: parseBlameOutput
        };
    });
