var app = angular.module('erApp', ['ngTagsInput','ngGrid','ngRoute']);
app.service('jobCodeService1', function() {
	var jobCode;
	
	return {
        setjobCode: function(code) {
           jobCode=code;
        },
        getjobCode: function() {
        	return jobCode;
     }
    };	
});

app.config( ['$routeProvider', function($routeProvider) {
			$routeProvider
				.when('/createPosition', {
					templateUrl: 'createPosition.html',
					controller: 'createPositionCtrl'
				})
				.when('/pos', {
					templateUrl: 'searchPosition.html',
					controller: 'searchPositionCtrl'
				})
				.when('/editPosition', {
					templateUrl: 'editPosition.html',
					controller: 'editPositionCtrl'
				})
				.otherwise({
					redirectTo: '/pos'
				});
}]);

app.controller('positionCtrl',['$scope', '$http', function($scope, $http) {
	

}]);