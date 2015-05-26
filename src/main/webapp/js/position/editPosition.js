app.controller("editPositionCtrl",   ['$scope', '$http','jobCodeService1', function($scope, $http,jobCodeService1) {
	
	$scope.oneAtATime = false;
	 $scope.status = {
			    isFirstOpen: true,
			    isFirstDisabled: false,
			    isThirdOpen: false
			  };

	
	$scope.page = "Edit Position";
	$scope.enableDisableButton = true;
	$scope.data = {};
	$scope.position ={};
	$scope.position.primarySkills = {};
	$scope.primarySkills =[];
	$scope.devskills = {};
	$scope.qeskills = {};
	$scope.seskills = {};
	
	var url =window.location;
	$scope.jobcode =jobCodeService1.getjobCode();
	var base_url = window.location.origin;
	var skillURL = base_url + '/EmployeeReferral/resources/skill';
	
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
	$scope.options = {};
	$scope.irounds = {};
	$scope.exp = {};
	$scope.locations = {};
	$scope.clients = {};
	$http.get(Skills_URL).success(function(data, status, headers, config) {
		$scope.data = data;
		
	}).error(function(data, status, headers, config) {
		alert('error');
	})
	$http.get(IR_URL).success(function(data, status, headers, config) {
		$scope.irounds = data;
		
	}).error(function(data, status, headers, config) {
		alert('error');
	})
	
	$http.get(DeveloperSkills_URL).success(function(data, status, headers, config) {
		$scope.devskills = data;
		$scope.selectPrimarySkills = $scope.devskills;
		
	}).error(function(data, status, headers, config) {
		alert('error');
	})
	$http.get(SESkills_URL).success(function(data, status, headers, config) {
		$scope.seskills = data;
		$scope.selectSESPrimarySkills = $scope.seskills;
		
	}).error(function(data, status, headers, config) {
		alert('error');
	})
	
	$http.get(QESkills_URL).success(function(data, status, headers, config) {
		$scope.qeskills = data;
		$scope.selectQEPrimarySkills = $scope.qeskills;
		
	}).error(function(data, status, headers, config) {
		alert('error');
	})
	
	
	$http.get(client_URL).success(function(data, status, headers, config) {
		$scope.clients = data;
		$scope.client = $scope.clients[0];
		
	}).error(function(data, status, headers, config) {
		alert('error');
	})
	
	$http.get(Designation_URL).success(function(data, status, headers, config) {
		$scope.options = data;
		$scope.selectedDesignation = $scope.options;
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
		$scope.exp = data;
		$scope.selectedExperience = $scope.items[0];
	}).error(function(data, status, headers, config) {
		alert('error');
	})
	
	$scope.loadTags = function(query) {
		return $scope.data;
	};	
	var URL = base_url + '/EmployeeReferral/resources/searchPositionsBasedOnJobCode?jobcode='+$scope.jobcode;
	
	$http.get(URL).success(function(data, status, headers, config) {
		$scope.position =data;
		$scope.enableDisableButton = false;
		$scope.position.interviewRounds = $scope.ir.interviewRounds;
		$scope.selectedExperience = $scope.position.experienceRequired;
		$scope.position.selectedDesignation = $scope.position.designation;
		$scope.selectedLocation = $scope.position.location;
		$scope.position.client =  $scope.position.client;
		// $scope.position.primarySkills =$scope.selectPrimarySkills;
		// console.log("2------->"+angular.toJson($scope.position));
	}).error(function(data, status, headers, config) {
		alert('error');
	});	
	
	$scope.updatePositionDetails = function() {
		var position1={};
		var skills =[];
		if ($scope.position !== undefined) {
			 angular.forEach($scope.position.primarySkills, function(value, key) {
				 skills.push(value.toString());
				});
			 $scope.position.primarySkills = skills;
			
		   /*
			 * $scope.position.experienceRequired = $scope.selectedExperience;
			 * $scope.position.location = $scope.selectedLocation;
			 */
			
		     position1.jobcode=$scope.position.jobcode;
		     position1.designation=$scope.position.designation;
		     position1.experienceRequired=$scope.position.experienceRequired;
		     position1.primarySkills=$scope.position.primarySkills;
		     position1.secondarySkills=$scope.position.secondarySkills;
		   // position1.InterviewRoundss=$scope.position.InterviewRounds;
		     position1.jobProfile=$scope.position.jobProfile;
		     position1.location=$scope.position.location;
		     position1.client=$scope.position.client;
		     position1.interviewRounds = $scope.position.interviewRounds;
		     alert("updated position details");
         
			$http.post(base_url + '/EmployeeReferral/resources/position-update', position1);
			location.href = '#searchPosition';
		}
	}
	
	$scope.editPosition = function() {
         $scope.enableDisableButton = false;
         $scope.disableEditButton = true;
         $scope.Done = true;
 }
	
	$scope.changeDesignation = function(value){
		alert(value);
	
				var skills =[];
			 angular.forEach($scope.selectPrimarySkills, function(value, key) {
				 skills.push(value.toString());
				 $scope.position.primarySkills = skills;
				});
			 var QEskills =[];
			 angular.forEach($scope.selectQEPrimarySkills, function(value, key) {
				 QEskills.push(value.toString());
				 $scope.position.primarySkills = QEskills;
				});
			/* var SESskills =[];
			 angular.forEach($scope.selectSESPrimarySkills, function(value, key) {
				 QEskills.push(value.toString());
				 $scope.position.SESprimarySkills = QEskills;
				});*/
			
		if($scope.position.designation == "Developer"){
			desg = "DEV";
			/*
			 * if($scope.selectedClient != "Select Client"){ $scope.disLocation =
			 * false; }else{ $scope.disLocation = true; }
			 */
			// $scope.position.primarySkills = $scope.position.DEprimarySkills;
			$scope.position.primarySkills =  $scope.position.QEprimarySkills;
		
		}
		
		else if ($scope.position.designation == "Quality Engineer"){
			desg = "QE";
			/*
			 * if($scope.selectedClient != "Select Client"){ $scope.disLocation =
			 * false; }else{ $scope.disLocation = true; }
			 */
			
			//$scope.position.primarySkills  =  $scope.position.DEprimarySkills;
		}
		else if($scope.selectedDesignation == "	System Engineer"){

			$scope.disLocation = true;
		}
		else{
			desg = "SE";
			/*if($scope.selectedClient != "Select Client"){
				$scope.disLocation = false;
			}else{
				$scope.disLocation = true;
			}*/
			$scope.position.primarySkills =  $scope.position.SESprimarySkills;
		}
	}

	

}]);
/*
 * app.directive('datetimez', function() { alert("time") return { restrict: 'A',
 * scope:{dateVal: '=ngModel'}, require : 'ngModel', link: function(scope,
 * element, attrs, ngModelCtrl) { element.datetimepicker({
 * dateFormat:'dd/MM/yyyy hh:mm:ss', language: 'pt-BR' }).on('changeDate',
 * function(e) { scope.dateVal = e.date; scope.$apply(); });
 * 
 * scope.$watch('dateVal',function(newVal){ var picker =
 * $(element).data('datetimepicker'); picker.setDate(newVal) }); } }; });
 */
