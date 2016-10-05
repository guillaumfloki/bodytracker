'use strict';

angular.module('btApp.form', ['ngRoute'])
.controller('formCtrl', ["$scope", "$route", "$state", "userService", "$http",
    function($scope, $route, $state, userService, $http) {
        $scope.reset = function(obj) {
            $scope[obj]= {};
        };

        $scope.getUser = function(user) {
            if (user) {
                userService.getUser(user)
                    .success(function(data) {
                        $scope.userList = (data != null) ? data : 'Aucun utilisateur trouvé';
                    })
                    .error(function(error) {
                        console.log(error);
                    });
            }

        };
        $scope.toggleUserStatus = function(userId, status) {
            userService.toggleStatus(userId, status).success(function(data) {
                    //console.log(data)
                })
                .error(function(data) {
                    console.log(data.error);
                });
        };

    }
]);
