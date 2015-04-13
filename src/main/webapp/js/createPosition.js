function positionController($scope, $http) {
	$scope.enableDisbleButton = true;
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
	
	$scope.changeEvent = function(){
		if($scope.position.jobcode == null || $scope.position.jobcode == '' || $scope.position.experienceRequired == null || $scope.position.experienceRequired == '' || $scope.position.primarySkills == null || $scope.position.primarySkills == '' || $scope.position.secondarySkills == null || $scope.position.secondarySkills == '' || $scope.position.noOfPositions == null || $scope.position.noOfPositions == '' || $scope.position.jobProfile == null || $scope.position.jobProfile == '' || $scope.position.designation == null || $scope.position.designation == '')
		$scope.enableDisbleButton = true;
	else
		$scope.enableDisbleButton = false;
	}
}
