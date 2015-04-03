angular.module('editPosition',[])

.controller('editPositionController',['$scope', '$http', '$q', '$location', '$window', function($scope, $http, $q, $location, $window) {
	$scope.data = {};
	$scope.position = {};
	$scope.jobcode = $location.search().target;
	var base_url = window.location.origin;
	var URL = base_url + '/EmployeeReferral/resources/searchPositionsBasedOnJobCode?jobcode='+$scope.jobcode;
	
	$http.get(URL).success(function(data, status, headers, config) {
		$scope.position =data[0];
		alert($scope.position);
		
	}).error(function(data, status, headers, config) {
		alert('error');
	});	
}])