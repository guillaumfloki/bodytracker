/**
 * Created by gferber on 04/10/2016.
 */
var chartApp = angular.module('btApp.charts', ['chart.js']);
chartApp.controller('LineCtrl', function ($scope, measureService) {
	$scope.weightData = [];
	$scope.labels = [];
	$scope.weightTitle = "Weight stats";
	$scope.statsUser = [];
	$scope.getWeightStats = function (id) {
		measureService.getWeightStats(id).success(function (data) {
			$scope.statsUser.push({
				height: (data[0][0]),
				startWeight: data[0][1],
				bmi: bmi.calculate(data[0][0], data[0][1])
			});

			$scope.labels = data[1];
			$scope.weightData = data[2];
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
	var bmi = {
		calculate: function (height, weight) {
			return Math.ceil(weight / Math.pow(Math.round(height / 100), 2));
		}
	};

});
