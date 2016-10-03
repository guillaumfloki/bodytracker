'use strict';
var app = angular.module('btApp');
app.filter('capitalize', function() {
    return function(t) {
        return t.charAt(0).toUpperCase() + t.substr(1).toLowerCase();
    }
});
app.filter('upper', function() {
    return function(t) {
        return t.toUpperCase();
    }
});
