'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('btApp', [
	'ngRoute',
	'ui.router',
	'btApp.form',
	'btApp.stats',
	'btApp.login',
	'btApp.profile',
	'btApp.gallery',
	'btApp.version',
	'btApp.charts',
]);
app.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
	//$locationProvider.hashPrefix('!');

	$routeProvider
		.when('/login', {
			templateUrl: 'views/login/login.tpl.html',
			controller: 'loginController',
			activeTab: 'login'
		})
		.when('/form', {
			templateUrl: 'views/form/form.tpl.html',
			controller: 'formController',
			activeTab: 'form'
		})
		.when('/stats', {
			templateUrl: 'views/stats/stats.tpl.html',
			controller: 'statsController',
			activeTab: 'stats'
		})
		.when('/profile', {
			templateUrl: 'views/profile/profile.tpl.html',
			controller: 'profileController',
			activeTab: 'profile'
		})
		.when('/gallery', {
			templateUrl: 'views/gallery/gallery.tpl.html',
			controller: 'galleryController',
			activeTab: 'gallery'
		})
		.otherwise({redirectTo: '/login'});

}]);