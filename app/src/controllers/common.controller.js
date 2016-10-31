angular.module('btApp').controller('CommonController', ["$scope", "$rootScope", "$location", "$state", 'userService', '$route', function ($scope, $rootScope, $location, $state, userService, $route) {
    $scope.distPath = "../dist/";
    $scope.distCssPath = $scope.distPath + 'css/';
    $scope.distCssFilePath = $scope.distCssPath + "styles.css";
    $scope.errors = {};
    $scope.errors.badCredentials = false;
    $scope.logout = function () {
        localStorage.removeItem('currentUser');
        $location.url('/login');
    };
    $scope.$route = $route;
    $scope.clearFormErrors = function() {
        for(var prop in $scope.errors){
            $scope.errors[prop] = false;
        }
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
        } else {
            $location.url('/profile');
        }
    };
    $scope.signin = function (user) {
        if (user) {
            userService.signinUser(user).success(function (data) {
                if (data != '0') {
                    localStorage.removeItem('currentUser');
                    localStorage.setItem('currentUser', JSON.stringify(data));
                    $scope.currentUser = data;
                    $location.url('/profile');
                } else {
                    $scope.errors.badCredentials = true;
                    return false;
                }
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
