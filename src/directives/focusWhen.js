/*

Focus directive that changes focus to element when attribute is changed to true.

*/
var angular = require('angular');

angular.module('blameP4')
    .directive("focusWhen", [function () {
        "use strict";

        return {
            link: function (scope, element, attrs) {
                scope.$watch(attrs.focusWhen, function (value) { 
                    if (value) {
                        element[0].focus();
                    }
                });
            }
        };
    }]);
