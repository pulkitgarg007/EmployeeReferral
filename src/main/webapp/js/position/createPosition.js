app.controller("createPositionCtrl", ['$scope', '$http', function($scope, $http) {
	$scope.jbDisabled = true;
    $scope.position ={};
    $scope.disableRegister = true;
    
    var dev = "DEV";
    var qe = "QE";
    var se = "SE";
	var ran = Math.floor((Math.random()*999)+1);
   
	$scope.position.primarySkills = {};
	
	$scope.primarySkills ={};
	$scope.devskills = {};
	$scope.qeskills = {};
	$scope.seskills = {};
	$scope.client = {};
	$scope.selectedDesignation = "";
	$scope.selectedExperience = "";
	$scope.selectedLocation = "";
	$scope.selectedClient = "";
	$scope.position.designation = "";
	$scope.position.experienceRequired = "";
	$scope.position.location = "";
	$scope.position.client = "";
	$scope.enableDisbleButton = true;
	
	
	var base_url = window.location.origin;
	var Skills_URL = base_url + '/EmployeeReferral/resources/skill/skills';
	var Designation_URL = base_url + '/EmployeeReferral/resources/skill/designations';
	var Experience_URL = base_url + '/EmployeeReferral/resources/skill/experience';
	var DeveloperSkills_URL = base_url + '/EmployeeReferral/resources/skill/developerskills';
	var QESkills_URL = base_url + '/EmployeeReferral/resources/skill/qeskills';
	var SESkills_URL = base_url + '/EmployeeReferral/resources/skill/seskills';
	var Location_URL = base_url + '/EmployeeReferral/resources/skill/location';
	var client_URL = base_url + '/EmployeeReferral/resources/skill/client';
	$scope.data = {};
	$scope.options = {};
	$scope.items = {};
	$scope.locations = {};
	$scope.clients = {};
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
	
	$http.get(SESkills_URL).success(function(data, status, headers, config) {
		$scope.seskills = data;
		
	}).error(function(data, status, headers, config) {
		alert('error');
	})
	
	$http.get(client_URL).success(function(data, status, headers, config) {
		$scope.clients = data;
		$scope.selectedClient = $scope.clients[0];
		
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
		     $scope.position.client = $scope.selectedClient;
			/*$http.post(base_url + '/EmployeeReferral/resources/position-create', $scope.position)
			*/
		     
		     
		     $http.post(base_url + '/EmployeeReferral/resources/position-create', $scope.position).
			  success(function(data, status, headers, config) {
			    console.log("success============================="+data);
			    document.getElementById("success-alert").style.display = "block";
			  }).
			  error(function(data, status, headers, config) {
				  console.log("failed============================="+data);
				  document.getElementById("fail-alert").style.display = "block";
			  });
		}
		$scope.reset();
	}
	
	
	
	
	
	$scope.reset();
	$scope.submit();
	
	$scope.changeEvent = function(){
		if($scope.position.jobcode == null || $scope.position.jobcode == '' || $scope.position.primarySkills == null || $scope.position.primarySkills == '' || $scope.position.secondarySkills == null || $scope.position.secondarySkills == '' || $scope.position.jobProfile == null || $scope.position.jobProfile == '' || $scope.position.noOfPositions == null || $scope.position.noOfPositions == '' || $scope.selectedDesignation == "Select Designation" || $scope.selectedExperience == "Select Experience" || $scope.selectedLocation == "Select Locations" || $scope.selectedClient == "Select Client")
		$scope.disableRegister = true;
	else
		$scope.disableRegister = false;
	}
	
	$scope.changeDesignation = function(){
		if($scope.selectedDesignation == "Developer"){
			var dt = new Date();
			var curr_date = dt.getDate();
		    var curr_month = dt.getMonth() + 1; //Months are zero based
		    var curr_year = dt.getFullYear();
		    var curr_hour = dt.getHours();
		    var curr_min = dt.getMinutes();
		    var curr_sec = dt.getSeconds();
		$scope.position.primarySkills = $scope.devskills;
		$scope.position.jobcode = dev + "_" + ran + "_" + curr_date + "-" + curr_month + "-" + curr_year + "_" + curr_hour + "-" + curr_min + "-" + curr_sec;
		}
		else if ($scope.selectedDesignation == "Quality Engineer"){
			var dt = new Date();
			var curr_date = dt.getDate();
		    var curr_month = dt.getMonth() + 1; //Months are zero based
		    var curr_year = dt.getFullYear();
		    var curr_hour = dt.getHours();
		    var curr_min = dt.getMinutes();
		    var curr_sec = dt.getSeconds();
			$scope.position.primarySkills = $scope.qeskills;
			$scope.position.jobcode = qe + "_" + ran + "_" + curr_date + "-" + curr_month + "-" + curr_year + "_" + curr_hour + "-" + curr_min + "-" + curr_sec;
		}
		else{
			var dt = new Date();
			var curr_date = dt.getDate();
		    var curr_month = dt.getMonth() + 1; //Months are zero based
		    var curr_year = dt.getFullYear();
		    var curr_hour = dt.getHours();
		    var curr_min = dt.getMinutes();
		    var curr_sec = dt.getSeconds();
			$scope.position.primarySkills = $scope.seskills;
			$scope.position.jobcode = se + "_" + ran + "_" + curr_date + "-" + curr_month + "-" + curr_year + "_" + curr_hour + "-" + curr_min + "-" + curr_sec;
		}
	}
}]);