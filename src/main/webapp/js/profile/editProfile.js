app.controller('editProfileCtrl',['$scope', '$http','$q', '$window','jobCodeService1', '$timeout', function($scope, $http, $q, $window, jobCodeService1, $timeout) {
	
	$scope.oneAtATime = false;

	  $scope.groups = [
	    {
	      title: 'Dynamic Group Header - 1',
	      content: 'Dynamic Group Body - 1'
	    },
	    {
	      title: 'Dynamic Group Header - 2',
	      content: 'Dynamic Group Body - 2'
	    }
	  ];

	  $scope.items = ['Item 1', 'Item 2', 'Item 3'];

	  $scope.addItem = function() {
	    var newItemNo = $scope.items.length + 1;
	    $scope.items.push('Item ' + newItemNo);
	  };

	  $scope.status = {
	    isFirstOpen: true,
	    isFourthOpen: true,
	    isFirstDisabled: false,
	    isThirdOpen: false
	  };
	  
	  $scope.status1 = {
			    isFirstOpen: true,
			    isFirstDisabled: false
			  };
	
	$scope.data = {};
	$scope.sel = {};
	$scope.candidate = {};
	$scope.interview = {};
	$scope.selectedpLocation={};
	$scope.qualifications={};
	$scope.plocations={};
	$scope.expYears = {};
	$scope.expMonths = {};
	$scope.referredBys = {};
	$scope.sel.selectedLocation = "";
	$scope.interview.interviewLocation = "";
	$scope.locations = {};
	$scope.sel.selectedtypeOfInterview = "";
	$scope.interview.typeOfInterview = "";
	$scope.typeOfInterviews = {};
	$scope.interview.interviewDateTime = "";
	$scope.intCheck = {};
	$scope.interviewLoad = {};
	$scope.emailId = jobCodeService1.getprofileUserId();
	var base_url = window.location.origin;
	var qualification_URL = base_url + '/EmployeeReferral/resources/skill/qualification';
	var expYears_URL = base_url + '/EmployeeReferral/resources/skill/expYears';
	var expMonths_URL = base_url + '/EmployeeReferral/resources/skill/expMonths';
	var referredBy_URL = base_url + '/EmployeeReferral/resources/skill/referredBy';
	var plocation_URL = base_url + '/EmployeeReferral/resources/skill/location';
	var URL = base_url + '/EmployeeReferral/resources/profile?emailId='+$scope.emailId;
	var Location_URL = base_url + '/EmployeeReferral/resources/skill/location';
	var typeOfInterview_URL = base_url + '/EmployeeReferral/resources/skill/typeOfInterview';
	var interview_URL = base_url + '/EmployeeReferral/resources/interview-check?candidateId='+$scope.emailId;
	
	$http.get(interview_URL).success(function(data, status, headers, config) {
		$scope.intCheck = data;
		if($scope.intCheck.length == 1){
			location.href = "#viewProfile/showInterview";
		}
		else if($scope.intCheck.length == 0){
			location.href = "#viewProfile/scheduleInterview";
		}
	}).error(function(data, status, headers, config) {
		alert('error');
	})	
	
	$http.get(interview_URL).success(function(data, status, headers, config) {
		$scope.interviewLoad = data[0];
	}).error(function(data, status, headers, config) {
		alert('error');
	})
	
	$http.get(Location_URL).success(function(data, status, headers, config) {
		$scope.locations = data;
		$scope.sel.selectedLocation = $scope.locations[0];
	}).error(function(data, status, headers, config) {
		alert('error');
	})
	
	$http.get(typeOfInterview_URL).success(function(data, status, headers, config) {
		$scope.typeOfInterviews = data;
		$scope.sel.selectedtypeOfInterview = $scope.typeOfInterviews[0];
	}).error(function(data, status, headers, config) {
		alert('error');
	})
	
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
	
	$scope.schedule = function(){
		$scope.interview.typeOfInterview = $scope.sel.selectedtypeOfInterview;
		$scope.interview.interviewLocation = $scope.sel.selectedLocation;
		$scope.interview.interviewDateTime = $scope.data.date;
		$scope.interview.candidateId = $scope.candidate.emailId;
		
		$http.post(base_url + '/EmployeeReferral/resources/interview-create', $scope.interview).
		  success(function(data, status, headers, config) {
		    console.log("success============================="+data);
		    var Mail_URL = base_url + '/EmployeeReferral/resources/sendMail?emailId='+$scope.candidate.emailId+'&jobcode='+$scope.candidate.jobcodeProfile+'&emailIdInterviewer='+$scope.interview.emailIdInterviewer+'&cname='+$scope.candidate.candidateName;
			$http.get(Mail_URL).success(function(data, status, headers, config) {
				alert("Mails Sent Successfully!");
			}).error(function(data, status, headers, config) {
				alert("Failed To Send Mails!");
			});
		  }).
		  error(function(data, status, headers, config) {
			  console.log("failed============================="+data);
		  });
	}
		 
}]);