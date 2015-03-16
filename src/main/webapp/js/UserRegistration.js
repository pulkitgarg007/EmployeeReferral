function formController ($scope,$http) {
    $scope.reset = function() {
        $scope.user = angular.copy($scope.master);
    };
    var base_url = window.location.origin;
    $scope.submit = function() {
    if($scope.user !== undefined){
    	alert($scope.user);
        $http.post(base_url+'/EmployeeReferral/resources/user/register ', $scope.user) 
    }
  }
    
    $scope.reset();
    $scope.submit();
}