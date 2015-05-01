var myApp = angular.module("erApp",[]);

myApp.controller("createUserController",['$scope','$http','$window',function($scope, $http, $window){
	$scope.enableDisbleButton = true;
	$scope.options = {};
	$scope.selectedRole = "";
	var base_url = window.location.origin;
	var URL = base_url + '/EmployeeReferral/resources/skill/userrole';
	/*if(sessionStorage.getItem('userId') != null && sessionStorage.getItem('userId') != ''){
		var URL = base_url + '/EmployeeReferral/resources/user/searchUserBasedOnUserId?userId=' + sessionStorage.getItem('userId');
		$http.get(URL).success(function(data, status, headers, config) {
			if (data[0].userId != null) {
				sessionStorage.userId='';
				$window.location.href = 'searchPosition.html';
			}

		}).error(function(data, status, headers, config) {
			alert('error');
		});
	}	*/
	
       $scope.reset = function() {
       $scope.user = angular.copy($scope.master);
   };
   $http.get(URL).success(function(data, status, headers, config) {
	   $scope.options = data;
		$scope.selectedRole = $scope.options[0];
		
	}).error(function(data, status, headers, config) {
		alert('error');
	})
   $scope.submit = function() {
   if($scope.user !== undefined){
       $http.post(base_url+'/EmployeeReferral/resources/user/register', $scope.user) 
   }
 }
   $scope.reset();
   $scope.submit();
   
   $scope.changeEvent = function(){
		if($scope.user.userId == null || $scope.user.userId == '' || $scope.user.name == null || $scope.user.name == '' || $scope.user.empId == null || $scope.user.empId == '' || $scope.user.experience == null || $scope.user.experience == '' || $scope.user.mobileNumber == null || $scope.user.mobileNumber == '' || $scope.user.designation == null || $scope.user.designation == '' || $scope.user.roles == null || $scope.user.roles == '')
		$scope.enableDisbleButton = true;
	else
		$scope.enableDisbleButton = false;
	}
}]);