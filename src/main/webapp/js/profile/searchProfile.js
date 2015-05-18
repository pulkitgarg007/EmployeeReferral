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
			          		    {field: '', width: "41", cellTemplate: '<div class="ngSelectionCell"><input tabindex="-1" class="ngSelectionCheckbox" type="checkbox" ng-checked="row.selected" /></div>'},
			          		    {field:'candidateName', displayName:'Name', width: "110", cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><a ng-click="editCandidate(row)">{{row.getProperty(\'candidateName\')}}</a></div>'}, 
			          		    {field:'emailId', displayName:'Email-ID', width: "144"}, 
			      		    	{field:'qualification', displayName:'Qualification', width: "100"}, 
			         			{field:'skills', displayName:'Skills', width: "100"},
			         			{field:'experience', displayName:'Experience', width: "80"}, 
			         			{field:'mobileNo', displayName:'Mobile No', width: "100"},
			         			{field:'currentEmployer', displayName:'Current Employer', width: "100"},
			         			{field:'address', displayName:'Address', width: "110"},
			          			{field:'btn', displayName: 'Edit', width:"50", cellTemplate:'<span class="glyphicon glyphicon-edit" ng-click="editProfile(row)" style="position:absolute;left:18px;top:7px;"></span>'},
			          			{field:'btn', displayName: 'Del', width:"50", cellTemplate:'<span class="glyphicon glyphicon-remove" confirmed-click="deleteProfile(row)" ng-confirm-click="Are You Sure You Want to Delete It?" style="position:absolute;left:18px;top:7px;"></span>'}
			          		    ]
			    };
		
		$scope.editProfile = function(row) {
			window.console && console.log(row.entity);
			jobCodeService1.setprofileUserId(row.entity.emailId);
			location.href='#editProfile';
		};
		
		$scope.deleteProfile = function(row) {
			window.console && console.log(row.entity);
			var URL_DEL = base_url + '/EmployeeReferral/resources/deleteProfileBasedOnEmailId?emailId='+row.entity.emailId;
			$http.get(URL_DEL).success(function(data, status, headers, config) {
				alert("Deleted!");	
				location.href= "#pro"
			}).error(function(data, status, headers, config) {
				console.log(data);
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