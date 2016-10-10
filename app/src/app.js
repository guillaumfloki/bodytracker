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
app.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
	$locationProvider.hashPrefix('!');

	$routeProvider
		.when('/login', {
			templateUrl: 'views/login/login.tpl.html',
			controller: 'loginController'
		})
		.when('/form', {
			templateUrl: 'views/form/form.tpl.html',
			controller: 'formController'
		})
		.when('/stats', {
			templateUrl: 'views/stats/stats.tpl.html',
			controller: 'statsController'
		})
		.otherwise({redirectTo: '/login'});

}]);