'use strict';

angular.module('btApp.login', ['ngRoute'])
.controller('loginCtrl', ["$scope", "userService", function($scope, userService) {
	$scope.resetForm = function(obj){
		if(obj){
			$scope[obj] = {};
		}
	};
	$scope.login = function(user){
    	if(user){
        	userService.loginUser(user).success(function(data){
        		console.log(data);
			}).error(function(error){
				console.log(error);
			});
    	}
    };
}]);