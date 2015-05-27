	app.controller('interviewManagementCtrl',['$scope', '$http','$q', '$window','jobCodeService1', function($scope, $http, $q, $window,jobCodeService1) {
		$scope.cl = "GAP";
		$scope.interview = {};
		$scope.positionDisable = true;
		$scope.searchDisable = true;
		$scope.approveBtnDisable = true;
		$scope.errorHide = true;
		$scope.data = {};
		$scope.location = {};
		$scope.position = {};
		$scope.locations = {};
		$scope.positions = {};
		var base_url = window.location.origin;
		var URL = base_url + '/EmployeeReferral/resources/getPosition';
		
		var Location_URL = base_url + '/EmployeeReferral/resources/skill/location';
		
		$http.get(Location_URL).success(function(data, status, headers, config) {
			$scope.locations = data;
			/*$scope.selectedLocation = $scope.locations[0];*/
		}).error(function(data, status, headers, config) {
			alert('error');
		})
		
		$scope.loadPositions = function(){
			$scope.positionDisable = false;
			/*alert($scope.interview.location);*/
			$http.get(base_url + '/EmployeeReferral/resources/searchPositionBasedOnLocation?location='+$scope.interview.location).success(function(data, status, headers, config) {
				$scope.positions = data;
				/*$scope.selectedLocation = $scope.locations[0];*/
			}).error(function(data, status, headers, config) {
				alert('error');
			})
		}
		
		$scope.disableSearch = function(){
			if($scope.interview.location == null || $scope.interview.position == null){
				$scope.searchDisable = true;
			}
			else{
				$scope.searchDisable = false;
			}
			
		}
		
		$scope.searchPosition = function(){
			$scope.pagingOptions2 = {
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
				    var URLL = base_url + '/EmployeeReferral/resources/profile?jobcodeProfile='+$scope.interview.position;
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

				    $scope.filterOptions = {
				        filterText: "",
				        /*useExternalFilter: true*/
				    };
				    $scope.gridOptions = {
				      data: 'myData',
				      enablePaging: true,
				      showFooter: true,
				      totalServerItems: 'totalServerItems',
				      pagingOptions: $scope.pagingOptions2,
				      filterOptions: $scope.filterOptions,
				      enableColumnResize:true,
				      enableHorizontalScrollbar:0,
				      columnDefs: [
				          		    {field:'jobcodeProfile', displayName:'Job Code', width: "120", cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><a ng-click="editPosition(row)">{{row.getProperty(\'jobcodeProfile\')}}</a></div>'},  
				          		    {field:'emailId', displayName:'Email ID', width: "125"}, 
				          		    {field:'candidateName', displayName:'Name', width: "120"}, 
				          		    //{field:'primarySkills', displayName:'Primary Skills', width: "145"}, 
				          			//{field:'noOfPositions', displayName:'No Of Positions', width: "110"}, 
				          			{field:'profilecreatedBy', displayName:'Profile Created By', width: "160"},
				          			{field:'referredBy', displayName:'Source', width: "90"},
				          			{field:'pLocation', displayName:'Preferred Location', width: "90"},
				          			{field:'btn', displayName: 'RoundOne', width:"90", cellTemplate:'<span class="glyphicon glyphicon-check" ng-click="feedback(row)" style="position:absolute;left:18px;top:7px;"></span>'},
				          			{field:'btn', displayName: 'RoundTwo', width:"90", cellTemplate:'<span class="glyphicon glyphicon-check" ng-click="feedback(row)" style="position:absolute;left:18px;top:7px;"></span>'},
				          			{field:'btn', displayName: 'RoundThree', width:"90", cellTemplate:'<span class="glyphicon glyphicon-check" ng-click="feedback(row)" style="position:absolute;left:18px;top:7px;"></span>'}
				          		    ]
				    };
				    $scope.feedback = function(row) {
						window.console && console.log(row.entity);
						jobCodeService1.setjobCode(row.entity.jobcode);
						location.href='#interviewFeedback';
					};
		};
		
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
			    //var URLL = base_url + '/EmployeeReferral/resources/getPosition?client='+$scope.cl;
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

			    $scope.filterOptions = {
			        filterText: "",
			        useExternalFilter: true
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
			          		    {field:'jobcodeProfile', displayName:'Job Code', width: "120", cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><a ng-click="editPosition(row)">{{row.getProperty(\'jobcodeProfile\')}}</a></div>'},  
				          		    {field:'emailId', displayName:'Email ID', width: "125"}, 
				          		    {field:'candidateName', displayName:'Name', width: "120"}, 
				          		    //{field:'primarySkills', displayName:'Primary Skills', width: "145"}, 
				          			//{field:'noOfPositions', displayName:'No Of Positions', width: "110"}, 
				          			{field:'profilecreatedBy', displayName:'Profile Created By', width: "160"},
				          			{field:'referredBy', displayName:'Source', width: "90"},
				          			{field:'pLocation', displayName:'Preferred Location', width: "90"},
				          			{field:'btn', displayName: 'RoundOne', width:"90", cellTemplate:'<span class="glyphicon glyphicon-check" ng-click="feedback(row)" style="position:absolute;left:18px;top:7px;"></span>'},
				          			{field:'btn', displayName: 'RoundTwo', width:"90", cellTemplate:'<span class="glyphicon glyphicon-check" ng-click="feedback(row)" style="position:absolute;left:18px;top:7px;"></span>'},
				          			{field:'btn', displayName: 'RoundThree', width:"90", cellTemplate:'<span class="glyphicon glyphicon-check" ng-click="feedback(row)" style="position:absolute;left:18px;top:7px;"></span>'}
			          		    ]
			    };
		
		$scope.feedback = function(row) {
			window.console && console.log(row.entity);
			jobCodeService1.setjobCode(row.entity.jobcode);
			location.href='#interviewFeedback';
		};
		
		$scope.deletePosition = function(row) {
			window.console && console.log(row.entity);
			var URL_DEL = base_url + '/EmployeeReferral/resources/deletePositionBasedOnJC?jobcode='+row.entity.jobcode;
			$http.get(URL_DEL).success(function(data, status, headers, config) {
				alert("Deleted!");	
				location.reload();
			});
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