(function(){
	'use strict';
	var app = angular.module('btApp');
	app.directive('chartAltLine', function(){
		var lineFn = function(scope, element, attr){
			var d = scope.val;
		};
		return {
			scope: {
				val: "=chartAltLine"
			},
			link: lineFn
		}
	})
})();