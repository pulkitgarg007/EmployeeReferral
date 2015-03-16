function homePageControllerClass ($scope,$http) {
	$scope.redirectForCreatingPosition() = function(){
		  window.location = "http://localhost:8080/EmployeeReferral/createPosition.html";
		}
	$scope.redirectForCreatingUser() = function(){
		  window.location = "http://localhost:8080/EmployeeReferral/User.html";
		}
	$scope.redirecteatForCreatingCandidate() = function(){
		  window.location = "http://localhost:8080/EmployeeReferral/candidate.html";
		}
}
