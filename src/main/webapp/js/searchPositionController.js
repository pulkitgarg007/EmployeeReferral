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
app.controller('searchPositionController',['$scope', '$http','$q', '$window', function($scope,$http,$q , $window) {
	$scope.data = {};
	
	var base_url = window.location.origin;
	var URL = base_url + '/EmployeeReferral/resources/searchAllPosition'; 
	$scope.loading = true;
	$http.get(URL).success(function(data, status, headers, config) {
		$scope.data.gridSkills = data;
		$scope.loading = false;
	}).error(function(data, status, headers, config) {
		alert('error');
	});	
	
	$scope.searchCandidate = function() {
		$scope.loading = true;
		var URL = base_url + '/EmployeeReferral/resources/searchPositionsBasedOnDesignation?designation='+$scope.searchPosition.designations;
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
	
}]);
