app.controller("createPositionCtrl", ['$scope', '$http', '$upload', function($scope, $http, $upload) {
	$scope.jbDisabled = true;
	$scope.disLocation = true;
    $scope.position ={};
    $scope.disableRegister = true;
    
    var ran = Math.floor((Math.random()*999)+1);
    var desgn = "";
    var sclient = "";
    var sloc = "";
   
	$scope.position.primarySkills = {};
	$scope.position.interviewRounds = {};
	$scope.primarySkills ={};
	$scope.devskills = {};
	$scope.qeskills = {};
	$scope.seskills = {};
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
	var IR_URL = base_url + '/EmployeeReferral/resources/skill/IR';
	var Designation_URL = base_url + '/EmployeeReferral/resources/skill/designations';
	var Experience_URL = base_url + '/EmployeeReferral/resources/skill/experience';
	var DeveloperSkills_URL = base_url + '/EmployeeReferral/resources/skill/developerskills';
	var QESkills_URL = base_url + '/EmployeeReferral/resources/skill/qeskills';
	var SESkills_URL = base_url + '/EmployeeReferral/resources/skill/seskills';
	var Location_URL = base_url + '/EmployeeReferral/resources/skill/location';
	var client_URL = base_url + '/EmployeeReferral/resources/skill/client';
	$scope.data = {};
	$scope.rounds = {};
	$scope.options = {};
	$scope.items = {};
	$scope.locations = {};
	$scope.clients = {};
	$http.get(Skills_URL).success(function(data, status, headers, config) {
		$scope.data = data;
		
	}).error(function(data, status, headers, config) {
		alert('error');
	})
	$http.get(IR_URL).success(function(data, status, headers, config) {
		$scope.rounds = data;
		
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
	
    $scope.loadRounds = function(query) {
		
		return $scope.rounds;
	};
	
	$scope.reset = function() {
		$scope.position = angular.copy($scope.master);
	}

	$scope.submit = function() {
		var skills =[];
		var rounds =[];
		if ($scope.position !== undefined) {
			 angular.forEach($scope.position.primarySkills, function(value, key) {
				 skills.push(value.text);
				});
			 $scope.position.primarySkills = skills;
			 angular.forEach($scope.position.InterviewRounds, function(value, key) {
				 rounds.push(value.text);
				});
			 $scope.position.InterviewRounds = skills;
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
		if($scope.selectedDesignation == "Select Designation" || $scope.selectedClient == "Select Client" || $scope.selectedExperience == "Select Experience" || $scope.position.jobProfile == null || $scope.position.jobProfile == '')
		$scope.disableRegister = true;
	else
		$scope.disableRegister = false;
	}
	
	$scope.changeDesignation = function(){
		if($scope.selectedDesignation == "Developer"){
			desg = "DEV";
			if($scope.selectedClient != "Select Client"){
				$scope.disLocation = false;
			}else{
				$scope.disLocation = true;
			}
		$scope.position.primarySkills = $scope.devskills;
		}
		else if ($scope.selectedDesignation == "Quality Engineer"){
			desg = "QE";
			if($scope.selectedClient != "Select Client"){
				$scope.disLocation = false;
			}else{
				$scope.disLocation = true;
			}
			$scope.position.primarySkills = $scope.qeskills;
		}
		else if($scope.selectedDesignation == "Select Designation"){
			$scope.disLocation = true;
		}
		else{
			desg = "SE";
			if($scope.selectedClient != "Select Client"){
				$scope.disLocation = false;
			}else{
				$scope.disLocation = true;
			}
			$scope.position.primarySkills = $scope.seskills;
		}
	}
	
	$scope.changeClient = function(){
		if($scope.selectedClient == "GAP"){
			sclient = "GAP";
			if($scope.selectedDesignation != "Select Designation"){
				$scope.disLocation = false;
			}else{
				$scope.disLocation = true;
			}
		}
		else if($scope.selectedClient == "Macys"){
			sclient = "Macys";
			if($scope.selectedDesignation != "Select Designation"){
				$scope.disLocation = false;
			}else{
				$scope.disLocation = true;
			}
		}
		else if($scope.selectedClient == "Select Client"){
			$scope.disLocation = true;
		}
		else{
			sclient = "Others";
			if($scope.selectedDesignation != "Select Designation"){
				$scope.disLocation = false;
			}else{
				$scope.disLocation = true;
			}
		}
	}
	
	$scope.changeLocation = function(){
		if($scope.selectedLocation == "Hyderabad"){
			sloc = "HYD";
			var dt = new Date();
			var curr_date = dt.getDate();
		    var curr_month = dt.getMonth() + 1;
		    var curr_year = dt.getFullYear();
		    $scope.position.jobcode = desg + "_" + sclient + "_" + sloc + "_" + curr_date + curr_month + curr_year + "_" + ran;
		}
		else if($scope.selectedLocation == "Pune"){
			sloc = "PUNE";
			var dt = new Date();
			var curr_date = dt.getDate();
		    var curr_month = dt.getMonth() + 1;
		    var curr_year = dt.getFullYear();
		    $scope.position.jobcode = desg + "_" + sclient + "_" + sloc + "_" + curr_date + curr_month + curr_year + "_" + ran;
		}
		else if($scope.selectedLocation == "Bengaluru"){
			sloc = "BLG";
			var dt = new Date();
			var curr_date = dt.getDate();
		    var curr_month = dt.getMonth() + 1;
		    var curr_year = dt.getFullYear();
		    $scope.position.jobcode = desg + "_" + sclient + "_" + sloc + "_" + curr_date + curr_month + curr_year + "_" + ran;
		}
	}
	
}]);