/*global require*/

var angular = require('angular');
var angularSanitize = require('angular-sanitize');
var child_process = require('child_process');
var mustache = require('mustache');


angular.module('blameP4', ['ngSanitize'])
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
    .directive("loadFile", function () {
        "use strict";
        return {
            link: function (scope, element) {
                element.bind("change", function (changeEvent) {
                    var file = changeEvent.target.files[0];
                    if (file) {
                        // Use $apply since we're reacting to an event.
                        scope.$apply(function () {
                            scope.loadFile(file.path);
                        });
                    }
                });
            }
        };
    })
    .controller('BlameAppController', function ($scope, VCService, BlameFormatter) {
        $scope.htmlContent = '<p>Select file</p>';
        $scope.loadFile = function (filename) {
            $scope.htmlContent = '<p>Loading...</p>';
            VCService.blame(filename, function (html) {
                // FIXME: $apply shouldn't be needed, right?
                $scope.$apply(function () {
                    $scope.htmlContent = BlameFormatter.format(html);
                });
            });
        };
    });
