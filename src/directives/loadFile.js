/*global require*/

var angular = require('angular');


angular.module('blameP4')
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
    });
