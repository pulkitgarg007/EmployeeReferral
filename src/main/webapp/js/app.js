var app = angular.module('erApp', ['ngTagsInput','ngGrid','ngRoute','angularFileUpload','blockUI', 'ui.utils.masks', 'ui.router','xeditable','ui.bootstrap']);
app.service('jobCodeService1', function() {
var profileUserId;
	
	return {
        setjobCode: function(code) {
           jobCode=code;
        },
        getjobCode: function() {
        	return jobCode;
     },
        
        setprofileUserId: function(code) {
        	profileUserId=code;
        },
        getprofileUserId: function() {
        	return profileUserId;
     }
    };	
});

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    
	$urlRouterProvider.otherwise('/');
        
    $stateProvider
    .state('main', {url:'/', views: {'': {templateUrl: 'views/index.html',/*controller: 'searchProfileCtrl'*/}/*, 'footer@main': {templateUrl: 'footer.html', controller: 'scotchController'}*/}})
    .state('createProfile', {url:'/createProfile', views: {'': {templateUrl: 'views/createProfile1.html', controller: 'AccordionDemoCtrl'}}})
    /*.state('createProfile', {url:'/createProfile', views: {'': {templateUrl: 'views/createProfile.html', controller: 'createProfileCtrl'}}})*/
    .state('searchProfile', {url:'/searchProfile', views: {'': {templateUrl: 'views/searchProfile.html', controller: 'searchProfileCtrl'}}})
    .state('editProfile', {url:'/editProfile', views: {'': {templateUrl: 'views/editProfile.html', controller: 'editProfileCtrl'}}})
     /*.state('viewProfile', {url:'/viewProfile', views: {'': {templateUrl: 'views/viewProfile.html', controller: 'editProfileCtrl'}}})*/
     .state('viewProfile', {url:'/viewProfile', views: {'': {templateUrl: 'views/viewProfile1.html', controller: 'editProfileCtrl'}}})
    
    .state('createPosition', {url:'/createPosition', views: {'': {templateUrl: 'views/createPosition.html', controller: 'createPositionCtrl'}}})
    .state('searchPosition', {url:'/searchPosition', views: {'': {templateUrl: 'views/searchPosition.html', controller: 'searchPositionCtrl'}}})
    .state('viewPosition', {url:'/viewPosition', views: {'': {templateUrl: 'views/viewPosition.html', controller: 'editPositionCtrl'}}})
     .state('interviewManagement', {url:'/interviewManagement', views: {'': {templateUrl: 'views/interviewManagement.html', controller: 'interviewManagementCtrl'}}})
        
}]);

app.config(function(blockUIConfig) {

	  // Change the default overlay message
	  blockUIConfig.message = 'Loading...';

	  // Change the default delay to 100ms before the blocking is visible
	 // blockUIConfig.delay = 100;

	});

app.run(function(editableOptions) {
  editableOptions.theme = 'bs3';
});

app.controller('positionCtrl',['$scope', '$http', function($scope, $http) {
	

}]);