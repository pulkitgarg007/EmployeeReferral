var app = angular.module('myApp', ['ngGrid']);
app.controller('viewUserController',['$scope', '$http','$q', function($scope,$http,$q) {
	$scope.data = {};
	$scope.mySelections = [];
	
	$scope.searchUser = function() {
		var base_url = window.location.origin;
		var URL = base_url + '/EmployeeReferral/resources/user/searchUser?name='+$scope.user.name;
		$http.get(URL).success(function(data, status, headers, config) {
			$scope.data.gridSkills = data;
		}).error(function(data, status, headers, config) {
			alert('error');
		});	
	};
	
	
	
	$scope.gridOptions = { 
		
		 data: 'data.gridSkills' ,
   		 showFilter:false,
   		 showColumnMenu:false,
   		 showFooter:false,
   		 displaySelectionCheckbox:false,
   		 multiSelect: false,
   		 footerVisible: false,
   		 footerTemplate:false,
   		 columnDefs: [
		    {field:'userId', displayName:'User Id ', width: "100"}, 
   			{field:'name', displayName:'Name', width: "200"},
   			{field:'empId', displayName:'Employee Id', width: "100"}, 
   			{field:'experience', displayName:'Experience', width: "100"},
   			{field:'mobileNumber', displayName:'Contact No', width: "100"}, 
   			{field:'designation', displayName:'Designation', width: "100"},
   			{field:'roles', displayName:'Roles', width: "100"}
   		    ]
    };
	
}]);
