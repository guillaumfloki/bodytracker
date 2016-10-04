'use strict';

angular.module('btApp.form', ['ngRoute'])
.controller('formCtrl', ["$scope", "$route", "$state", "userService", "$http",
    function($scope, $route, $state, userService, $http) {
        $scope.reset = function(obj) {
            obj = {};
        }
        $scope.addUser = function(user) {
            if (user) {
                userService.addUser(user)
                    .success(function(data) {
                        $scope.addUserResult = (data.length > 0) ? 'OK' : 'KO';
                        $scope.reset($scope.userForm);
                        localStorage.setItem('currentUser', JSON.stringify(data));
                    }).error(function(data) {
                        console.log(data.error);
                    });
            }

        }
        $scope.getUser = function(user) {
            if (user) {
                userService.getUser(user)
                    .success(function(data) {
                        $scope.userList = (data != null) ? data : 'Aucun utilisateur trouvé';
                    })
                    .error(function(data) {
                        console.log(data.error);
                    });
            }

        }
        $scope.toggleUserStatus = function(userId, status) {
            userService.toggleStatus(userId, status).success(function(data) {
                    //console.log(data)
                })
                .error(function(data) {
                    console.log(data.error);
                });
        }

    }
]);
