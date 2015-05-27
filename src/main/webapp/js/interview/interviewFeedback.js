app.controller('interviewFeedbackCtrl',['$scope', '$http','$q', '$window','jobCodeService1', '$timeout', function($scope, $http, $q, $window, jobCodeService1, $timeout) {
	$scope.status = {
		    isFirstOpen: false,
		    isSecondOpen: false,
		    isFourthOpen: true,
		    isFirstDisabled: false,
		    isThirdOpen: false
		  };
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