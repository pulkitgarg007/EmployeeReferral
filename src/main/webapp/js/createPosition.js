function positionController($scope, $http) {
	var base_url = window.location.origin;
	var URL = base_url + '/EmployeeReferral/resources/skill';
	$http.get(URL).success(function(data, status, headers, config) {
		$("#primarySkills").autocomplete({
			source : data
		});
		$("#secondarySkills").autocomplete({
			source : data
		});
	}).error(function(data, status, headers, config) {
		alert('error');
	});
	$scope.reset = function() {
		$scope.position = angular.copy($scope.master);
	};

	$scope.submit = function() {
		if ($scope.position !== undefined) {
			$http.post(base_url + '/EmployeeReferral/resources/position-create', $scope.position)
		}
	}
	$scope.reset();
	$scope.submit();
}
