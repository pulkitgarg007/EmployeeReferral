app.controller("createProfileCtrl", ['$scope', '$http','$upload','$window', function($scope, $http, $upload , $window) {
	
	$scope.profilecreatedBy = sessionStorage.userId;
	$scope.candidate = {};
	$scope.candidate.uploadedFileName = "";
	$scope.disableProBtn = true;
	var uploadedFileName = null;
	var base_url = window.location.origin;
	var URL = base_url + '/EmployeeReferral/resources/fileUpload';
	var Position_URL = base_url + '/EmployeeReferral/resources/skill/position';
	$scope.options = {};
	$scope.selectedPosition = "";
	var uploadedFile = null;
	
	$http.get(Position_URL).success(function(data, status, headers, config) {
		$scope.position = data;
		$scope.selectedPosition = $scope.options[0];
	}).error(function(data, status, headers, config) {
		alert('error');
	})
	
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
	
	
	 $scope.submit = function() {
		    if($scope.candidate !== undefined){
		    	var dt = new Date();
		    	var curr_date = dt.getDate();
		        var curr_month = dt.getMonth();
		        var curr_year = dt.getFullYear();
		        var timeStamp = curr_date + "-" + curr_month + "-" + curr_year;
			    
		    	$scope.candidate.profilecreatedBy = sessionStorage.userId;
		    	$scope.candidate.qualification = $scope.selectedQualification;
		    	$scope.candidate.plocation = $scope.selectedpLocation;
		    	$scope.candidate.referredBy = $scope.selectedreferredBy;
		    	$scope.candidate.profileTimeStamp = timeStamp;
		    	$scope.candidate.uploadedFileName = $scope.candidate.emailId + "_" + $scope.uploadedFileName;
		    	$http.post(base_url+'/EmployeeReferral/resources/candidate-create ', $scope.candidate).
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
		if($scope.candidate.candidateName == null || $scope.candidate.candidateName == '' || $scope.selectedQualification == "Select Qualification" || $scope.candidate.emailId == null || $scope.candidate.emailId == '' || $scope.candidate.mobileNo == null || $scope.candidate.mobileNo == '' || $scope.candidate.currentEmployer == null || $scope.candidate.currentEmployer == '' || $scope.candidate.experience == null || $scope.candidate.experience == '' || $scope.candidate.skills == null || $scope.candidate.skills == ''){
			$scope.disableProBtn = true;
		}
		else{
			$scope.disableProBtn = false;
		}
	}
	
}]);