'use strict';

angular.module('btApp.form', ['ngRoute'])
	.controller('formCtrl', function ($rootScope, $scope, $route, $state, userService, measureService, $timeout, $sce) {
		$scope.resetRes = function () {
			$scope.result = {
				bool: false,
				text: "",
				sign: "",
				class: ""
			};
		};

		$scope.resetRes();
		$scope.reset = function (obj) {
			$scope[obj] = {};
		};
		if ($scope.isAuthenticated()) {
			$scope.currentUser = JSON.parse(localStorage.getItem('currentUser'));
		}

		$scope.addMeasures = function (measures) {
			if (measures) {
				if (!measures.id_user) {
					measures.id_user = $scope.currentUser.id;
				}
				if (!measures.image) {
					measures.image = '';
				}
				measureService.addMeasures(measures)
					.success(function (data) {
						if (data == "1") {
							$scope.result.bool = true;
							$scope.result.sign = "check";
							$scope.result.text = 'Measures successfully added';
							$scope.result.class = 'success';
							$scope.reset("measures");
						}
					})
					.error(function (statusText) {
						$scope.result.bool = true;
						$scope.result.sign = "exclamation-circle";
						$scope.result.text = statusText;
						$scope.result.class = 'error';
					});
				$timeout(function () {
					$scope.resetRes();
				}, 3000);
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

	});
