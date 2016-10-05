var app = angular.module('btApp');
app.factory("userService", ["$http", function($http) {
    const BACK_PATH = "http://bodytracker.dev/core/";
    var get = function(user) {
        return $http.post(BACK_PATH + "modules/user/user_list.php", { id: user.id });
    };

    var signup = function(user) {
        return $http.post(BACK_PATH + "modules/user/user_signin.php", user);
    };

    var toggleStatus = function(id, status) {
        return $http.post(BACK_PATH + 'modules/user/user_remove.php', {id: id, status: status});
    };
    var update = function(id) {
        return $http.post(BACK_PATH + 'modules/user/user_update.php');
    }
    var login = function(user) {
        return $http.post(BACK_PATH + 'modules/user/user_login.php', user);
    }

    return {
        getUser: get,
        signupUser: signup,
        updateUser: update,
        toggleStatus: toggleStatus,
        loginUser: login,
    };
}]);
app.factory("measureService", ["$http", function($http) {
	const BACK_PATH = "http://bodytracker.dev/core/";
	var add = function(item) {
		return $http.post(BACK_PATH + "modules/measures/measures_add.php", item);
	};

	return {
		addMeasures: add,
	};
}]);
