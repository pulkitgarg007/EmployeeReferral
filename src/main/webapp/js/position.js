var app = angular.module('erApp', ['ngTagsInput','ngGrid','ngRoute']);
app.config( ['$routeProvider', function($routeProvider) {
			$routeProvider
				.when('/searchPosition', {
					templateUrl: 'routeCreatePosition.html',
					controller: 'createPositionCtrl'
				})
				.when('/pos', {
					templateUrl: 'routeIndex.html',
					controller: 'positionCtrl'
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
   		    {field:'jobcode', displayName:'Job Code', width: "73", cellTemplate: '<p style="position:absolute;top:3px;left:15px;">{{row.getProperty(\'jobcode\')}}</p>'}, 
		    {field:'designation', displayName:'Designation', width: "125"}, 
		    {field:'experienceRequired', displayName:'Experience', width: "75"}, 
		    {field:'primarySkills', displayName:'Primary Skills', width: "145"}, 
   			{field:'noOfPositions', displayName:'No Of Positions', width: "50"}, 
   			{field:'jobProfile', displayName:'Job Profile', width: "100"},
   			{field:'location', displayName:'Location', width: "100"},
   			{field:'client', displayName:'Client', width: "100"},
   			/*{field:'btn', displayName: 'Edit', width:"50", cellTemplate:'<img src="static/images/edit.png" height="27" width="27" ng-click="editPosition(row)" style="position:absolute;top:2px;right:14px;" />'},*/
   			{field:'btn', displayName: 'Edit', width:"50", cellTemplate:'<img src="static/images/edit.png" height="27" width="27" ng-click="editPosition(row)" style="position:absolute;top:2px;right:14px;" />'},
   			{field:'btn', displayName: 'Del', width:"50", cellTemplate:'<img src="static/images/del.png" height="20" width="15" ng-click="deletePosition(row)" style="position:absolute;top:5px;right:16px;" />'}
   		    ]
    };
	
	$scope.editPosition = function(row) {
		window.console && console.log(row.entity);
		$window.location.href = 'editPosition.html#?target='+row.entity.jobcode;
		/*$window.location.href = 'position.html#?target='+row.entity.jobcode;*/
	};
	
	$scope.deletePosition = function(row) {
		window.console && console.log(row.entity);
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

app.controller("createPositionCtrl", ['$scope', '$http', function($scope, $http) {

    $scope.position ={};
	$scope.position.primarySkills = {};
	$scope.primarySkills ={};
	$scope.devskills = {};
	$scope.qeskills = {};
	$scope.selectedDesignation = "";
	$scope.selectedExperience = "";
	$scope.selectedLocation = "";
	$scope.position.designation = "";
	$scope.position.experienceRequired = "";
	$scope.position.location = "";
	$scope.enableDisbleButton = true;
	var base_url = window.location.origin;
	var Skills_URL = base_url + '/EmployeeReferral/resources/skill/skills';
	var Designation_URL = base_url + '/EmployeeReferral/resources/skill/designations';
	var Experience_URL = base_url + '/EmployeeReferral/resources/skill/experience';
	var DeveloperSkills_URL = base_url + '/EmployeeReferral/resources/skill/developerskills';
	var QESkills_URL = base_url + '/EmployeeReferral/resources/skill/qeskills';
	var Location_URL = base_url + '/EmployeeReferral/resources/skill/location';
	$scope.data = {};
	$scope.options = {};
	$scope.items = {};
	$scope.locations = {};
	$http.get(Skills_URL).success(function(data, status, headers, config) {
		$scope.data = data;
		
	}).error(function(data, status, headers, config) {
		alert('error');
	})
	$http.get(Designation_URL).success(function(data, status, headers, config) {
		$scope.options = data;
		$scope.selectedDesignation = $scope.options[0];
	}).error(function(data, status, headers, config) {
		alert('error');
	})
	$http.get(Location_URL).success(function(data, status, headers, config) {
		$scope.locations = data;
		$scope.selectedLocation = $scope.locations[0];
	}).error(function(data, status, headers, config) {
		alert('error');
	})
	$http.get(Experience_URL).success(function(data, status, headers, config) {
		$scope.items = data;
		$scope.selectedExperience = $scope.items[0];
	}).error(function(data, status, headers, config) {
		alert('error');
	})
	
	$http.get(DeveloperSkills_URL).success(function(data, status, headers, config) {
		$scope.devskills = data;
		
	}).error(function(data, status, headers, config) {
		alert('error');
	})
	
	$http.get(QESkills_URL).success(function(data, status, headers, config) {
		$scope.qeskills = data;
		
	}).error(function(data, status, headers, config) {
		alert('error');
	})
	
	$scope.loadTags = function(query) {
		
		return $scope.data;
	};
	
	$scope.reset = function() {
		$scope.position = angular.copy($scope.master);
	}

	$scope.submit = function() {
		var skills =[];
		if ($scope.position !== undefined) {
			 angular.forEach($scope.position.primarySkills, function(value, key) {
				 skills.push(value.text);
				});
			 $scope.position.primarySkills = skills;
			 $scope.position.designation = $scope.selectedDesignation;
		     $scope.position.experienceRequired	= $scope.selectedExperience;
		     $scope.position.location = $scope.selectedLocation;
			$http.post(base_url + '/EmployeeReferral/resources/position-create', $scope.position)
		}
	}
	$scope.reset();
	$scope.submit();
	
	$scope.changeEvent = function(){
		if($scope.position.jobcode == null || $scope.position.jobcode == '' || $scope.position.experienceRequired == null || $scope.position.experienceRequired == '' || $scope.position.primarySkills == null || $scope.position.primarySkills == '' || $scope.position.secondarySkills == null || $scope.position.secondarySkills == '' || $scope.position.noOfPositions == null || $scope.position.noOfPositions == '' || $scope.position.jobProfile == null || $scope.position.jobProfile == '' || $scope.position.designation == null || $scope.position.designation == '')
		$scope.enableDisbleButton = true;
	else
		$scope.enableDisbleButton = false;
	}
	$scope.changeDesignation = function(){
		if($scope.selectedDesignation == "Developer"){
		$scope.position.primarySkills = $scope.devskills;
		}
		else if ($scope.selectedDesignation == "Quality Engineer"){
			$scope.position.primarySkills = $scope.qeskills;
		}
		else{
			$scope.position.primarySkills = {};
		}
	}
}]);
