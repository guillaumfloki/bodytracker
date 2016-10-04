angular.module('btApp').controller('CommonCtrl', ["$scope", "$rootScope", function($scope, $rootScope){
    $scope.distPath = "dist/";
    $scope.distCssPath = $scope.distPath + 'css/';
    $scope.distCssFilePath = $scope.distCssPath  + "styles.css";
}])
