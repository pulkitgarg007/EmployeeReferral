angular.module('myApp',['angularFileUpload'])

.controller('formController',['$scope', '$http', '$upload', '$window', function($scope, $http, $upload , $window) {
	$scope.enableDisbleButton = true;
	var uploadedFileName = null;
	var base_url = window.location.origin;
	var URL = base_url + '/EmployeeReferral/resources/fileUpload';
	var uploadedFile = null;
	
	 $scope.submit = function() {
	    	
		    if($scope.candidate !== undefined){
		    	$http.post(base_url+'/EmployeeReferral/resources/candidate-create ', $scope.candidate);
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
}]);



