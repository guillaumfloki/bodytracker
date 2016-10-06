'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('btApp', [
	'ngRoute',
	'ui.router',
	'btApp.form',
	'btApp.stats',
	'btApp.login',
	'btApp.version',
	'btApp.charts',
]);
app.config(['$locationProvider', '$routeProvider', '$stateProvider', function ($locationProvider, $routeProvider, $stateProvider) {
	$locationProvider.hashPrefix('!');

	$routeProvider
		.when('/login', {
			templateUrl: 'views/login/login.html',
			controller: 'loginCtrl'
		})
		.when('/form', {
			templateUrl: 'views/form/form.html',
			controller: 'formCtrl'
		})
		.when('/stats', {
			templateUrl: 'views/stats/stats.html',
			controller: 'statsCtrl'
		})
		.otherwise({redirectTo: '/login'});

}]);