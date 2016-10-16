angular.module('btApp').controller('CommonController', ["$scope", "$rootScope", "$location", "$state", 'userService', function ($scope, $rootScope, $location, $state, userService) {
	$scope.distPath = "../dist/";
	$scope.distCssPath = $scope.distPath + 'css/';
	$scope.distCssFilePath = $scope.distCssPath + "styles.css";

	$scope.logout = function () {
		localStorage.removeItem('currentUser');
		$location.url('/login');
	};
	$scope.isAuthenticated = function () {
		var bool = false;
		if (localStorage.getItem('currentUser')) {
			bool = true;
			$scope.currentUser = JSON.parse(localStorage.getItem('currentUser'));
		}
		return bool;
	};

	$scope.initView = function () {
		if (!$scope.isAuthenticated()) {
			$location.url('/login');
		}else {
			$location.url('/profile');
		}
	};
	$scope.signin = function (user) {
		if (user) {
			userService.signinUser(user).success(function (data) {
				localStorage.removeItem('currentUser');
				localStorage.setItem('currentUser', JSON.stringify(data));
				$scope.currentUser = data;
				$location.url('/profile');
			}).error(function (error) {
				console.log(error);
			});
		}
	};
	$scope.signup = function (user) {
		if (user) {
			userService.signupUser(user)
				.success(function (data) {
					$scope.addUserResult = (data.length > 0) ? 'OK' : 'KO';
					$scope.reset($scope.userForm);
					localStorage.removeItem('currentUser');
					localStorage.setItem('currentUser', JSON.stringify(data));
					$scope.currentUser = data;
					$location.url('/form');
				}).error(function (data) {
				console.log(data.error);
			});
		}
	};

}])
