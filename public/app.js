var app = angular.module("megaApp", []);
app.controller("ApplicationCtrl", function($scope) {
	$scope.root = {};
	$scope.NOTHING_SELECTED = {name:'nothing', details:'no details'};
	$scope.clearSelection = function() {
		$scope.root.name = $scope.NOTHING_SELECTED.name;
		$scope.root.details = $scope.NOTHING_SELECTED.details;
	};

	$scope.clearSelection();
});
app.controller("LeftCtrl", ['$scope', '$http', function($scope, $http) {
	$scope.leftList = ["data loading..."];
	$http.get("/data")
		.success(function(data) {
			$scope.leftList = data;
		})
		.error(function() {
			console.log("Error fetching /data endpoint");
		});
	$scope.select = function(obj) {
		$scope.root.name = obj.name;
		$scope.root.details = obj.details;
	};
	$scope.selectDeferred = function(obj) {
		$http.get("/details/" + obj.id)
			.success(function(data) {
				$scope.root.details = data.details;
			})
			.error(function() {
				console.log("Error contacting endpoint.");
			});
		$http.get("/name/" + obj.id)
			.success(function(data) {
				$scope.root.name = data.name;
			})
			.error(function() {
				console.log("Error contacting endpoint.");
			});
	};
}]);
app.controller("RightCtrl", function($scope) { 
});
