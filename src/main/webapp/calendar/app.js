

angular.module('MyApp', ['ui.calendar'])
    .controller('MainController', function ($scope,$http) {
    	
    	var base_url = window.location.origin;
    	var url = base_url + '/EmployeeReferral/resources/data/getSchedules'; 
    	$scope.events2 =  [ { title: "Birthday Party", start: new Date(2015, 04, 04, 19, 30), end: new Date(2015, 04, 10, 22, 30), allDay: false },
            { title: "Business Conference", start: new Date(2014, 8, 22), end: new Date(2014, 8, 24) }
        ];
        // console.log("1-------> "+angular.toJson($scope.events2));
    	
        $http.get(url).success( function(response) {
        	 angular.forEach(response, function(obj) {
        		// console.log("--->"+angular.toJson(obj)+"<---");
        		 
        		var start_date = new Date(parseInt(obj.start,10));
        			var s_y = start_date.getFullYear();
         	    	var s_m = start_date.getMonth();
         	    	var s_dy = start_date.getDate()
         	    	var s_hr = start_date.getHours();
         	    	var s_min = start_date.getMinutes();
         	    	
         	    	console.log(obj.end);
         	    	if (null == obj.end) {
         	    		$scope.events2.push( {"title" : obj.title, "start" : new Date(s_y, s_m, s_dy, s_hr)});
            	    	
          	    	}
          	    	else{
          	    		var end_date = new Date(parseInt(obj.end,10));
            	    	var e_y = end_date.getFullYear();
            	    	var e_m = end_date.getMonth();
            	    	var e_dy = end_date.getDate()
            	    	var e_hr = end_date.getHours();
            	    	var e_min = end_date.getMinutes();
            	    	$scope.events2.push( {"title" : obj.title, "start" : new Date(s_y, s_m, s_dy, s_hr), "end" : new Date(e_y, e_m, e_dy, e_hr), allDay: true});
            	    	
          	    		
          	    	}
         	    	
         	    	
         	    	
         	    });
        	 
        });
        	 
        $scope.eventSources = [$scope.events2];
        console.log("2-------> "+angular.toJson($scope.eventSources));

        
        $scope.calOptions = {
            editable: true, 
            header: {
                left: 'prev',  
                center: 'title', 
                right: 'next'
            }
        };
        
    });
