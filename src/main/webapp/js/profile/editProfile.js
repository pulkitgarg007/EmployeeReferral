app.controller('editProfileCtrl',['$scope', '$http','$q', '$window','jobCodeService1', function($scope, $http, $q, $window, jobCodeService1) {

	$scope.data = {};
	$scope.candidate = {};
	$scope.selectedpLocation={};
	$scope.qualifications={};
	$scope.plocations={};
	$scope.expYears = {};
	$scope.expMonths = {};
	$scope.referredBys = {};
	$scope.emailId = jobCodeService1.getprofileUserId();
	var base_url = window.location.origin;
	var qualification_URL = base_url + '/EmployeeReferral/resources/skill/qualification';
	var expYears_URL = base_url + '/EmployeeReferral/resources/skill/expYears';
	var expMonths_URL = base_url + '/EmployeeReferral/resources/skill/expMonths';
	var referredBy_URL = base_url + '/EmployeeReferral/resources/skill/referredBy';
	var plocation_URL = base_url + '/EmployeeReferral/resources/skill/location';
	var URL = base_url + '/EmployeeReferral/resources/profile?emailId='+$scope.emailId;
	
	$http.get(qualification_URL).success(function(data, status, headers, config) {
		$scope.qualifications = data;
		$scope.selectedQualification = $scope.qualifications[0];
		
	}).error(function(data, status, headers, config) {
		alert('error');
	})
	
	$http.get(expYears_URL).success(function(data, status, headers, config) {
		$scope.expYears = data;
		//$scope.selectedQualification = $scope.qualifications[0];
		
	}).error(function(data, status, headers, config) {
		alert('error');
	})
	
	$http.get(expMonths_URL).success(function(data, status, headers, config) {
		$scope.expMonths = data;
		//$scope.selectedQualification = $scope.qualifications[0];
		
	}).error(function(data, status, headers, config) {
		alert('error');
	})
	
	$http.get(referredBy_URL).success(function(data, status, headers, config) {
		$scope.referredBys = data;
		//$scope.selectedQualification = $scope.qualifications[0];
		
	}).error(function(data, status, headers, config) {
		alert('error');
	})
	
	$http.get(plocation_URL).success(function(data, status, headers, config) {
		$scope.plocations = data;
		$scope.selectedpLocation = $scope.plocations[0];
		
	}).error(function(data, status, headers, config) {
		alert('error');
	})
	
	$http.get(URL).success(function(data, status, headers, config) {
		$scope.candidate =data[0];
	}).error(function(data, status, headers, config) {
		alert('error');
	});	
	$scope.editCandidate = function() {
		$scope.enableDisableButton = false;
        $scope.disableEditButton = true;
        $scope.Done = true;
	}
	
	$scope.validateName = function(data) {
		//var regexp="/^[a-zA-Z _]*$/";
		if(onlyChar(data)){
			return true;	
		}
		else
			return "Candidate name only in cha..";
	  };
	  
	  $scope.validatePhNo = function(data) {
			if(onlyNum(data)){
				return true;	
			}
			else
				return "Mobile number is numberic..";
		  };
	
	$scope.updateProfileDetails = function() {
		if($scope.candidate !== undefined){
			var dt = new Date();
	    	var curr_date = dt.getDate();
	        var curr_month = dt.getMonth();
	        var curr_year = dt.getFullYear();
	        var timeStamp = curr_date + "-" + curr_month + "-" + curr_year;
	        $scope.candidate.profileModifiedTimeStamp = timeStamp;
		var base_url = window.location.origin;
		var URL = base_url + '/EmployeeReferral/resources/profile';
		$http.put(URL,$scope.candidate);
		location.href = '#searchProfile';
		}
	}
	
	  
}]);