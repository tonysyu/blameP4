/*global require*/

var angular = require('angular');
var angularSanitize = require('angular-sanitize');
var dialog = require('remote').require('dialog');
var hotkeys = require('angular-hotkeys');
var path = require('path');


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
            // Use file extension (minus leading '.') as the language.
            var language = path.extname(filename).slice(1);

            VCService.blame(filename, function (blameText) {
                // Use $apply since blame command is executed asynchronously.
                $scope.$apply(function () {
                    $scope.lines = BlameParser.parse(blameText, language);
                });
            });
        };
    });
