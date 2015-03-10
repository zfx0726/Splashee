angular.module('splashapp')
  .controller('HomeController', ['$scope', '$http', function ($scope, $http, $filter) {
  	
  	
  	$scope.page = 1;
  	

  	
  	//json model here: http://www.w3schools.com/js/js_json.asp
  	
  	$scope.inputPictures = [
     {"category":"Weather", "paths":["../img/picPool/Ski.jpg", "../img/picPool/SunnyBeach.jpg","../img/picPool/Autumn.jpg"]},
     {"category":"Environment", "paths":["../img/picPool/MountainLake.jpg", "../img/picPool/Village.jpg","../img/picPool/City.jpg"]},
     {"category":"Company", "paths":["../img/picPool/CityGirl.jpg", "../img/picPool/Kiss.jpg","../img/picPool/Party.jpg"]},
     {"category":"Activeness", "paths":["../img/picPool/BarcelonaChilling.jpg", "../img/picPool/ParkPic.jpg","../img/picPool/SurfsUp.jpg"]},
     
 	]
 	
 	
 	$scope.experiencePictures = [
     {"experience":"Songkran", "location":"in Chiang Mai, Thailand", "path":"../img/picPool/SongkranWatergun.jpg", "flightPrice":1338, "dailyPrice":20.02, "date": "April"},
     
     {"experience":"Safari", "location":"in Kruger National Park, South Africa", "path":"../img/picPool/KrugerSafari.jpg", "flightPrice":1194, "dailyPrice":40, "date": "September"},
     {"experience":"Ski", "location":"in the Swiss Alps", "path":"../img/picPool/SwissAlps.jpg", "flightPrice":696, "dailyPrice":175, "date": "November"},
     {"experience":"Running of the Bulls", "location":"in Pamplona, Spain", "path":"../img/picPool/RunningBulls.jpg", "flightPrice":935, "dailyPrice":45, "date": "July"},
     
     {"experience":"Meditation Retreat", "location":"in Bali, Indonesia", "path":"../img/picPool/BaliRetreat.jpg", "flightPrice":1283, "dailyPrice":25, "date": "April"},
     
     {"experience":"Kitesurf", "location":"on Kite Beach, Dominican Republic", "path":"../img/picPool/Kitesurfing.jpg", "flightPrice":621, "dailyPrice":130, "date": "April"},
     {"experience":"Camp", "location":"in Denali National Park, Alaska", "path":"../img/picPool/DenaliCamping.jpg", "flightPrice":526, "dailyPrice":25, "date": "July"},
     {"experience":"Wine Tour", "location":"around Napa Valley, California", "path":"../img/picPool/NapaVineyard.jpg", "flightPrice":328, "dailyPrice":100, "date": "September"},
     
 	 
 	 
 	 {"experience":"Scuba Dive", "location":"the Great Barrier Reef, Australia", "path":"../img/picPool/ScubaGreatReef.jpg", "flightPrice":1138, "dailyPrice":100, "date": "November"},
 	 {"experience":"Pilgrimage", "location":"to Mecca", "path":"../img/picPool/MeccaPilgrimage.jpg", "flightPrice":926, "dailyPrice":25, "date": "May"},
 	 
 	 //{"experience":"Yacht Week", "location":"in Mecca", "path":"../img/picPool/MeccaPilgrimage.jpg", "flightPrice":926, "dailyPrice":25, "date": "May"},
 	 
 	 //{"experience":"Hiking", "location":"in Mecca", "path":"../img/picPool/MeccaPilgrimage.jpg", "flightPrice":926, "dailyPrice":25, "date": "May"},
 	 //{"experience":"Work on a Vineyard", "location":"in Mecca", "path":"../img/picPool/MeccaPilgrimage.jpg", "flightPrice":926, "dailyPrice":25, "date": "May"},
 	 //{"experience":"Yoga", "location":"in Mecca", "path":"../img/picPool/MeccaPilgrimage.jpg", "flightPrice":926, "dailyPrice":25, "date": "May"},
 	 {"experience":"Oktoberfest", "location":"in Munich, Germany", "path":"../img/picPool/Oktoberfest.jpg", "flightPrice":782, "dailyPrice":65.82, "date": "September"},
 	 //{"experience":"St Patrick's Day", "location":"in Mecca", "path":"../img/picPool/MeccaPilgrimage.jpg", "flightPrice":926, "dailyPrice":25, "date": "May"},
 	 //{"experience":"Adventure Sport", "location":"in New Zealand", "path":"../img/picPool/MeccaPilgrimage.jpg", "flightPrice":926, "dailyPrice":25, "date": "May"},
 	 //{"experience":"Surf", "location":"in Mecca", "path":"../img/picPool/MeccaPilgrimage.jpg", "flightPrice":926, "dailyPrice":25, "date": "May"},
 	 //{"experience":"Trek", "location":"in Antarctica", "path":"../img/picPool/MeccaPilgrimage.jpg", "flightPrice":926, "dailyPrice":25, "date": "May"},
 	 //{"experience":"Surf", "location":"in Galapagos", "path":"../img/picPool/MeccaPilgrimage.jpg", "flightPrice":926, "dailyPrice":25, "date": "May"},
 	 //{"experience":"Full Moon Party", "location":"in Koh Phangan, Thailand", "path":"../img/picPool/MeccaPilgrimage.jpg", "flightPrice":926, "dailyPrice":25, "date": "May"},
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
			getRecs();
  	}
  	
  	
  	$scope.goTo = function(num){
  			$scope.page= num;
  	}
  	
	var getRecs = function(){
		
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
  					
  				
					if (tempArray.length==1)
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


	$scope.yes = function(){
        $http.post('/api/feedback/', {'sent': 'True'}).success(function() {
        	alert('Awesome!  You Rock!'); 
        }).error(function() {
        	//alert('ERROR!'); 
        });
    }; 
    
    
    $scope.no = function(){
        $http.post('/api/feedback/', {'sent': 'False'}).success(function() {
        	alert('Sorry to hear that!  If you have some time, I would love to hear your ideas of what could be improved.  Feel free to email me at zfx0726@gmail.com.'); 
        }).error(function() {
        	//alert('ERROR!'); 
        });
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
    
  	

    $scope.wrappers=createChoices();


  	$scope.inputClick = function(n){
		$scope.inputBatch = n;
        $scope.backArrow = true;
        	
        	
        if($scope.inputPictures.length-$scope.inputBatch == 0){
        	$scope.nextStep();
        }
	};
	




$scope.cityClick = function(n){
		
		$scope.page= 3
		getRecs();
  		

		//alert('Nice Choice!  Go to www.tripadvisor.com to learn more.');
		
	};

  }]);
  

