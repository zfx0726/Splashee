angular.module('splashapp')
  .controller('HomeController', ['$scope', '$http', function ($scope, $http, $filter) {
  	
    $scope.i1;
    $scope.i2;
    $scope.i3;
    
  	$scope.d1 = [
  	{'path':''},
  	{'name':''},
  	{'price':''},
  	{'flightPrice':''}
  	];
  	$scope.d2= [
  	{'path':''},
  	{'name':''},
  	{'price':''},
  	{'flightPrice':''}
  	];
  	$scope.d3= [
  	{'path':''},
  	{'name':''},
  	{'price':''},
  	{'flightPrice':''}
  	];
  	

    
  	$scope.currency="$";
  	
  	var inputs=[];
  	
 	var paths=[];
 	var weights=[];
 	
 	var cityPaths = [];
 	var cityWeights = [];
 	var cityNames =[];
 	var cityCurrencies=[];
 	var cityPrices=[];
 	var flightPrices=[];
 	
 	 	
 	var clicked = [];
 	
 	var positionToRemove;
 	
 	var sentClicked=false;
 	
 	
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
	
	var getPrices = function (jsonArray) {
		var tempPaths = [];
    	for (var d = 0, len = jsonArray.length; d < len; d += 1) {
        	tempPaths[d]=jsonArray[d].city_price;
    	}
    	return tempPaths;
	}
	
	var getFlightPrices = function (jsonArray) {
		var tempPaths = [];
    	for (var d = 0, len = jsonArray.length; d < len; d += 1) {
        	tempPaths[d]=jsonArray[d].flight_price;
    	}
    	return tempPaths;
	}
	
	var getNames = function (jsonArray) {
		var tempPaths = [];
    	for (var d = 0, len = jsonArray.length; d < len; d += 1) {
        	tempPaths[d]=jsonArray[d].city_name;
    	}
    	return tempPaths;
	}
 	
 	var getCurrencies = function (jsonArray) {
		var tempPaths = [];
    	for (var d = 0, len = jsonArray.length; d < len; d += 1) {
        	tempPaths[d]=jsonArray[d].city_currency;
    	}
    	return tempPaths;
	}
 	

 	
 	
 	$scope.addData = function(){
        $http.post('/api/database/', {sent: 'True'}).success(function() {
        	alert('Database Updated!');
        }).error(function() {
        	alert('ERROR!');
        });
    };
 	
 	
 	var sendClicked = function(){
        $http.post('/api/clicked/', {clickedPaths: clicked}).success(function() {
        	alert('Nice Choice!');
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
            var cities = data.data;
            cityWeights = getWeights(cities);
    		cityPaths = getPaths(cities);
    		cityNames = getNames(cities);
    		cityPrices = getPrices(cities);
    		cityCurrencies= getCurrencies(cities);
    		flightPrices= getFlightPrices(cities);
    		$scope.wrappers = createChoices(cityNames, cityCurrencies);
  
    		
    		
    		var tempCityWeights= [];
    		var tempCityPaths = [];
    		var tempCityNames= [];
    		var tempCityPrices= [];
    		var tempFlightPrices= [];
    		
    		for (var d = 0, len = cityWeights.length; d < len; d += 1) {
         		tempCityWeights[d]=cityWeights[d];
         		tempCityPaths[d]=cityPaths[d];
         		tempCityNames[d]=cityNames[d];
         		tempCityPrices[d]=cityPrices[d];
         		tempFlightPrices[d]=flightPrices[d];
     		}
    		
    		
    		getWeightedItem(tempCityWeights, tempCityPaths);
        	randCity= positionToRemove; 
        	$scope.d1['path']=tempCityPaths[randCity];
        	$scope.d1['name']=tempCityNames[randCity];
        	$scope.d1['price']=tempCityPrices[randCity];
        	$scope.d1['flightPrice']=tempFlightPrices[randCity];
        	
        	tempCityWeights.splice(randCity,1);
        	tempCityPaths.splice(randCity,1);
        	tempCityNames.splice(randCity,1);
        	tempCityPrices.splice(randCity,1);
        	tempFlightPrices.splice(randCity,1);
        	
        	randCity= Math.floor(rand(tempCityPaths.length)); 
        	$scope.d2['path']=tempCityPaths[randCity];
        	$scope.d2['name']=tempCityNames[randCity];
        	$scope.d2['price']=tempCityPrices[randCity];
        	$scope.d2['flightPrice']=tempFlightPrices[randCity];
        	
        	tempCityWeights.splice(randCity,1);
        	tempCityPaths.splice(randCity,1);
        	tempCityNames.splice(randCity,1);
        	tempCityPrices.splice(randCity,1);
        	tempFlightPrices.splice(randCity,1);

        	randCity= Math.floor(rand(tempCityPaths.length)); 
        	$scope.d3['path']=tempCityPaths[randCity];
        	$scope.d3['name']=tempCityNames[randCity];
        	$scope.d3['price']=tempCityPrices[randCity];
        	$scope.d3['flightPrice']=tempFlightPrices[randCity];
        	
        	tempCityWeights.splice(randCity,1);
        	tempCityPaths.splice(randCity,1);
        	tempCityNames.splice(randCity,1);
        	tempCityPrices.splice(randCity,1)
        	tempFlightPrices.splice(randCity,1);

        	
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
    
 	
 	var createChoices = function(names, currencies) {
        var choices = [];

//         for (var i = 0; i < names.length; i++) {
//             var key = names[i];
//             var value = currencies[i];
//             choices.push({ "key": key, "value": value});
//         }

		choices.push({ "key": 'New York City', "value": 'USD'});  //manual override for now
        
        return choices;
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
        	
        	//sendClicked();
        	cityRec();
        	
	};
	






//NEED TO MODIFY.  Copied this over cuz tipsy right now.



$scope.cityClick = function(n){
		
 //    SOME OF THIS CAN WORK WELL for choosing desintations.  Probability based choices.  Keeping track.  
    	
    	if (n==0 && $scope.d1['path']&& sentClicked==false){
    		clicked.push($scope.d1['path']); //one clicked array or one for inputs and one for destinations?
    	}
    	if (n==1 && $scope.d2['path']&& sentClicked==false){
    		clicked.push($scope.d2['path']); 
    	}
    	if (n==2 && $scope.d3['path']&& sentClicked==false){
    		clicked.push($scope.d3['path']); 
    	}
    	
    	    	
		sendClicked();  //this needs to be a different type of sendClicked I think

		sentClicked=true
		
		
		//create a new function to reset all input arrays and re-pull fresh sets from the database
	};


var cityRec = function(){
		
    	
    	if (cityPaths.length>2){
    		
    		var tempCityWeights= [];
    		var tempCityPaths = [];
    		var tempCityNames= [];
    		var tempCityPrices= [];
    		var tempFlightPrices =[];
    		
    		for (var d = 0, len = cityWeights.length; d < len; d += 1) {
         		tempCityWeights[d]=cityWeights[d];
         		tempCityPaths[d]=cityPaths[d];
         		tempCityNames[d]=cityNames[d];
         		tempCityPrices[d]=cityPrices[d];
         		tempFlightPrices[d]=flightPrices[d];
     		}
    		
    		    		
    		//first destination pic does a weight-based recommendation
        	
        	getWeightedItem(tempCityWeights, tempCityPaths);
        	randCity= positionToRemove; 
        	$scope.d1['path']=tempCityPaths[randCity];
        	$scope.d1['name']=tempCityNames[randCity];
        	$scope.d1['price']=tempCityPrices[randCity];
        	$scope.d1['flightPrice']=tempFlightPrices[randCity];
        	
        	tempCityWeights.splice(randCity,1);
        	tempCityPaths.splice(randCity,1);
        	tempCityNames.splice(randCity,1);
        	tempCityPrices.splice(randCity,1);
        	tempFlightPrices.splice(randCity,1);
        	
        	
        	randCity= Math.floor(rand(tempCityPaths.length)); 
        	$scope.d2['path']=tempCityPaths[randCity];
        	$scope.d2['name']=tempCityNames[randCity];
        	$scope.d2['price']=tempCityPrices[randCity];
        	$scope.d2['flightPrice']=tempFlightPrices[randCity];
        	
        	tempCityWeights.splice(randCity,1);
        	tempCityPaths.splice(randCity,1);
        	tempCityNames.splice(randCity,1);
        	tempCityPrices.splice(randCity,1);
        	tempFlightPrices.splice(randCity,1);

        	//now we have an issue where there could be repeats within the three.  need to get rid of that
        	randCity= Math.floor(rand(tempCityPaths.length)); 
        	$scope.d3['path']=tempCityPaths[randCity];
        	$scope.d3['name']=tempCityNames[randCity];
        	$scope.d3['price']=tempCityPrices[randCity];
        	$scope.d3['flightPrice']=tempFlightPrices[randCity];
        	
        	tempCityWeights.splice(randCity,1);
        	tempCityPaths.splice(randCity,1);
        	tempCityNames.splice(randCity,1);
        	tempCityPrices.splice(randCity,1)
        	tempFlightPrices.splice(randCity,1);

        	}
	};


        	
        
        
        
  	
  	


  
  
  
  $('#dp3').datepicker();

  
  
  
  
  
  
  
  }]);
  

