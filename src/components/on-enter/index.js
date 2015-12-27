var angular = require('angular');

var ENTER_KEY = 13;

angular.module('blameP4')
    .directive("onEnter", [function () {
        "use strict";

        return {
            scope: {
                onEnter: '=',
                onShiftEnter: '='
            },
            link: function (scope, element, attrs) {
                element.bind("keydown keypress", function(event) {
                    if (event.keyCode === ENTER_KEY) {
                        var applyCallback = function (callback) {
                            scope.$apply(function (){
                                scope.$eval(callback, {'event': event});
                            });
                        }
                        if (event.shiftKey) {
                            applyCallback(scope.onShiftEnter);
                        } else {
                            applyCallback(scope.onEnter);
                        }
                        event.preventDefault();
                    }
                });
            }
        };
    }]);
