
function formController ($scope,$http) {
    $scope.reset = function() {
        $scope.position = angular.copy($scope.master);
    };
    var base_url = window.location.origin;
    $scope.submit = function() {
    if($scope.position !== undefined){
        $http.post(base_url+'/EmployeeReferral/resources/position-create ', $scope.position) 
    }
  }
    
    $scope.reset();
    $scope.submit();
}


