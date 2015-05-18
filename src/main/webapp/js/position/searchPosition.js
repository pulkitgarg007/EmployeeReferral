app.controller('searchPositionCtrl',['$scope', '$http','$q', '$window','jobCodeService1', function($scope, $http, $q, $window,jobCodeService1) {
	$scope.cl = "GAP";
	
	$scope.searchDisable = true;
	$scope.approveBtnDisable = true;
	$scope.errorHide = true;
	$scope.data = {};
	var base_url = window.location.origin;
	var URL = base_url + '/EmployeeReferral/resources/getPosition'; 
	
	$scope.disableSearch = function(){
		if($scope.searchPosition.designations == null){
			$scope.searchDisable = true;
		}
		else{
			$scope.searchDisable = false;
		}
		
	}
	
	$scope.searchPosition = function() {
		
		if($scope.searchPosition.designations != null)
			{
			/*var URL = base_url + '/EmployeeReferral/resources/searchPositionsBasedOnDesignation?designation='+$scope.searchPosition.designations;
			$http.get(URL).success(function(data, status, headers, config) {
				$scope.myData = data;
			}).error(function(data, status, headers, config) {
				alert('error');
			});*/
			
			
			$scope.pagingOptions2 = {
				      pageSizes: [7, 10],
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
				    var URLL = base_url + '/EmployeeReferral/resources/searchPositionsBasedOnDesignation?designation='+$scope.searchPosition.designations;
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

				    $scope.getPagedDataAsync($scope.pagingOptions2.pageSize, $scope.pagingOptions.currentPage);

				    $scope.$watch('pagingOptions', function (newVal, oldVal) {
				      if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
				        $scope.getPagedDataAsync($scope.pagingOptions2.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
				      }
				    }, true);

				    $scope.$watch('filterOptions', function (newVal, oldVal) {
				      if (newVal !== oldVal) {
				        $scope.getPagedDataAsync($scope.pagingOptions2.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
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
				      pagingOptions: $scope.pagingOptions2,
				      filterOptions: $scope.filterOptions,
				      enableColumnResize:true,
				      enableHorizontalScrollbar:0,
				      columnDefs: [
				          		    {field: '', width: "41", cellTemplate: '<div class="ngSelectionCell"><input tabindex="-1" class="ngSelectionCheckbox" type="checkbox" ng-checked="row.selected" /></div>'},
				          		    {field:'jobcode', displayName:'Job Code', width: "73", cellTemplate: '<p style="position:absolute;top:3px;left:15px;">{{row.getProperty(\'jobcode\')}}</p>'}, 
				          		    {field:'designation', displayName:'Designation', width: "125"}, 
				          		    {field:'experienceRequired', displayName:'Experience', width: "90"}, 
				          		    {field:'primarySkills', displayName:'Primary Skills', width: "145"}, 
				          			{field:'noOfPositions', displayName:'No Of Positions', width: "110"}, 
				          			{field:'jobProfile', displayName:'Job Profile', width: "100"},
				          			{field:'location', displayName:'Location', width: "100"},
				          			{field:'client', displayName:'Client', width: "100"},
				          			{field:'btn', displayName: 'Edit', width:"50", cellTemplate:'<span class="glyphicon glyphicon-edit" ng-click="editPosition(row)" style="position:absolute;left:18px;top:7px;"></span>'},
				          			{field:'btn', displayName: 'Del', width:"50", cellTemplate:'<span class="glyphicon glyphicon-remove" confirmed-click="deletePosition(row)" ng-confirm-click="Are You Sure You Want to Delete It?" style="position:absolute;left:18px;top:7px;"></span>'}
				          		    ]
				    };
	
			}else{
			}
		
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
		    var URLL = base_url + '/EmployeeReferral/resources/getPosition?client='+$scope.cl;
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
		          		    {field: '', width: "41", cellTemplate: '<div class="ngSelectionCell"><input tabindex="-1" class="ngSelectionCheckbox" type="checkbox" ng-checked="row.selected" /></div>'},
		          		    {field:'jobcode', displayName:'Job Code', width: "73", cellTemplate: '<p style="position:absolute;top:3px;left:15px;">{{row.getProperty(\'jobcode\')}}</p>'}, 
		          		    {field:'designation', displayName:'Designation', width: "125"}, 
		          		    {field:'experienceRequired', displayName:'Experience', width: "90"}, 
		          		    {field:'primarySkills', displayName:'Primary Skills', width: "145"}, 
		          			{field:'noOfPositions', displayName:'No Of Positions', width: "110"}, 
		          			{field:'jobProfile', displayName:'Job Profile', width: "100"},
		          			{field:'location', displayName:'Location', width: "100"},
		          			{field:'client', displayName:'Client', width: "100"},
		          			{field:'btn', displayName: 'Edit', width:"50", cellTemplate:'<span class="glyphicon glyphicon-edit" ng-click="editPosition(row)" style="position:absolute;left:18px;top:7px;"></span>'},
		          			{field:'btn', displayName: 'Del', width:"50", cellTemplate:'<span class="glyphicon glyphicon-remove" confirmed-click="deletePosition(row)" ng-confirm-click="Are You Sure You Want to Delete It?" style="position:absolute;left:18px;top:7px;"></span>'}
		          		    ]
		    };
	
	$scope.editPosition = function(row) {
		window.console && console.log(row.entity);
		jobCodeService1.setjobCode(row.entity.jobcode);
		location.href='editPosition';
	};
	
	$scope.deletePosition = function(row) {
		window.console && console.log(row.entity);
		var URL_DEL = base_url + '/EmployeeReferral/resources/deletePositionBasedOnJC?jobcode='+row.entity.jobcode;
		$http.get(URL_DEL).success(function(data, status, headers, config) {
			alert("Deleted!");	
			location.href= "#pos"
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