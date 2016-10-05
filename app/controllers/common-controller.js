angular.module('btApp').controller('CommonCtrl', ["$scope", "$rootScope", "$location", "$state", 'userService', function($scope, $rootScope, $location, $state, userService){
    $scope.distPath = "dist/";
    $scope.distCssPath = $scope.distPath + 'css/';
    $scope.distCssFilePath = $scope.distCssPath  + "styles.css";

    $scope.logout = function(){
        localStorage.removeItem('currentUser');
		$location.url('/login');
    };
    $scope.defaultPanel = '1';
    $scope.switchPanels = function(panel){
        $scope.defaultPanel = panel;
    };
	$scope.isAuthenticated = function(){
		var bool = false;
		if(localStorage.getItem('currentUser')){
			bool = true;
		}
		return bool;
	};

	$scope.initView = function(){
		if(!$scope.isAuthenticated()){
			$location.url('/login');
			return false;
		}
	};
	$scope.signin = function(user){
		if(user){
			userService.loginUser(user).success(function(data){
				localStorage.setItem('currentUser', JSON.stringify(data));
				$scope.currentUser = data;
				$location.url('/form');
			}).error(function(error){
				console.log(error);
			});
		}
	};
	$scope.signup = function(user) {
		if (user) {
			userService.signupUser(user)
				.success(function(data) {
					$scope.addUserResult = (data.length > 0) ? 'OK' : 'KO';
					$scope.reset($scope.userForm);
					localStorage.setItem('currentUser', JSON.stringify(data));
				}).error(function(data) {
				console.log(data.error);
			});
		}
	};

}])
