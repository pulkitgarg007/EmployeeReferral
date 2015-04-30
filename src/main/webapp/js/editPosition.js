var app = angular.module("erApp", []);
app.controller("editPositionCtrl", ['$scope', '$http', '$q', '$location', '$window', function($scope, $http, $q, $location, $window) {
	
	$scope.data = {};
	$scope.position = {};
	$scope.jobcode = $location.search().target;
	var base_url = window.location.origin;
	var skillURL = base_url + '/EmployeeReferral/resources/skill';
	
	$http.get(skillURL).success(function(data, status, headers, config) {
		$("#primarySkills").autocomplete({
			source : data
		});
		$("#secondarySkills").autocomplete({
			source : data
		});
	}).error(function(data, status, headers, config) {
		alert('error');
	});
	
	var URL = base_url + '/EmployeeReferral/resources/searchPositionsBasedOnJobCode?jobcode='+$scope.jobcode;
	
	$http.get(URL).success(function(data, status, headers, config) {
		$scope.position =data;
	}).error(function(data, status, headers, config) {
		alert('error');
	});	
	
	$scope.updatePositionDetails = function() {
		if ($scope.position !== undefined) {
			$http.post(base_url + '/EmployeeReferral/resources/position-create', $scope.position)
			$window.location.href = 'searchPosition.html';
		}
	}
	
	$scope.editPosition = function() {
         $scope.enableDisableButton = false;
         $scope.disableEditButton = true;
         $scope.Done = true;
 }
	
	$scope.cancel = function() {
		$window.location.href = 'searchPosition.html'
}

}]);