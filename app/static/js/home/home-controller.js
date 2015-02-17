angular.module('splashapp')
  .controller('HomeController', ['$scope', '$http', function ($scope, $http, $filter) {
  	
    $scope.i1;
    $scope.i2;
    $scope.i3;
    
  	$scope.d1;
  	$scope.d2;
  	$scope.d3;
  	
  	var inputs=[];
 	var paths=[];
 	var weights=[];
 	var clicked = [];
 	var positionToRemove;
 	
 	var cities = [];  //this looks fine; need to investigate why some cities are coming up blank
 	var cityPaths = [];
 	var cityWeights = [];
 	
 	
  	var getWeights = function(jsonArray) {
     	var tempWeights = [];
     	for (var d = 0, len = jsonArray.length; d < len; d += 1) {
         	tempWeights[d]=jsonArray[d].weight;
     	}
     	return tempWeights;
 	}
	
	var getPaths = function (jsonArray) {
		var tempPaths = [];
    	for (var d = 0, len = jsonArray.length; d < len; d += 1) {
        	tempPaths[d]=jsonArray[d].path;
    	}
    	return tempPaths;
	}
 	
 	$scope.model = {
 		newPath: 'default'
 	}
 	
 	
 	
 	
 	$scope.addPic = function(){
        $http.post('/api/pics/', {path: $scope.model.newPath}).success(function() {
        	        	
        }).error(function() {
        	alert('ERROR!');
        });
    };
 	
 	var getInputs = function(){
        $http.get('/api/inputs/').success(function(data) {
            inputs = data.data;
            weights = getWeights(inputs);
    		paths = getPaths(inputs);
    		
    		var randInput= Math.floor(rand(paths.length)); 
        	$scope.i1=paths[randInput];
        	weights.splice(randInput,1);
        	paths.splice(randInput,1);
        
        
        	randInput= Math.floor(rand(paths.length)); 
        	$scope.i2=paths[randInput];
        	weights.splice(randInput,1);
        	paths.splice(randInput,1);
        
        	randInput= Math.floor(rand(paths.length)); 
        	$scope.i3=paths[randInput];
        	weights.splice(randInput,1);
        	paths.splice(randInput,1);  
        	        	
        }).error(function() {
        	alert('ERROR!');
        });
    };
    
    var getCities = function(){
        $http.get('/api/cities/').success(function(data) {
            cities = data.data;
            cityWeights = getWeights(cities);
    		cityPaths = getPaths(cities);
    		
    		var randCity= Math.floor(rand(cityPaths.length)); 
        	$scope.d1=cityPaths[randCity];
        	cityWeights.splice(randCity,1);
        	cityPaths.splice(randCity,1);
        
        
        	randCity= Math.floor(rand(cityPaths.length)); 
        	$scope.d2=cityPaths[randCity];
        	cityWeights.splice(randCity,1);
        	cityPaths.splice(randCity,1);
        
        	randCity= Math.floor(rand(cityPaths.length)); 
        	$scope.d3=cityPaths[randCity];
        	cityWeights.splice(randCity,1);
        	cityPaths.splice(randCity,1);  
        	
        }).error(function() {
        	alert('dest error!');
        });
    };
 
	var getWeightedItem = function(weightList, itemList) {
		var tempList=[];

		for (var i = 0; i < weightList.length; i++) {
			temp = 0;
			
			for (var j = i; j < weightList.length; j++) {
				temp = temp + weightList[j];
			}
			tempList.push(temp);
    	}
    	
    	var randomNum = rand(tempList[0]);
    	
    	for (var k = 1; k < itemList.length; k++){
    		if(randomNum>tempList[k]){
    			//need to remove item from the lists eventually
    			positionToRemove=k-1;
    			return itemList[k-1];
    		}
    	}
    	positionToRemove=itemList.length-1;
    	return itemList[itemList.length-1];
    };
    
 	
  	
    
    
    
    
    getInputs();
    getCities();
    
  	//could get slow as list grows

     
         
  	
  	
  	var rand = function(max) {
    	return Math.random() * (max);
    };


	var getItemByID = function (jsonArray, id) {
    	for (var d = 0, len = jsonArray.length; d < len; d += 1) {
        	if (jsonArray[d].id === id) {
    			return jsonArray[d];        	
        	}
    	}
	}
		
	


  	$scope.inputClick = function(n){
		
 //   		# use n to tell which input got clicked
    	
    	if (n==0 && $scope.i1){
    		clicked.push($scope.i1);
    	}
    	if (n==1 && $scope.i2){
    		clicked.push($scope.i2);
    	}
    	if (n==2 && $scope.i3){
    		clicked.push($scope.i3);
    	}
    	
        	var randInput= Math.floor(rand(paths.length)); 
        	$scope.i1=paths[randInput];
        	weights.splice(randInput,1);
        	paths.splice(randInput,1);
        
        
        	randInput= Math.floor(rand(paths.length)); 
        	$scope.i2=paths[randInput];
        	weights.splice(randInput,1);
        	paths.splice(randInput,1);
        
        	randInput= Math.floor(rand(paths.length)); 
        	$scope.i3=paths[randInput];
        	weights.splice(randInput,1);
        	paths.splice(randInput,1); 
        	
        	cityRec();
	};
	






//NEED TO MODIFY.  Copied this over cuz tipsy right now.



$scope.cityClick = function(n){
		
 //    SOME OF THIS CAN WORK WELL for choosing desintations.  Probability based choices.  Keeping track.  
    	
    	if (n==0 && $scope.d1){
    		clicked.push($scope.d1); //one clicked array or one for inputs and one for destinations?
    	}
    	if (n==1 && $scope.d2){
    		clicked.push($scope.d2);
    	}
    	if (n==2 && $scope.d3){
    		clicked.push($scope.d3);
    	}
    	

    		var randCity= Math.floor(rand(cityPaths.length)); 
        	$scope.d1=cityPaths[randCity];
        	cityWeights.splice(randCity,1);
        	cityPaths.splice(randCity,1);
        
        
        	randCity= Math.floor(rand(cityPaths.length)); 
        	$scope.d2=cityPaths[randCity];
        	cityWeights.splice(randCity,1);
        	cityPaths.splice(randCity,1);
        
        	randCity= Math.floor(rand(cityPaths.length)); 
        	$scope.d3=cityPaths[randCity];
        	cityWeights.splice(randCity,1);
        	cityPaths.splice(randCity,1); 
        	
	};


var cityRec = function(){
		
 //    SOME OF THIS CAN WORK WELL for choosing desintations.  Probability based choices.  Keeping track.  
    	
    	
    		var randCity= Math.floor(rand(cityPaths.length)); 
        	$scope.d1=cityPaths[randCity];
        	cityWeights.splice(randCity,1);
        	cityPaths.splice(randCity,1);
        
        
        	randCity= Math.floor(rand(cityPaths.length)); 
        	$scope.d2=cityPaths[randCity];
        	cityWeights.splice(randCity,1);
        	cityPaths.splice(randCity,1);
        
        	randCity= Math.floor(rand(cityPaths.length)); 
        	$scope.d3=cityPaths[randCity];
        	cityWeights.splice(randCity,1);
        	cityPaths.splice(randCity,1); 
        	
	};

  
	$scope.sendClicked = function(x){
		if (clicked) {
        	$http
            	.post('api/clickCount', {
                	item: clicked
            	})
            	.success(function(data, status, headers, config) {
                	if (data.success) {
                    	
                	} else {
                    	
                	}
            	})
            	.error(function(data, status, headers, config) {
            	});
    	}
	};
  	
  	
  	


  
  $scope.currency="$";
  
  $('#dp3').datepicker();

  
  
  }]);
  

