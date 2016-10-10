'use strict';

angular.module('btApp.login', ['ngRoute'])
.controller('loginCtrl', ["$scope", "userService", "$state", "$stateParams", "$location",function($scope, userService, $state, $stateParams, $location) {

	$scope.resetForm = function(obj){
		if(obj){
			$scope[obj] = {};
		}
	};
}]);
