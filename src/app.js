/*global require*/

var angular = require('angular');
var angularSanitize = require('angular-sanitize');
var hotkeys = require('angular-hotkeys');


angular.module('blameP4', ['ngSanitize', 'cfp.hotkeys'])
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
