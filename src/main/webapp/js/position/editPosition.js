app.controller("editPositionCtrl",   ['$scope', '$http','jobCodeService1', function($scope, $http,jobCodeService1) {
	//$scope.page = "Edit Position";
	//$scope.enableDisableButton = true;
	$scope.data = {};
	$scope.position ={};
	$scope.position.primarySkills = {};
	$scope.primarySkills =[];
	$scope.devskills = {};
	$scope.qeskills = {};
	
	var url =window.location;
	$scope.jobcode =jobCodeService1.getjobCode();
	var base_url = window.location.origin;
	var skillURL = base_url + '/EmployeeReferral/resources/skill';
	
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
		$scope.enableDisableButton = false;
		$scope.selectedExperience = $scope.position.experienceRequired;
		$scope.position.selectedDesignation = $scope.position.designation;
		$scope.selectedLocation = $scope.position.location;
		//console.log("2------->"+angular.toJson($scope.position));
	}).error(function(data, status, headers, config) {
		alert('error');
	});	
	
	$scope.updatePositionDetails = function() {
		var skills =[];
		var position1={};
		if ($scope.position !== undefined) {
			 angular.forEach($scope.position.primarySkills, function(value, key) {
				 skills.push(value.text);
				});
			 $scope.position.primarySkills = skills;
		     $scope.position.experienceRequired	= $scope.selectedExperience;
		     $scope.position.location = $scope.selectedLocation;
	 
		     position1.jobcode=$scope.position.jobcode;
		     position1.designation=$scope.position.selectedDesignation;
		     position1.experienceRequired=$scope.position.experienceRequired;
		     position1.primarySkills=$scope.position.primarySkills;
		     position1.secondarySkills=$scope.position.secondarySkills;
		     position1.noOfPositions=$scope.position.noOfPositions;
		     position1.jobProfile=$scope.position.jobProfile;
		     position1.location=$scope.position.location;
		     position1.client=$scope.position.client;

			$http.post(base_url + '/EmployeeReferral/resources/position-update', position1);
			location.href = '#pos';
		}
	}
	
	$scope.editPosition = function() {
         $scope.enableDisableButton = false;
         $scope.disableEditButton = true;
         $scope.Done = true;
 }

}]);