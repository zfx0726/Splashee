angular.module('splashapp')
  .controller('HomeController', ['$scope', '$http', function ($scope, $http, $filter) {
  	
  	
  	$scope.page = 1;
  	

  	
  	//json model here: http://www.w3schools.com/js/js_json.asp
  	
  	$scope.inputPictures = [
     {"category":"Weather", "paths":["../img/picPool/Ski.jpg", "../img/picPool/SunnyBeach.jpg","../img/picPool/Autumn.jpg"]},
     {"category":"Environment", "paths":["../img/picPool/MountainLake.jpg", "../img/picPool/Village.jpg","../img/picPool/Urban.jpg"]},
     {"category":"Group", "paths":["../img/picPool/CityGirl.jpg", "../img/picPool/Kiss.jpg","../img/picPool/Party.jpg"]},
     {"category":"Activity Level", "paths":["../img/picPool/BarcelonaChilling.jpg", "../img/picPool/ArtGallery.jpg","../img/picPool/SurfsUp.jpg"]},
 	]
 	
 	
 	$scope.experiencePictures = [
     {"experience":"Kitesurf", "location":"Kite Beach, Dominican Republic", "path":"../img/picPool/Kitesurfing.jpg", "flightPrice":621, "dailyPrice":130},
     {"experience":"Camp", "location":"Denali National Park, Alaska", "path":"../img/picPool/DenaliCamping.jpg", "flightPrice":526, "dailyPrice":25},
     {"experience":"Wine Tour", "location":"Napa Valley, California", "path":"../img/picPool/NapaVineyard.jpg", "flightPrice":328, "dailyPrice":100},
     {"experience":"Ski", "location":"the Swiss Alps", "path":"../img/picPool/SwissAlps.jpg", "flightPrice":696, "dailyPrice":175},
 	 {"experience":"Meditation Retreat", "location":"Bali, Indonesia", "path":"../img/picPool/BaliRetreat.jpg", "flightPrice":1283, "dailyPrice":25},
 	]

  	$scope.inputBatch = 0;
  	$scope.e1;
  	$scope.e2;
  	$scope.e3;
  	
  	$scope.show1=true;
  	$scope.show2=true;
  	$scope.show3=true;
  	
  	$scope.tripLength;
  	$scope.budget;
  	
  	$scope.backArrow = false;
  	
  	
  	$scope.forward = function(){
    	$scope.inputBatch= $scope.inputBatch + 1;
    	getInputs();
    }
    
    $scope.backward = function(){
    	$scope.inputBatch= $scope.inputBatch - 1;
    	getInputs();
    }



	$scope.nextStep = function(){
  			$scope.page= $scope.page + 1;
  		
  		if ($scope.page==3){
  		
  		
  			var tempArray=[];
  			var tempIndex=0;
  		
  			for (var index=0; index<$scope.experiencePictures.length; index++)
  			{
  				
  				if($scope.experiencePictures[index].flightPrice + $scope.experiencePictures[index].dailyPrice*$scope.tripLength<$scope.budget)
  				{
  					tempArray[tempIndex]=$scope.experiencePictures[index];
  					tempIndex= tempIndex+1;
  				}
  				
  			}
  			
  			
  			if (tempArray.length==0)
  			{
  				
  				$scope.show1=false;
  				$scope.show2=false;
  				$scope.show3=false;
  			}

  			else{
  				
  				var randomIndex = Math.floor(Math.random() * tempArray.length);
  				$scope.e1= tempArray[randomIndex];
  			
  				if (tempArray.length==1)
  				{	
  					$scope.show2=false;
  					$scope.show3=false;
  				}
				else{
					tempArray.splice(randomIndex,1);
					randomIndex = Math.floor(Math.random() * tempArray.length);
  					$scope.e2= tempArray[randomIndex];
  					
  				
					if (tempArray.length==2)
  					{
  						$scope.show3=false;
  					}

					else{
						tempArray.splice(randomIndex,1);
						randomIndex = Math.floor(Math.random() * tempArray.length);
  						$scope.e3= tempArray[randomIndex];
					
					}

  				}
  				
  			
  			}
  			
	
  		}
  	}
  	

  	

    
  	$scope.currency="$";
  	

 	
 	
//  	$scope.addData = function(){
//         $http.post('/api/database/', {sent: 'True'}).success(function() {
//         	alert('Database Updated!');
//         }).error(function() {
//         	alert('ERROR!');
//         });
//     };
//  	
//  	
//  	var sendClicked = function(){
//         $http.post('/api/clicked/', {clickedPaths: clicked}).success(function() {
//         	alert('Nice Choice!  Go to www.tripadvisor.com to learn more about this city.');
//         }).error(function() {
//         	//alert('ERROR!'); 
//         });
//     };
//  	


 

    
 	
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
    
  	

    $scope.wrappers=createChoices();


  	$scope.inputClick = function(n){
		$scope.inputBatch = n;
        $scope.backArrow = true;
        	
        	
        if($scope.inputPictures.length-$scope.inputBatch == 0){
        	$scope.nextStep();
        }
	};
	




$scope.cityClick = function(n){

		alert('Nice Choice!  Go to www.tripadvisor.com to learn more.');
		
	};

  }]);
  

