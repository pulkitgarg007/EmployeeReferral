var app = angular.module('erApp', ['ngTagsInput','ngGrid','ngRoute']);
app.config( ['$routeProvider', function($routeProvider) {
			$routeProvider
				.when('/searchPosition', {
					templateUrl: 'routeCreatePosition.html'
				})
				.when('/pos', {
					templateUrl: 'routeIndex.html'
				})
				.otherwise({
					redirectTo: '/pos'
				});

		}]);	
app.controller('positionCtrl',['$scope', '$http','$q', '$window', function($scope, $http, $q, $window) {
	
	$scope.hide = function(){
		document.getElementById('gd').style.display = 'none';
	}
	
	$scope.show = function(){
		document.getElementById('gd').style.display = 'block';
	}
	
	//$scope.enableDisbleButton = true;
	$scope.data = {};
	var base_url = window.location.origin;
	var URL = base_url + '/EmployeeReferral/resources/searchAllPosition'; 
	$http.get(URL).success(function(data, status, headers, config) {
		$scope.data.gridSkills = data;
	}).error(function(data, status, headers, config) {
		alert('error');
	});	
	
	$scope.searchCandidate = function() {
		alert("Hello");
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
   		    //{field:'select', displayName: 'Select', width:"100", cellTemplate:'<input type="checkbox" style="position:absolute;top:10px;" />'},
   		    {field:'btn', displayName: 'Delete', width:"75", cellTemplate:'<input type="button" class="btn btn-info" ng-click="deletePosition(row)" value="Del" name="post" style="position:absolute;right:15px;top:2px;height:25px;color: fff;"/>'},
   		    {field:'btn', displayName: 'Edit', width:"75", cellTemplate:'<input type="button" class="btn btn-info" ng-click="editPosition(row)" value="Edit" name="post" style="position:absolute;right:15;top:2px;height:25px;color: fff;"/>'},
		    {field:'jobcode', displayName:'Job Code', width: "73", cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><a ng-click="editPosition(row)">{{row.getProperty(\'jobcode\')}}</a></div>'}, 
		    {field:'designation', displayName:'Designation', width: "125"}, 
		    {field:'experienceRequired', displayName:'Experience', width: "75"}, 
		    {field:'primarySkills', displayName:'Primary Skills', width: "145"}, 
   			{field:'noOfPositions', displayName:'No Of Positions', width: "50"}, 
   			{field:'jobProfile', displayName:'Job Profile', width: "100"}
   		    ]
    };
	
	$scope.editPosition = function(row) {
		window.console && console.log(row.entity);
		$window.location.href = 'editPosition.html#?target='+row.entity.jobcode;
	};
	
	$scope.deletePosition = function(row) {
		window.console && console.log(row.entity);
		//alert("Hello");
		//$scope.jbexample = "12345";
		var URL_DEL = base_url + '/EmployeeReferral/resources/deletePositionBasedOnJC?jobcode='+row.entity.jobcode;
		$http.get(URL_DEL).success(function(data, status, headers, config) {
			
		}).error(function(data, status, headers, config) {
			alert('error');
		});
		var URL = base_url + '/EmployeeReferral/resources/searchAllPosition';
		$http.get(URL).success(function(data, status, headers, config) {
			$scope.data.gridSkills = data;
		}).error(function(data, status, headers, config) {
			alert('error');
		});	
	};
	
	
}]);
