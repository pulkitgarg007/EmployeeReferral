function formController ($scope,$http , $window) {
	$scope.enableDisbleButton = true;
	var base_url = window.location.origin;
	if(sessionStorage.getItem('userId') != null && sessionStorage.getItem('userId') != ''){
		var URL = base_url + '/EmployeeReferral/resources/user/searchUserBasedOnUserId?userId=' + sessionStorage.getItem('userId');
		$http.get(URL).success(function(data, status, headers, config) {
			if (data[0].userId != null) {
				sessionStorage.userId='';
				$window.location.href = 'searchPosition.html';
			}

		}).error(function(data, status, headers, config) {
			alert('error');
		});
	}	
	
       $scope.reset = function() {
       $scope.user = angular.copy($scope.master);
   };
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
}

angular.module('editUser',[])
.controller('editController',['$scope', '$http', '$q', '$location', '$window', function($scope, $http, $q, $location, $window) {
	
	$scope.editUserr = function() {
        $scope.enableDisableButton = false;
        $scope.disableEditButton = true;
        $scope.Done = true;
}

	 $scope.submit = function() {
		   if($scope.editUser !== undefined){
		       $http.post(base_url+'/EmployeeReferral/resources/user/update', $scope.editUser) 
		       window.location="searchUser.html";
		   }
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
