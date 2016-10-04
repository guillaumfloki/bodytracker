'use strict';

// Declare app level module which depends on views, and components
angular.module('btApp', [
    'ngRoute',
    'btApp.form',
    'btApp.stats',
    'btApp.version',
    'ui.router',
]).
config(['$locationProvider', '$routeProvider', '$stateProvider', function($locationProvider, $routeProvider, $stateProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.otherwise({ redirectTo: '/form' });
}])