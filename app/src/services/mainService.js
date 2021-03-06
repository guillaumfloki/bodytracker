angular.module('btApp')
	.factory("userService", ["$http", function ($http) {
		const BACK_PATH = "http://bodytracker.dev/core/";
		var get = function (user) {
			return $http.post(BACK_PATH + "modules/user/user_list.php", {id: user.id});
		};
		var signup = function (user) {
			return $http.post(BACK_PATH + "modules/user/user_signin.php", user);
		};
		var toggleStatus = function (id, status) {
			return $http.post(BACK_PATH + 'modules/user/user_remove.php', {id: id, status: status});
		};
		var update = function (id) {
			return $http.post(BACK_PATH + 'modules/user/user_update.php');
		};
		var signin = function (user) {
			return $http.post(BACK_PATH + 'modules/user/user_login.php', user);
		};
		var gallery = function (userId) {
			return $http.post(BACK_PATH + 'modules/user/user_gallery.php', {id: userId});
		};
		return {
			getUser: get,
			signupUser: signup,
			updateUser: update,
			toggleStatus: toggleStatus,
			signinUser: signin,
			getGallery: gallery
		};
	}])
	.factory("measureService", ["$http", function ($http) {
		const BACK_PATH = "http://bodytracker.dev/core/";
		var add = function (item) {
			return $http.post(BACK_PATH + "modules/measures/measures_add.php", item);
		};

		var getBodyStats = function (userId) {
			return $http.get(BACK_PATH + "modules/measures/measures_weight.php?id=" + userId);
		};
		return {
			addMeasures: add,
			getBodyStats: getBodyStats
		};
	}]);
