function formController ($scope,$http) {
       $scope.reset = function() {
       $scope.user = angular.copy($scope.master);
   };
   var base_url = window.location.origin;
   $scope.submit = function() {
   if($scope.user !== undefined){
       $http.post(base_url+'/EmployeeReferral/resources/user/register', $scope.user) 
   }
 }
   $scope.reset();
   $scope.submit();
}

angular.module('editUser',[])
.controller('editController',['$scope', '$http', '$q', '$location', '$window', function($scope, $http, $q, $location, $window) {
	

	 $scope.submit = function() {
		   if($scope.editUser !== undefined){
		       $http.post(base_url+'/EmployeeReferral/resources/user/update', $scope.editUser) 
		       window.location="searchUser.html";
		   }
		 }
	 
		$scope.editPosition = function() {
	         $scope.enableDisableButton = false;
	         $scope.disableEditButton = true;
	         $scope.Done = true;
	 }
		
		$scope.cancel = function() {
			$window.location.href = 'searchUser.html'
	} 
		
	$scope.data = {};
	$scope.editUser = {};
	$scope.userId = $location.search().target;
	var base_url = window.location.origin;
	var URL = base_url + '/EmployeeReferral/resources/user/searchUserById?userId='+$scope.userId;
	$http.get(URL).success(function(data, status, headers, config) {
		$scope.data = data;
		$scope.editUser.userId = data[0]['userId'];
		$scope.editUser.name = data[0]['name'];
		$scope.editUser.empId = data[0]['empId'];
		$scope.editUser.experience = data[0]['experience'];
		$scope.editUser.mobileNumber = data[0]['mobileNumber'];
		$scope.editUser.designation = data[0]['designation'];
		$scope.editUser.roles = data[0]['roles'];
		
	}).error(function(data, status, headers, config) {
		alert('error');
	});	
}])
