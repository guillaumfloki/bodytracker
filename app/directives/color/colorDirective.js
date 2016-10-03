'use strict';

var app = angular.module('btApp');
app.directive('blush', function() {
    return function(scope, element, attrs) {
        element.bind('click', function() {
            element.toggleClass('colored');
        });
    };
});
