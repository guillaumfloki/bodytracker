'use strict';

angular.module('btApp.stats', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/stats', {
        templateUrl: 'views/stats/stats.html',
        controller: 'statsCtrl'
    });
}])

.controller('statsCtrl', ["$scope", function($scope) {
    $scope.val = 'hello world';
}]);
