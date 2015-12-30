/*
 * Expose version control functionality as an Angular service.
 */
var angular = require('angular');
var child_process = require('child_process');
var fs = require('fs');


angular.module('blameP4')
    .service('VCService', function ($injector) {
        "use strict";

        function p4available() {
            var p4cmd = 'p4 -h';
            try {
                child_process.execSync(p4cmd);
            } catch(error) {
                return false;
            }
            return true;
        }

        if (p4available()) {
            return $injector.get('_p4VCService');
        }
        return $injector.get('_mockVCService');
    })
    .service('_p4VCService', function () {
        "use strict";

        return {
            blame: function (filename, callback) {
                console.log("Annotate " + filename + " ...");
                var cmd = 'p4 annotate -I -q ' + filename;
                var opts = {maxBuffer: 1024 * 2000};

                child_process.exec(cmd, opts, function (error, stdout) {
                    if (error) {
                        throw error;
                    }
                    console.log("Annotate " + filename + " complete.");
                    callback(stdout);
                });
            },
            describeCommit: function (commitID, callback) {
                console.log("Describe commit " + commitID + " ...");
                var cmd = 'p4 describe -s ' + commitID;

                child_process.exec(cmd, function (error, stdout) {
                    if (error) {
                        throw error;
                    }
                    console.log("Describe commit " + commitID + " complete.");
                    callback(stdout);
                });
            },
        };
    })
    .service('_mockVCService', function ($timeout) {
        // Mock version control service
        // `blame` adds fake change list ids to each line of a file.
        "use strict";

        var warningAboutMock = "WARNING: P4 not found. Using mock P4 service!";

        console.warn(warningAboutMock);

        function randomInt(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }

        function addMockCommitHashes(text) {
            var lines = text.split(/\r?\n/);
            lines.unshift(warningAboutMock);
            lines = lines.map(function(string) {
                return randomInt(0, 1000) + ': ' + string;
            });
            return lines.join('\n');
        }
        return {
            blame: function (filename, callback) {
                fs.readFile(filename, 'utf8', function (error, text) {
                    if (error) {
                        throw error;
                    }
                    text = addMockCommitHashes(text);
                    callback(text);
                });
            },
            describeCommit: function (commitID, callback) {
                // Actual VC service executes commands asynchronously
                $timeout(function () {
                    callback("Mock commit message for commit " + commitID);
                });
            },
        };
    });
