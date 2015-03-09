
function formController ($scope,$http) {
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
}


