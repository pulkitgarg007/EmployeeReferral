app.controller("createProfileCtrl", ['$scope', '$http','$upload','$window', 'blockUI', function($scope, $http, $upload , $window, blockUI) {
	
	$scope.candidate = {};
	$scope.position = {};
	$scope.candidate.primarySkills = {};
	$scope.primarySkills ={};
	$scope.candidate.uploadedFileName = "";
	$scope.disableProBtn = true;
	var uploadedFileName = null;
	var base_url = window.location.origin;
	var URL = base_url + '/EmployeeReferral/resources/fileUpload';
	var Skills_URL = base_url + '/EmployeeReferral/resources/skill/skills';
	$scope.data = {};
	var uploadedFile = null;
	
	$scope.selectedQualification = "";
	$scope.candidate.qualification = "";
	var qualification_URL = base_url + '/EmployeeReferral/resources/skill/qualification';
	$scope.qualifications = {};
	
	$scope.selectedpLocation = "";
	$scope.candidate.plocation = "";
	var plocation_URL = base_url + '/EmployeeReferral/resources/skill/plocation';
	$scope.plocations = {};
	
	$scope.selectedreferredBy = "";
	$scope.candidate.referredBy = "";
	var referredBy_URL = base_url + '/EmployeeReferral/resources/skill/referredBy';
	$scope.referredBys = {};
	
	$scope.selectedExpYears = "";
	$scope.candidate.expYear = "";
	var expYear_URL = base_url + '/EmployeeReferral/resources/skill/expYears';
	$scope.expYears = {};
	
	$scope.selectedExpMonths = "";
	$scope.candidate.expMonth = "";
	var expMonth_URL = base_url + '/EmployeeReferral/resources/skill/expMonths';
	$scope.expMonths = {};
	
	$scope.selectedJC = "";
	$scope.candidate.jobcodeProfile = "";
	$scope.JCs = {};
	$scope.JobCodes = {};
	
	$http.get(Skills_URL).success(function(data, status, headers, config) {
		$scope.data = data;
		
	}).error(function(data, status, headers, config) {
		alert('error');
	})
	
	$http.get(qualification_URL).success(function(data, status, headers, config) {
		$scope.qualifications = data;
		$scope.selectedQualification = $scope.qualifications[0];
		
	}).error(function(data, status, headers, config) {
		alert('error');
	})
	
	$http.get(plocation_URL).success(function(data, status, headers, config) {
		$scope.plocations = data;
		$scope.selectedpLocation = $scope.plocations[0];
		
	}).error(function(data, status, headers, config) {
		alert('error');
	})
	
	$http.get(referredBy_URL).success(function(data, status, headers, config) {
		$scope.referredBys = data;
		$scope.selectedreferredBy = $scope.referredBys[0];
		
	}).error(function(data, status, headers, config) {
		alert('error');
	})
	
	$http.get(expYear_URL).success(function(data, status, headers, config) {
		$scope.expYears = data;
		$scope.selectedExpYears = $scope.expYears[0];
		
	}).error(function(data, status, headers, config) {
		alert('error');
	})
	
	$http.get(expMonth_URL).success(function(data, status, headers, config) {
		$scope.expMonths = data;
		$scope.selectedExpMonths = $scope.expMonths[0];
		
	}).error(function(data, status, headers, config) {
		alert('error');
	})
	
	$scope.loadTags = function(query) {
		
		return $scope.data;
	};
	
	
	$scope.jobCodeSl = function(){
		var jobcode_url = base_url + '/EmployeeReferral/resources/searchPositionBasedOnLocation?location='+$scope.selectedpLocation;
		
		$http.get(jobcode_url).success(function(data, status, headers, config) {
			$scope.JCs = data;
			
			var jobcodes = [];
			var i = 0;
			if ($scope.candidate !== undefined) {
				angular.forEach($scope.JCs[i], function() {
					jobcodes.push($scope.JCs[i]);
					$scope.JobCodes = jobcodes;
					i++;
				});
				
			
			}
			
			
			
		}).error(function(data, status, headers, config) {
			alert('error');
		})
	}
	
	
	 $scope.submit = function() {
		    if($scope.candidate !== undefined){
		    	var dt = new Date();
		    	var curr_date = dt.getDate();
		        var curr_month = dt.getMonth();
		        var curr_year = dt.getFullYear();
		        var timeStamp = curr_date + "-" + curr_month + "-" + curr_year;
		        
		        var skills =[];
				if ($scope.candidate !== undefined) {
					angular.forEach($scope.position.primarySkills, function(value, key) {
						 skills.push(value.text);
						});
					 $scope.candidate.primarySkills = skills;
				}
			    
		    	$scope.candidate.profilecreatedBy = sessionStorage.userId;
		    	$scope.candidate.qualification = $scope.selectedQualification;
		    	$scope.candidate.plocation = $scope.selectedpLocation;
		    	$scope.candidate.referredBy = $scope.selectedreferredBy;
		    	$scope.candidate.expYear = $scope.selectedExpYears;
		    	$scope.candidate.expMonth = $scope.selectedExpMonths;
		    	$scope.candidate.jobcodeProfile = $scope.selectedJC;
		    	$scope.candidate.profileTimeStamp = timeStamp;
		    	$scope.candidate.uploadedFileName = $scope.candidate.emailId + "_" + $scope.uploadedFileName;
		    	$http.post(base_url+'/EmployeeReferral/resources/profile', $scope.candidate).
		    	success(function(data, status, headers, config) {
				    document.getElementById("success-alert").style.display = "block";
				  }).
				  error(function(data, status, headers, config) {
					  console.log("Failed!!! ---> "+data);
					  document.getElementById("fail-alert").style.display = "block";
				  });;
		        $scope.uploadFileIntoDB($scope.uploadedFile);
		    }
		  }
	 
	 $scope.changeEvent = function(){
			if($scope.candidate.candidateName == null || $scope.candidate.candidateName == '' || $scope.candidate.qualification == null || $scope.candidate.qualification == '' || $scope.candidate.emailId == null || $scope.candidate.emailId == '' || $scope.candidate.positionName == null || $scope.candidate.positionName == '' || $scope.candidate.skills == null || $scope.candidate.skills == '' || $scope.candidate.mobileNo == null || $scope.candidate.mobileNo == '' ||  $scope.candidate.presentLocation == null || $scope.candidate.presentLocation == '' || $scope.candidate.pancardNo == null || $scope.candidate.pancardNo == '' || $scope.candidate.experience == null || $scope.candidate.experience == '' || $scope.candidate.passportNo == null || $scope.candidate.passportNo == '' || $scope.candidate.address == null || $scope.candidate.address == '')	
	    	$scope.enableDisbleButton = true;
		else
			$scope.enableDisbleButton = false;
		}
	 
	 $scope.uploadFileIntoDB = function (files) {
			$scope.fileName = "";
			$scope.errorMsg = "";
			$scope.showSuccessMsg = false;
			$scope.showErrorMsg = false;
	        if (files && ( files.length==1 )) {
	            for (var i = 0; i < files.length; i++) {
	                var file = files[0];
	                $upload.upload({
	                    url: URL,
	                    file: file
	                }).progress(function (evt) {
	                }).success(function (data, status, headers, config) {
	                		alert('Pdf Saved');
	                }).error(function (data, status, headers, config) {
	                	alert('Pdf Saved');
	                });
	            }
	        }
	        
		};
	
	$scope.upload = function (files) {
		$scope.uploadedFileName = files[0].name;
		$scope.uploadedFile = files;
	};
	
	$scope.toggleProDisable = function(){
		if($scope.candidate.candidateName == null || $scope.candidate.candidateName == '' || $scope.selectedQualification == "Select Qualification" || $scope.candidate.emailId == null || $scope.candidate.emailId == '' || $scope.candidate.mobileNo == null || $scope.candidate.mobileNo == '' || $scope.candidate.currentEmployer == null || $scope.candidate.currentEmployer == '' || $scope.candidate.skills == '' || $scope.selectedExpYears == 'Select Years' || $scope.selectedExpMonths == 'Select Months'){
			$scope.disableProBtn = true;
		}
		else{
			$scope.disableProBtn = false;
		}
	}
	
	
	/*$scope.startBlock = function() {
		blockUI.start("My custom message");;

	    $timeout(function() {
	      blockUI.stop();
	    }, 2000);
	  };*/
	
}]);