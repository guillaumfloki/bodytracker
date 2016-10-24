/**
 * Created by gferber on 04/10/2016.
 */
var chartApp = angular.module('btApp.charts', ['chart.js']);
chartApp.controller('LineController', function ($scope, measureService) {
	$scope.colors = ['#FDB45C', '#803690', '#4D5360', '#DCDCDC', '#00ADF9', '#46BFBD', '#949FB1'];
	(function (ChartJsProvider) {
		ChartJsProvider.setOptions({colors: $scope.colors})
	});
	$scope.stats = {
		title: "Body measures stats",
		labels: [],
		enabled: true,
		data: {
			bmi: {
				value: []
			},
			bmiWeight: [],
			weight: [],
			neck: [],
			waist: [],
			shoulders: [],
			chest: [],
			arms: [[], []],
			calves: [[], []],
			thighs: [[], []]
		},
	};
	$scope.getWeightStats = function (id) {
		measureService.getBodyStats(id).success(function (data) {
			//build user stats info
			if (data == "0") {
				return $scope.stats.enabled = false;
			}
			$scope.stats.data.height = data[0][0];
			$scope.stats.data.startWeight = data[0][1];
			$scope.stats.data.targetWeight = data[0][2];

			//chart data
			$scope.stats.labels = data[1];
			angular.forEach(data[2], function (value) {
				$scope.stats.data.bmi.value.push(parseFloat(bmi.calculate(data[0][0], value.weight)));
				$scope.stats.data.weight.push(value.weight);
				$scope.stats.data.neck.push(value.neck);
				$scope.stats.data.waist.push(value.waist);
				$scope.stats.data.shoulders.push(value.shoulders);
				$scope.stats.data.chest.push(value.chest);
				$scope.stats.data.arms[0].push(value.arm_right);
				$scope.stats.data.arms[1].push(value.arm_left);
				$scope.stats.data.calves[0].push(value.calf_right);
				$scope.stats.data.calves[1].push(value.calf_left);
				$scope.stats.data.thighs[0].push(value.thigh_right);
				$scope.stats.data.thighs[1].push(value.thigh_left);
				$scope.stats.data.bmiWeight.push({
					date: data[1],
					bmi: $scope.stats.data.bmi.value,
					weight: $scope.stats.data.weight
				});
			});
			$scope.stats.series = ['Weight', 'BMI', 'Neck', 'Waist', 'Shoulders', 'Chest', ['Arm right', 'Arm left'], ['Calf right', 'Calf left'], ['Thigh right', 'Thigh left']];
			$scope.stats.datasetOverride = [{yAxisID: 'y-axis-1'}];

			$scope.pointData = function (points, evt) {
				//console.log(points, evt);
			};
			$scope.stats.generalOptions = {
				scales: {
					yAxes: [
						{
							id: 'y-axis-1',
							type: 'linear',
							display: true,
							position: 'left'
						}
					]
				}
			}
			$scope.stats.bodyOptions = {
				scales: {
					yAxes: [
						{
							id: 'y-axis-1',
							type: 'linear',
							display: true,
							position: 'left'
						},
						{
							id: 'y-axis-2',
							type: 'linear',
							display: true,
							position: 'right'
						}
					]
				}
			};

			$scope.stats.weightOptions = {
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
					],
					xAxes: [
						{
							ticks: {
								autoSkip: true,
								maxTicksLimit: 20
							}
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
			return (weight / Math.pow(height / 100, 2)).toFixed(2);
		}
	};

});
