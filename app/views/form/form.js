'use strict';

angular.module('btApp.form', ['ngRoute'])
	.controller('formCtrl', ["$rootScope", "$scope", "$route", "$state", "userService", 'measureService', "$http",
		function ($rootScope, $scope, $route, $state, userService, measureService) {
			$scope.reset = function (obj) {
				$scope[obj] = {};
			};
			if ($scope.isAuthenticated()) {
				$scope.currentUser = JSON.parse(localStorage.getItem('currentUser'));
			}
			$scope.addMeasures = function(measures) {
				if (measures) {
					if (!measures.id_user) {
						measures.id_user = $scope.currentUser.id;
					}
					if (!measures.image) {
						measures.image = '';
					}
					measureService.addMeasures(measures)
						.success(function (data) {
							console.log(data);
						})
						.error(function (error) {
							console.log(error);
						});
				}

			};
			$scope.toggleUserStatus = function (userId, status) {
				userService.toggleStatus(userId, status).success(function (data) {
					//console.log(data)
				})
					.error(function (data) {
						console.log(data.error);
					});
			};

		}
	]);
