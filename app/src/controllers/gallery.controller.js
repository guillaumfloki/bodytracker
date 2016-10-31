'use strict';

angular.module('btApp.gallery', ['ngRoute'])
	.controller('galleryController', function ($scope, userService) {
		$scope.gallery = [];
		$scope.retrieveGallery = function (id) {
			userService.getGallery(id)
				.success(function (data) {
					$scope.gallery.push(data);
				})
				.error(function (error) {
					console.log(error);
				})
		};
	});
