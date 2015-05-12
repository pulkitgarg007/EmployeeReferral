app.controller("createProfileCtrl", ['$scope', '$http', function($scope, $http, $upload , $window) {
	
	$scope.candidate = {};
	$scope.disableRegister = true;
	var uploadedFileName = null;
	var base_url = window.location.origin;
	var URL = base_url + '/EmployeeReferral/resources/fileUpload';
	var Position_URL = base_url + '/EmployeeReferral/resources/skill/position';
	$scope.options = {};
	$scope.selectedPosition = "";
	var uploadedFile = null;

	$scope.selectedempPosition = "";
	$scope.candidate.positionName = "";
	var empPosition_URL = base_url + '/EmployeeReferral/resources/skill/empPosition';
	$scope.empPositions = {};
	
	$http.get(empPosition_URL).success(function(data, status, headers, config) {
		$scope.empPositions = data;
		$scope.selectedempPosition = $scope.empPositions[0];
		
	}).error(function(data, status, headers, config) {
		alert('error');
	})
	
	
	$http.get(Position_URL).success(function(data, status, headers, config) {
		$scope.position = data;
		$scope.selectedPosition = $scope.options[0];
	}).error(function(data, status, headers, config) {
		alert('error');
	})
	
	 $scope.submit = function() {
		    if($scope.candidate !== undefined){
		    	$scope.candidate.positionName = $scope.selectedempPosition;
		    	$http.post(base_url+'/EmployeeReferral/resources/candidate-create ', $scope.candidate).
		    	success(function(data, status, headers, config) {
				    document.getElementById("success-alert").style.display = "block";
				  }).
				  error(function(data, status, headers, config) {
					  console.log("Failed!!! ---> "+data);
					  document.getElementById("fail-alert").style.display = "block";
				  });
		        $scope.uploadFileIntoDB($scope.uploadedFile);
		    }
		  }
	 
	 $scope.changeEvent = function(){
			if($scope.candidate.candidateName == null || $scope.candidate.candidateName == '' || $scope.candidate.qualification == null || $scope.candidate.qualification == '' || $scope.candidate.emailId == null || $scope.candidate.emailId == '' || $scope.candidate.positionName == null || $scope.candidate.positionName == '' || $scope.candidate.skills == null || $scope.candidate.skills == '' || $scope.candidate.mobileNo == null || $scope.candidate.mobileNo == '' ||  $scope.candidate.presentLocation == null || $scope.candidate.presentLocation == '' || $scope.candidate.pancardNo == null || $scope.candidate.pancardNo == '' || $scope.candidate.experience == null || $scope.candidate.experience == '' || $scope.candidate.passportNo == null || $scope.candidate.passportNo == '')	
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
	
	$scope.changeEvent = function(){
		if($scope.candidate.candidateName == null || $scope.candidate.candidateName == '' || $scope.candidate.qualification == null || $scope.candidate.qualification == '' || $scope.candidate.emailId == null || $scope.candidate.emailId == '' || $scope.candidate.skills == null || $scope.candidate.skills == '' || $scope.candidate.mobileNo == null || $scope.candidate.mobileNo == '' || $scope.candidate.presentLocation == null || $scope.candidate.presentLocation == '' || $scope.candidate.experience == null || $scope.candidate.experience == '')
		$scope.disableRegister = true;
	else
		$scope.disableRegister = false;
	}
	
}]);