var app = angular.module("erApp", ['ngTagsInput']);
app.controller("createPositionCtrl", ['$scope', '$http', function($scope, $http) {

    $scope.position ={};
	$scope.position.primarySkills = {};
	$scope.primarySkills ={};
	$scope.devskills = {};
	$scope.qeskills = {};
	$scope.selectedDesignation = "";
	$scope.selectedExperience = "";
	$scope.selectedLocation = "";
	$scope.position.designation = "";
	$scope.position.experienceRequired = "";
	$scope.position.location = "";
	$scope.enableDisbleButton = true;
	var base_url = window.location.origin;
	var Skills_URL = base_url + '/EmployeeReferral/resources/skill/skills';
	var Designation_URL = base_url + '/EmployeeReferral/resources/skill/designations';
	var Experience_URL = base_url + '/EmployeeReferral/resources/skill/experience';
	var DeveloperSkills_URL = base_url + '/EmployeeReferral/resources/skill/developerskills';
	var QESkills_URL = base_url + '/EmployeeReferral/resources/skill/qeskills';
	var Location_URL = base_url + '/EmployeeReferral/resources/skill/location';
	$scope.data = {};
	$scope.options = {};
	$scope.items = {};
	$scope.locations = {};
	$http.get(Skills_URL).success(function(data, status, headers, config) {
		$scope.data = data;
		
	}).error(function(data, status, headers, config) {
		alert('error');
	})
	$http.get(Designation_URL).success(function(data, status, headers, config) {
		$scope.options = data;
		$scope.selectedDesignation = $scope.options[0];
	}).error(function(data, status, headers, config) {
		alert('error');
	})
	$http.get(Location_URL).success(function(data, status, headers, config) {
		$scope.locations = data;
		$scope.selectedLocation = $scope.locations[0];
	}).error(function(data, status, headers, config) {
		alert('error');
	})
	$http.get(Experience_URL).success(function(data, status, headers, config) {
		$scope.items = data;
		$scope.selectedExperience = $scope.items[0];
	}).error(function(data, status, headers, config) {
		alert('error');
	})
	
	$http.get(DeveloperSkills_URL).success(function(data, status, headers, config) {
		$scope.devskills = data;
		
	}).error(function(data, status, headers, config) {
		alert('error');
	})
	
	$http.get(QESkills_URL).success(function(data, status, headers, config) {
		$scope.qeskills = data;
		
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
			 $scope.position.designation = $scope.selectedDesignation;
		     $scope.position.experienceRequired	= $scope.selectedExperience;
		     $scope.position.location = $scope.selectedLocation;
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
	$scope.changeDesignation = function(){
		if($scope.selectedDesignation == "Developer"){
		$scope.position.primarySkills = $scope.devskills;
		}
		else if ($scope.selectedDesignation == "Quality Engineer"){
			$scope.position.primarySkills = $scope.qeskills;
		}
		else{
			$scope.position.primarySkills = {};
		}
	}
}]);