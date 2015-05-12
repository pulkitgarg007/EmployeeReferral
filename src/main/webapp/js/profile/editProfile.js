var app = angular.module("erApp", []);
app.controller("editCandidateCtrl", ['$scope', '$http', '$q', '$location', '$window', function($scope, $http, $q, $location, $window) {
	
	$scope.data = {};
	$scope.candidate = {};
	$scope.candidateName = $location.search().target;
	var base_url = window.location.origin;
	var URL = base_url + '/EmployeeReferral/resources/searchCandidate?candidateName='+$scope.candidateName;
	
	$http.get(URL).success(function(data, status, headers, config) {
		$scope.candidate =data[0];
		
	}).error(function(data, status, headers, config) {
		alert('error');
	});	
	$scope.editCandidate = function() {
		$scope.enableDisableButton = false;
        $scope.disableEditButton = true;
        $scope.Done = true;
	}
	$scope.updateCandidate = function() {
		alert("Hello");
		if($scope.candidate !== undefined){
		var base_url = window.location.origin;
		var URL = base_url + '/EmployeeReferral/resources/candidate-update'+$scope.candidate;
	}
	}
	$scope.reset = function() {
		$window.location.href = 'searchCandidate.html'
	}

}]);