/**
 * Created by gferber on 04/10/2016.
 */
var chartApp = angular.module('btApp.charts', ['chart.js']);
chartApp.controller('LineCtrl', function ($scope, measureService) {
	$scope.weightData = [];
	$scope.labels = [];
	$scope.weightTitle = "Weight stats";

	$scope.getWeightStats = function (id) {
		measureService.getWeightStats(id).success(function (data) {
			$scope.labels = data[0];
			console.log(data[0]);
			$scope.weightData = data[1];
			$scope.series = ['Weight'];
			$scope.colors = ['#ff8e72'];
			$scope.onClick = function (points, evt) {
				//console.log(points, evt);
			};
			$scope.datasetOverride = [{yAxisID: 'y-axis-1'}];
			$scope.options = {
				scales: {
					yAxes: [
						{
							ticks: {
								callback: function (label) {
									return label + ' kg';
								}
							}
						},
						{
							id: 'y-axis-1',
							type: 'linear',
							display: false,
							position: 'left'
						}
					]
				}
			};

		}).error(function (error) {
			console.log(error);
		})
	};
	$scope.getWeightStats($scope.currentUser.id);

});
