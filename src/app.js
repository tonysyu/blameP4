/*global require*/

var angular = require('angular');
var angularSanitize = require('angular-sanitize');
var hotkeys = require('angular-hotkeys');


angular.module('blameP4', ['ngSanitize', 'cfp.hotkeys'])
    .controller('BlameAppController', function ($scope, VCService, BlameParser) {
        $scope.htmlContent = '<p>Select file</p>';
        $scope.describeCommit = function (commitNumber) {
            console.log(commitNumber);
        };
        $scope.loadFile = function (filename) {
            $scope.htmlContent = '<p>Loading...</p>';
            VCService.blame(filename, function (blameText) {
                // FIXME: $apply shouldn't be needed, right?
                $scope.$apply(function () {
                    $scope.lines = BlameParser.parse(blameText);
                });
            });
        };
    });
