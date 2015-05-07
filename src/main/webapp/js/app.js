var app = angular.module('erApp', ['ngTagsInput','ngGrid','ngRoute']);
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
				.otherwise({
					redirectTo: '/pos'
				});
}]);

app.controller('positionCtrl',['$scope', '$http', function($scope, $http) {

}]);