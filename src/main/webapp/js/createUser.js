
function formController ($scope,$http) {
	alert('Cliked');
    $scope.reset = function() {
        $scope.user = angular.copy($scope.master);
    };
    var base_url = window.location.origin;
    $scope.submit = function() {
    if($scope.user !== undefined){
        $http.post(base_url+'/EmployeeReferral/resources/register ', $scope.user) 
    }
  }
    
    $scope.reset();
    $scope.submit();
}


