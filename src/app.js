/*global require*/

var angular = require('angular');
var angularSanitize = require('angular-sanitize');
var hotkeys = require('angular-hotkeys');


angular.module('blameP4', ['ngSanitize', 'cfp.hotkeys'])
    .controller('BlameAppController', function ($scope, VCService, BlameParser) {
        $scope.htmlContent = '<p>Select file</p>';
        $scope.describeCommit = function (commitNumber) {
            VCService.describeCommit(commitNumber, console.log.bind(console));
        };
        $scope.loadFile = function (filename) {
            $scope.htmlContent = '<p>Loading...</p>';
            VCService.blame(filename, function (blameText) {
                // Use $apply since blame command is executed asynchronously.
                $scope.$apply(function () {
                    $scope.lines = BlameParser.parse(blameText);
                });
            });
        };
    });
