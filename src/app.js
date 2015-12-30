/*global require*/

var angular = require('angular');
var angularSanitize = require('angular-sanitize');
var remote = require('remote');
var dialog = remote.require('dialog');
var hotkeys = require('angular-hotkeys');
var path = require('path');


angular.module('blameP4', ['ngSanitize', 'cfp.hotkeys'])
    .controller('BlameAppController', function ($scope, VCService, BlameParser) {
        $scope.INPUT_STATE = {
            NO_FILE: 0,
            FILE_SELECTED: 1,
            LOADING: 2,
        };
        $scope.inputState = $scope.INPUT_STATE.NO_FILE;

        $scope.selectedFile = {
            name: '',
            path: '',
        };

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
            $scope.inputState = $scope.INPUT_STATE.LOADING;

            $scope.selectedFile.name = path.basename(filename);
            $scope.selectedFile.path = path.resolve(filename);

            console.log("Load " + $scope.selectedFile.path + " ...");

            VCService.blame(filename, function (blameText) {
                // Use $apply since blame command is executed asynchronously.
                $scope.$apply(function () {
                    $scope.lines = BlameParser.parse(blameText);
                    $scope.inputState = $scope.INPUT_STATE.FILE_SELECTED;
                    console.log("Load " + $scope.selectedFile.path + " complete.");
                });
            });
        };

        // Ignore first two arguments (electron and root-directory).
        var cmdArgs = remote.process.argv.slice(2);

        if (cmdArgs.length === 1 && cmdArgs[0]) {
            $scope.loadFile(cmdArgs[0]);
        } else if (cmdArgs.length > 1) {
            console.error("Expected at most 1 argument but given: " + cmdArgs);
        }
    });
