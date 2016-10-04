'use strict';

angular.module('btApp.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/login', {
        templateUrl: 'views/login/login.html',
        controller: 'vCtrl'
    });
}])

.controller('loginCtrl', ["$scope", function($scope) {
    $scope.val = 'hello world';
}]);
