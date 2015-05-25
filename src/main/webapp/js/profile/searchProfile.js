app.controller('searchProfileCtrl',['$scope', '$http','$q', '$window','jobCodeService1', function($scope, $http, $q, $window, jobCodeService1) {
	
	$scope.searchDisable = true;
	$scope.enableDisbleButton = true;
	$scope.approveBtnDisable = true;
	$scope.errorHide = true;
	$scope.data = {};
	var base_url = window.location.origin;
	var URL = base_url + '/EmployeeReferral/resources/profile'
	
	$http.get(URL).success(function(data, status, headers, config) {
		$scope.myData = data;
	}).error(function(data, status, headers, config) {
		alert('error');
	});
	$scope.disableSearch = function(){
		if($scope.candidate.candidateName == null){
			$scope.searchDisable = true;
		}
		else{
			$scope.searchDisable = false;
		}
	}

	$scope.title = "Search";
		$scope.pagingOptions = {
			      pageSizes: [7],
			      pageSize: 7,
			      currentPage: 1
			    };
			    $scope.totalServerItems = 0;
			    $scope.setPagingData = function(data,page,pageSize){
			      var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
			      $scope.myData = pagedData;
			      $scope.totalServerItems = data.length;
			      if (!$scope.$$phase) {
			        $scope.$apply();
			      }
			    };
			    var URLL = base_url + '/EmployeeReferral/resources/profile';
			    $scope.getPagedDataAsync = function (pageSize, page, searchText) {
			      setTimeout(function () {
			        var data2;
			        if (searchText) {
			          var ft = searchText.toLowerCase();
			          $http.get(URLL).success(function (largeLoad) {
			            data2 = largeLoad.filter(function(item) {
			              return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
			            });
			            $scope.setPagingData(data,page,pageSize);
			          });
			        } else {
			          $http.get(URLL).success(function (largeLoad) {
			            $scope.setPagingData(largeLoad,page,pageSize);
			          }).error(function(data, status, headers, config) {
			        	  console.log(data);
			        	  $scope.errorHide = false;
			        	  $scope.errorMsg = "Something Went Wrong! Please Try Again!";
			  		});
			        }
			      }, 100);
			    };

			    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

			    $scope.$watch('pagingOptions', function (newVal, oldVal) {
			      if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
			        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
			      }
			    }, true);

			    $scope.$watch('filterOptions', function (newVal, oldVal) {
			      if (newVal !== oldVal) {
			        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
			      }
			    }, true);
			    
			    $scope.$watch('filterOptions', function (new_value, old_value) {
			        if(new_value){
			            $scope.result = $filter('filter')($scope.all_data, $scope.filterOptions.filterText);
			            if (!$scope.$$phase) {
			                $scope.$apply();
			            }
			        }
			    }, true);

			    $scope.filterOptions = {
			        filterText: "",
			    };
			    
			    $scope.gridOptions = {
			      data: 'myData',
			      enablePaging: true,
			      showFooter: true,
			      totalServerItems: 'totalServerItems',
			      pagingOptions: $scope.pagingOptions,
			      filterOptions: $scope.filterOptions,
			      enableColumnResize:true,
			      enableHorizontalScrollbar:0,
			      columnDefs: [
			                   /*{field: '', width: "41", cellTemplate: '<div class="ngSelectionCell"><input tabindex="-1" class="ngSelectionCheckbox" type="checkbox" ng-checked="row.selected" /></div>'}*/
			          		    {field:'candidateName', displayName:'Name', width: "20%", cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><a ng-click="editProfile(row)">{{row.getProperty(\'candidateName\')}}</a></div>'}, 
			          		    {field:'emailId', displayName:'Email-ID', width: "20%"}, 
			      		    	/*{field:'qualification', displayName:'Qualification', width: "20%"},*/ 
			         			{field:'primarySkills', displayName:'Skills', width: "20%"},
			         			{field:'expYear', displayName:'Experience', width: "10%"}, 
			         			/*{field:'mobileNo', displayName:'Mobile No', width: "100"},*/
			         			{field:'currentEmployer', displayName:'Current Employer', width: "15%"},
			         			{field:'jobcodeProfile', displayName:'Assigned Job Code', width: "15%", cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><a ng-click="editPosition(row)">{{row.getProperty(\'jobcodeProfile\')}}</a></div>'}
		          		    ],
			    };
		
		$scope.editProfile = function(row) {
			window.console && console.log(row.entity);
			jobCodeService1.setprofileUserId(row.entity.emailId);
			location.href='#viewProfile';
		};
		$scope.editPosition = function(row) {
			window.console && console.log(row.entity);
			jobCodeService1.setjobCode(row.entity.jobcodeProfile);
			location.href='#viewPosition';
		};
		
	}]);

app.directive('ngConfirmClick', [
	                                 function(){
	                                     return {
	                                         link: function (scope, element, attr) {
	                                             var msg = attr.ngConfirmClick || "Are you sure?";
	                                             var clickAction = attr.confirmedClick;
	                                             element.bind('click',function (event) {
	                                                 if ( window.confirm(msg) ) {
	                                                     scope.$eval(clickAction)
	                                                 }
	                                             });
	                                         }
	                                     };
	                             }])