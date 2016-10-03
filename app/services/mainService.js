var app = angular.module('btApp');
app.factory("userService", ["$http", function($http) {
    const BACK_PATH = "http://body_tracking.dev/core/";
    var get = function(user) {
        return $http.post(BACK_PATH + "modules/user/user_list.php", { id: user.id });
    };

    var add = function(user) {
        return $http.post(BACK_PATH + "modules/user/user_signin.php", user);
    };

    var toggleStatus = function(userId, status) {
        return $http.post(BACK_PATH + 'modules/user/user_remove.php', {id: userId, status: status});
    };
    var update = function(user) {
        return $http.post(BACK_PATH + 'modules/user/user_update.php');
    }
    return {
        getUser: get,
        addUser: add,
        updateUser: update,
        toggleStatus: toggleStatus,
    };
}])
