var app = angular.module('myApp', ['ngGrid']).directive('loading', function () {
    return {
        restrict: 'E',
        replace:true,
        template: '<div style="position:absolute;left:650px;top:300px;opacity:0.5;height:30px;width:100px;" class="loading"><img src="http://www.vinu.info/f/u/98spinner.gif" width="70" height="70" />LOADING...</div>',
        link: function (scope, element, attr) {
              scope.$watch('loading', function (val) {
                  if (val)
                      $(element).show();
                  else
                      $(element).hide();
              });
        }
      }
  });
app.controller('viewUserController',['$scope', '$http','$q', '$window', function($scope,$http,$q , $window) {
	$scope.data = {};
	$scope.mySelections = [];
	
	$scope.searchUser = function() {
		$scope.loading = true;
		var base_url = window.location.origin;
		var URL = base_url + '/EmployeeReferral/resources/user/searchUser?name='+$scope.user.name;
		$http.get(URL).success(function(data, status, headers, config) {
			$scope.data.gridSkills = data;
			$scope.loading = false;
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
   		    {
   		            field: 'userId',
   		            displayName: 'User Id', width: "100" ,
   		            cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><a ng-click="editUser(row)">{{row.getProperty(\'userId\')}}</a></div>'
   		           },
		    {field:'name', displayName:'Name', width: "200"},
   			{field:'empId', displayName:'Employee Id', width: "100"}, 
   			{field:'experience', displayName:'Experience', width: "100"},
   			{field:'mobileNumber', displayName:'Contact No', width: "100"}, 
   			{field:'designation', displayName:'Designation', width: "100"},
   			{field:'roles', displayName:'Roles', width: "100"}
   		    ]
    };
	
	$scope.editUser = function(row) {
		window.console && console.log(row.entity);
		$window.location.href = 'editUser.html#?target='+row.entity.userId;
		
		
		 
	};
	
}]);
