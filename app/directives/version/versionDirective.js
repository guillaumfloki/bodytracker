'use strict';

var app = angular.module('btApp.version.version-directive', []);
app.directive('appVersion', ["version", function(version) {
    return {
        link: function(scope, element, attrs) {
            element.html(version);
        }
    }
}]);
