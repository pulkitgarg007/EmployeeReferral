 angular.module('myApp', ['ngTagsInput'])

   .controller('positionController',['$scope', '$http', function($scope, $http){
	   $scope.position ={};
	   $scope.position.primarySkills = {};
	   $scope.primarySkills ={};
	$scope.enableDisbleButton = true;
	var base_url = window.location.origin;
	var URL = base_url + '/EmployeeReferral/resources/skill';
	$scope.data = {};
	$http.get(URL).success(function(data, status, headers, config) {
		$scope.data = data;
		
	}).error(function(data, status, headers, config) {
		alert('error');
	})
	$scope.loadTags = function(query) {
		
		return $scope.data;
	};
	
	$scope.reset = function() {
		$scope.position = angular.copy($scope.master);
	}

	$scope.submit = function() {
		var skills =[];
		if ($scope.position !== undefined) {
			 angular.forEach($scope.position.primarySkills, function(value, key) {
				 skills.push(value.text);
				});
			 $scope.position.primarySkills = skills;
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
}]);
