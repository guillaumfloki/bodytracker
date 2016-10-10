/**
 * Created by gferber on 04/10/2016.
 */
var chartApp = angular.module('btApp.charts', ['chart.js']);
chartApp.controller('LineController', function ($scope, measureService) {
	$scope.statsData = {
		weight: [],
		neck: [],
		waist: [],
		shoulders: [],
		chest: [],
		arms: [[], []],
		calves: [[], []],
		thighs: [[], []],
	};
	$scope.labels = [];
	$scope.weightTitle = "Weight stats";
	$scope.statsUser = [];
	$scope.getWeightStats = function (id) {
		measureService.getWeightStats(id).success(function (data) {
			//build user stats info
			$scope.statsUser = {
				height: data[0][0],
				startWeight: data[0][1],
				targetWeight: data[0][2],
			};
			$scope.statsUser.bmi=[];
			angular.forEach(data[2], function(v){
				$scope.statsUser.bmi.push(parseFloat(bmi.calculate(data[0][0], angular.element(v)[0].weight)));
			});

			//chart data

			$scope.labels = data[1];
			angular.forEach(data[2], function(v){
				$scope.statsData.weight.push(angular.element(v)[0].weight);
				$scope.statsData.neck.push(angular.element(v)[0].neck);
				$scope.statsData.waist.push(angular.element(v)[0].waist);
				$scope.statsData.shoulders.push(angular.element(v)[0].shoulders);
				$scope.statsData.chest.push(angular.element(v)[0].chest);
				$scope.statsData.arms[0].push(angular.element(v)[0].arm_right);
				$scope.statsData.arms[1].push(angular.element(v)[0].arm_left);
				$scope.statsData.calves[0].push(angular.element(v)[0].calf_right);
				$scope.statsData.calves[1].push(angular.element(v)[0].calf_left);
				$scope.statsData.thighs[0].push(angular.element(v)[0].thigh_right);
				$scope.statsData.thighs[1].push(angular.element(v)[0].thigh_left);
			})
			console.log($scope.statsData);
			$scope.series = ['Weight', 'BMI', 'Neck', 'Waist', 'Shoulders', 'Chest', ['Arm right', 'Arm left'], ['Calf right', 'Calf left'], ['Thigh right', 'Thigh left'] ];
			$scope.ThighdatasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
			$scope.weightColors = ['#ff8e72'];

			$scope.bmiData = $scope.statsUser.bmi;
			$scope.bmiLabels = data[1];
			$scope.bmiColors = ['#72e3ff'];

			$scope.pointData = function (points, evt) {
				//console.log(points, evt);
			};
			$scope.datasetOverride = [
				{
					yAxisID: 'y-axis-1',
					label: "Weight",
					borderWidth: 3,
					type: 'line'
				}
				];
			$scope.weightOptions = {
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
