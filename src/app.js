/*global require*/

var angular = require('angular');
var angularSanitize = require('angular-sanitize');
var dialog = require('remote').require('dialog');
var hotkeys = require('angular-hotkeys');


angular.module('blameP4', ['ngSanitize', 'cfp.hotkeys'])
    .controller('BlameAppController', function ($scope, VCService, BlameParser) {
        $scope.describeCommit = function (commitNumber) {
            VCService.describeCommit(commitNumber, function (message) {
                dialog.showMessageBox({
                    type: 'info',
                    buttons: ['OK'],
                    message: message
                });
            });
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
