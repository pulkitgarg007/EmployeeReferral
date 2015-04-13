function formController ($scope,$http) {
		$scope.enableDisbleButton = true;;
	    $scope.reset = function() {
        $scope.candidate = angular.copy($scope.master);
    };
    var base_url = window.location.origin;
    $scope.submit = function() {
    	
    if($scope.candidate !== undefined){
    		
        $http.post(base_url+'/EmployeeReferral/resources/candidate-create ', $scope.candidate) 
    }
  }
    
    $scope.reset();
    $scope.submit();
    
    $scope.changeEvent = function(){
		if($scope.candidate.candidateName == null || $scope.candidate.candidateName == '' || $scope.candidate.qualification == null || $scope.candidate.qualification == '' || $scope.candidate.emailId == null || $scope.candidate.emailId == '' || $scope.candidate.positionName == null || $scope.candidate.positionName == '' || $scope.candidate.skills == null || $scope.candidate.skills == '' || $scope.candidate.mobileNo == null || $scope.candidate.mobileNo == '' ||  $scope.candidate.presentLocation == null || $scope.candidate.presentLocation == '' || $scope.candidate.pancardNo == null || $scope.candidate.pancardNo == '' || $scope.candidate.experience == null || $scope.candidate.experience == '' || $scope.candidate.passportNo == null || $scope.candidate.passportNo == '')	
    	$scope.enableDisbleButton = true;
	else
		$scope.enableDisbleButton = false;
	}
}


