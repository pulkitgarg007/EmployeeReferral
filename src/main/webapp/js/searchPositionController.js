var app = angular.module('myApp', ['ngGrid']);
app.controller('searchPositionController',['$scope', '$http','$q', function($scope,$http,$q) {
	$scope.data = {};
	
	var base_url = window.location.origin;
	var URL = base_url + '/EmployeeReferral/resources/searchAllPosition'; 
	$http.get(URL).success(function(data, status, headers, config) {
		$scope.data.gridSkills = data;
	}).error(function(data, status, headers, config) {
		alert('error');
	});	
	
	$scope.searchCandidate = function() {
		var URL = base_url + '/EmployeeReferral/resources/searchPositionsBasedOnDesignation?designation='+$scope.searchPosition.designations;
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
		    {field:'jobcode', displayName:'Job Code', width: "50"}, 
		    {field:'designation', displayName:'Designation', width: "75"}, 
		    {field:'experienceRequired', displayName:'Experience', width: "75"}, 
		    {field:'primarySkills', displayName:'Primary Skills', width: "130"}, 
   			{field:'secondarySkills', displayName:'Secondary Skills', width: "100"},
   			{field:'noOfPositions', displayName:'No Of Positions', width: "50"}, 
   			{field:'jobProfile', displayName:'Job Profile', width: "100"}
   		    ]
    };
	
}]);
