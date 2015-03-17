angular.module('splashapp')
  .controller('HomeController', ['$scope', '$http', function ($scope, $http, $filter) {
  	
  	
  	$scope.page = 1;
  	

  	
  	//json model here: http://www.w3schools.com/js/js_json.asp
  	
  	
  	$scope.clickedLabels= [];
  	
  	$scope.filters= ["Weather","Environment"];
  	
  	$scope.inputPictures = [
     {"category":"Weather", "paths":["../img/picPool/Ski.jpg", "../img/picPool/SummerSunny.jpg","../img/picPool/Autumn.jpg"],"labels":
     ["cold","warm","mild"]},
     {"category":"Environment", "paths":["../img/picPool/MountainLake.jpg", "../img/picPool/Village.jpg","../img/picPool/City.jpg"],
     "labels":["wild","village","urban"]},
     //{"category":"Company", "paths":["../img/picPool/CityGirl.jpg", "../img/picPool/Kiss.jpg","../img/picPool/Party.jpg"],
     //"labels":["solo","couple","group"]},
     {"category":"Activeness", "paths":["../img/picPool/BarcelonaChilling.jpg", "../img/picPool/ParkPic.jpg","../img/picPool/SurfsUp.jpg"],
     "labels":["relaxed","moderate","active"]},
     
 	]
 	
 	
 	$scope.experiencePictures = [
 	
 	
 	{"experience":"Aurora Borealis (Northern Lights)", "location":"Reykjavik, Iceland", "path":"../img/picPool/NorthernLights.jpg", 
 	 "flightPrice":717, "dailyPrice":69.66, "Weather":"cold", "Activeness":"relaxed"},
 	 
 	 {"experience":"Scuba Dive", "location":"Great Barrier Reef, Australia", "path":"../img/picPool/ScubaGreatReef.jpg", 
 	 "flightPrice":1138, "dailyPrice":100, "date": "November", "Weather":"warm",
     "Activeness":"active"},
     
     {"experience":"Safari", "location":"Kruger National Park, South Africa", "path":"../img/picPool/KrugerSafari.jpg", 
     "flightPrice":1194, "dailyPrice":40, "date": "September", "Weather":"warm", "Environment":"village"},
     
 	 
 	 
 	 {"experience":"Meditation Retreat", "location":"Johor Bahru, Malaysia", "path":"../img/picPool/BaliRetreat.jpg", 
     "flightPrice":1283, "dailyPrice":25, "date": "April", "Weather":"warm", "Environment":"village",
     "Activeness":"relaxed"},
     
     {"experience":"Kitesurf", "location":"Kite Beach, Dominican Republic", "path":"../img/picPool/Kitesurfing.jpg", 
     "flightPrice":621, "dailyPrice":130, "date": "April", "Weather":"warm", "Environment":"village",
     "Activeness":"active"},
     
     {"experience":"World's Highest Bungee Bridge", "location":"Bloukrans Bridge, South Africa", "path":"../img/picPool/Bungee.jpg", 
 	 "flightPrice":1600, "dailyPrice":80, "Weather":"warm", "Environment":"wild", "Activeness":"active"},
     
     {"experience":"Songkran", "location":"Chiang Mai, Thailand", "path":"../img/picPool/SongkranWatergun.jpg", 
     "flightPrice":1338, "dailyPrice":20.02, "date": "April", "Weather":"warm", "Environment": "urban"},
     
     
     
     {"experience":"Ski", "location":"Swiss Alps", "path":"../img/picPool/SwissAlps.jpg", 
     "flightPrice":696, "dailyPrice":175, "date": "November","Weather":"cold",
     "Activeness":"active"},
     
     {"experience":"Running of the Bulls", "location":"Pamplona, Spain", "path":"../img/picPool/RunningBulls.jpg", 
     "flightPrice":935, "dailyPrice":45, "date": "July", "Weather":"warm", 
     "Activeness":"active"},
     
     
     
     {"experience":"Camp", "location":"Denali National Park, Alaska", "path":"../img/picPool/DenaliCamping.jpg", 
     "flightPrice":526, "dailyPrice":25, "date": "July", "Environment":"wild",
     "Activeness":"active"},
     
     
     {"experience":"Wine Tour", "location":"Napa Valley, California", "path":"../img/picPool/NapaVineyard.jpg", 
     "flightPrice":328, "dailyPrice":100, "date": "September", "Weather":"mild"},
     
 	 
 	 
 	 
 	 {"experience":"Pilgrimage to Mecca", "location":"Mecca, Saudi Arabia", "path":"../img/picPool/MeccaPilgrimage.jpg", 
 	 "flightPrice":926, "dailyPrice":25, "date": "May", "Weather":"warm", 
     "Activeness":"active"},
     
     
     
 	 
 	 //{"experience":"Yacht Week", "location":"in Mecca", "path":"../img/picPool/MeccaPilgrimage.jpg", "flightPrice":926, "dailyPrice":25, "date": "May"},
 	 
 	 //{"experience":"Hiking", "location":"in Mecca", "path":"../img/picPool/MeccaPilgrimage.jpg", "flightPrice":926, "dailyPrice":25, "date": "May"},
 	 //{"experience":"Work on a Vineyard", "location":"in Mecca", "path":"../img/picPool/MeccaPilgrimage.jpg", "flightPrice":926, "dailyPrice":25, "date": "May"},
 	 //{"experience":"Yoga", "location":"in Mecca", "path":"../img/picPool/MeccaPilgrimage.jpg", "flightPrice":926, "dailyPrice":25, "date": "May"},
 	   
 	 {"experience":"Oktoberfest", "location":"Munich, Germany", "path":"../img/picPool/Oktoberfest.jpg", 
 	 "flightPrice":782, "dailyPrice":65.82, "date": "September", "Weather":"mild" },
 	 
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
    	$scope.clickedLabels.push(null);
    }
    
    $scope.backward = function(){
    	$scope.inputBatch= $scope.inputBatch - 1;
    }



	$scope.nextStep = function(){
  			$scope.page= $scope.page + 1;
  			
  			//can do this only when page gets large enough
			getRecs();
  	}
  	
  	
  	$scope.exploreImg;
  	$scope.setExplore = function(path){
  		$scope.exploreImg=path;
  		$scope.goTo(5);
  	}
  	
  	$scope.goTo = function(num){
  		$scope.page= num;
  	}
  	
  	
  	var checkArray = function(array, value){
  		var match = false;
		for(var i=0;i<array.length;i++){
    		if(array[i]===value){
        		match=true;
    		}
		}
  	
  	}
  	
	var getRecs = function(){
		
		if ($scope.page==3){
  		
  		
  			var tempArray=[];
  			var tempIndex=0;
  		
  			for (var index=0; index<$scope.experiencePictures.length; index++)
  			{
  				
  				if($scope.experiencePictures[index].flightPrice + $scope.experiencePictures[index].dailyPrice*$scope.tripLength<$scope.budget)
  				{
  					if($scope.experiencePictures[index].Weather==$scope.clickedLabels[0] || !$scope.experiencePictures[index].Weather 
  					|| !$scope.clickedLabels[0]){
  						
  						if($scope.experiencePictures[index].Environment==$scope.clickedLabels[1] || 
  						!$scope.experiencePictures[index].Environment || !$scope.clickedLabels[1]){
  							
  							if($scope.experiencePictures[index].Activeness==$scope.clickedLabels[2] || 
  							!$scope.experiencePictures[index].Activeness || !$scope.clickedLabels[2]){
  									tempArray[tempIndex]=$scope.experiencePictures[index];
  									tempIndex= tempIndex+1;
  								}
  								
  							}
  							
  						}
  						
  					
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


  	$scope.inputClick = function(label){
		$scope.inputBatch = $scope.inputBatch+1;
        $scope.backArrow = true;
        
        $scope.clickedLabels.push(label);
        
        	
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
  

