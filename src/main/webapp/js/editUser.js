var myApp = angular.module("erApp",[]);

myApp.controller('editUserCtrl',['$scope', '$http', '$q', '$location', '$window', function($scope, $http, $q, $location, $window) {
	  
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
	
	$scope.editUser = function() {
        $scope.enableDisableButton = false;
        $scope.disableEditButton = true;
        $scope.Done = true;
}

	 $scope.updateeditUserDetails = function() {
		 alert("hdf");
		   if($scope.editUser !== undefined){
		       $http.post(base_url+'/EmployeeReferral/resources/user/update', $scope.editUser) 
		       window.location="searchUser.html";
		   }
		 }

		$scope.cancel = function() {
			$window.location.href = 'searchUser.html'
	}
		
	
}])
