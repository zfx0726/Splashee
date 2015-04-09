angular.module('splashapp')
  .controller('HomeController', ['$scope', '$http', function ($scope, $http, $filter) {
  	
  	
  	$scope.page = 1;
  	
  	
  	//json model here: http://www.w3schools.com/js/js_json.asp
  	
  	
  	$scope.clickedLabels= [];
  	
  	$scope.filters= ["Weather","Environment"];
  	
//   	$scope.inputPictures = [
//      {"category":"Weather", "paths":["../img/picPool/Ski.jpg", "../img/picPool/SummerSunny.jpg","../img/picPool/Autumn.jpg"],"labels":
//      ["cold","warm","mild"]},
//      {"category":"Environment", "paths":["../img/picPool/MountainLake.jpg", "../img/picPool/Village.jpg","../img/picPool/City.jpg"],
//      "labels":["wild","village","urban"]},
//      //{"category":"Company", "paths":["../img/picPool/CityGirl.jpg", "../img/picPool/Kiss.jpg","../img/picPool/Party.jpg"],
//      //"labels":["solo","couple","group"]},
//      {"category":"Activeness", "paths":["../img/picPool/BarcelonaChilling.jpg", "../img/picPool/ParkPic.jpg","../img/picPool/SurfsUp.jpg"],
//      "labels":["relaxed","moderate","active"]},
//  	]

//		Relax, See, Do -> Learn, Culture, Adrenaline, Self-Realization
//Culture - historic/modern
//When looking at the motives for travel, the things that the visitors are most likely to be seeking 
//are cultural difference, excitement, learning and relaxation.

 	$scope.inputPictures = [
     {"category":"Activity type?", "paths":["../img/picPool/BoatCouple.jpg", "../img/picPool/ParkPic.jpg","../img/picPool/SurfsUp.jpg"],
     "labels":["Relax","See","Do"]},
     
     {"category":"Preferred weather?", "paths":["../img/picPool/Ski.jpg", "../img/picPool/SummerSunny.jpg","../img/picPool/Autumn.jpg"],"labels":
     ["Cold","Warm","Mild"]},
     {"category":"Environment?", "paths":["../img/picPool/MountainLake.jpg", "../img/picPool/Village.jpg","../img/picPool/City.jpg"],
     "labels":["Nature","Town","City"]},
//      //{"category":"Company", "paths":["../img/picPool/CityGirl.jpg", "../img/picPool/Kiss.jpg","../img/picPool/Party.jpg"],
//      //"labels":["solo","couple","group"]},
  	]
 	
 	
 	$scope.experiencePictures = [
 	
 	
 	{"experience":"Aurora Borealis (Northern Lights)", "location":"Reykjavik, Iceland", "path":"../img/picPool/NorthernLights.jpg", 
 	 "flightPrice":717, "dailyPrice":69.66, "tags":["Relax","See","Cold","Nature"]},
 	 
 	 {"experience":"Scuba Dive", "location":"Great Barrier Reef, Australia", "path":"../img/picPool/ScubaGreatReef.jpg", 
 	 "flightPrice":1138, "dailyPrice":100, "date": "November", "tags":["Warm","Nature","Do"]},
     
     {"experience":"Safari", "location":"Kruger National Park, South Africa", "path":"../img/picPool/KrugerSafari.jpg", 
     "flightPrice":1194, "dailyPrice":40, "date": "September", "tags":["Warm","Mild","Nature","Town","See","Do"]},
     
     
 	 
 	 
 	 {"experience":"Meditation Retreat", "location":"Johor Bahru, Malaysia", "path":"../img/picPool/BaliRetreat.jpg", 
     "flightPrice":1283, "dailyPrice":25, "date": "April", "tags":["Warm","Town","Relax","Do","Mild"]},
     
     {"experience":"Kitesurf", "location":"Kite Beach, Dominican Republic", "path":"../img/picPool/Kitesurfing.jpg", 
     "flightPrice":621, "dailyPrice":130, "date": "April", "tags":["Warm","Town","Do"]},
     
     {"experience":"Ski", "location":"Swiss Alps", "path":"../img/picPool/SwissAlps.jpg", 
     "flightPrice":696, "dailyPrice":175, "date": "November", "tags":["Cold","Town","Nature","Do"]},
     
     {"experience":"World's Highest Bungee Bridge", "location":"Bloukrans Bridge, South Africa", "path":"../img/picPool/Bungee.jpg", 
 	 "flightPrice":1600, "dailyPrice":80, "tags":["Warm","Nature","Do"]},
     
     {"experience":"Songkran", "location":"Chiang Mai, Thailand", "path":"../img/picPool/SongkranWatergun.jpg", 
     "flightPrice":1338, "dailyPrice":20.02, "date": "April", "tags":["Warm","City","See","Do"]},
     
     {"experience":"Hot Air Balloon", "location":"Cappadocia, Turkey", "path":"../img/picPool/Balloon.jpg", 
     "flightPrice":700, "dailyPrice":40, "date": "October", "tags":["Warm","Nature","Town","Do","See"]},
     //https://www.flickr.com/photos/88657298@N00/7183574033
     
     
     
     {"experience":"Running of the Bulls", "location":"Pamplona, Spain", "path":"../img/picPool/RunningBulls.jpg", 
     "flightPrice":935, "dailyPrice":45, "date": "July", "tags":["Warm","City","Do"]},
     
     
     
     {"experience":"Camp", "location":"Denali National Park, Alaska", "path":"../img/picPool/DenaliCamping.jpg", 
     "flightPrice":526, "dailyPrice":25, "date": "July", "tags":["Mild", "Cold","Nature","Do","See"]},
     
     
     {"experience":"Wine Tour", "location":"Napa Valley, California", "path":"../img/picPool/NapaVineyard.jpg", 
     "flightPrice":328, "dailyPrice":100, "date": "September", "tags":["Warm","Mild","Nature","Town","Relax","Do"]},
     
 	 
 	 
 	 
 	 {"experience":"Pilgrimage to Mecca", "location":"Mecca, Saudi Arabia", "path":"../img/picPool/MeccaPilgrimage.jpg", 
 	 "flightPrice":926, "dailyPrice":25, "date": "May", "tags":["Warm","City","Do","See"]},
     
     {"experience":"Oktoberfest", "location":"Munich, Germany", "path":"../img/picPool/Oktoberfest.jpg", 
 	 "flightPrice":782, "dailyPrice":65.82, "date": "September", "tags":["Mild","City","Do","See"] },
 	 
// 	 {"experience":"Volcano Board", "location":"South America", "path":"../img/picPool/Oktoberfest.jpg", 
 //	 "flightPrice":782, "dailyPrice":65.82, "date": "September", "tags":["Mild","City","Do","See"] },
     
     
 	 
 	 //{"experience":"Yacht Week", "location":"in Mecca", "path":"../img/picPool/MeccaPilgrimage.jpg", "flightPrice":926, "dailyPrice":25, "date": "May"},
 	 
 	 //{"experience":"Hiking", "location":"in Mecca", "path":"../img/picPool/MeccaPilgrimage.jpg", "flightPrice":926, "dailyPrice":25, "date": "May"},
 	 //{"experience":"Work on a Vineyard", "location":"in Mecca", "path":"../img/picPool/MeccaPilgrimage.jpg", "flightPrice":926, "dailyPrice":25, "date": "May"},
 	 //{"experience":"Yoga", "location":"in Mecca", "path":"../img/picPool/MeccaPilgrimage.jpg", "flightPrice":926, "dailyPrice":25, "date": "May"},
 	   
 	 
 	 
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
  	
  	
  	
  	$scope.forward = function(){
    	$scope.inputBatch= $scope.inputBatch + 1;
    	$scope.clickedLabels.push(null);
    }
    
    $scope.backward = function(){
    	if($scope.inputBatch>0)
    	{
    		$scope.inputBatch= $scope.inputBatch - 1;
    	}
    }



	$scope.nextStep = function(){
  			$scope.page= $scope.page + 1;
  			
  			//can do this only when page gets large enough
  			
  			if ($scope.page==3){
				getRecs();
			}
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
		
  		
  		
  			var tempArray=[];
  			var tempIndex=0;
  			var matches = false;
  		
  		
  			// maybe filter like this: http://stackoverflow.com/questions/22024631/angularjs-filter-based-on-array-of-strings
  		
  			for (var index=0; index<$scope.experiencePictures.length; index++)
  			{//look through all of the experiences
  				
//  				if($scope.experiencePictures[index].flightPrice + $scope.experiencePictures[index].dailyPrice*$scope.tripLength<$scope.budget)
// 				{//first make sure that the experiences are in the right price range, filter for that
  					
  					for (var clickedIndex=0; clickedIndex<$scope.clickedLabels.length; clickedIndex++)
  					{//look through all of the clicked labels, make sure they're contained in the tags
  					
  						for (var picTag=0; picTag<$scope.experiencePictures[index].tags.length; picTag++)
  						{
  							if($scope.experiencePictures[index].tags[picTag]==$scope.clickedLabels[clickedIndex])
  							{
  								matches = true;
  								picTag=$scope.experiencePictures[index].tags.length;	
  							}
  							
						}
						if(matches==false)
						{
							clickedIndex= $scope.clickedLabels.length;
						}
						else
						{
							if(clickedIndex==$scope.clickedLabels.length-1)
							{
								if(matches==true)
								{
									tempArray[tempIndex]=$scope.experiencePictures[index];
  									tempIndex= tempIndex+1;	
								}
							}
							matches = false;
						}
						
						

//  					}
  					
  					
  					
  					
  					
  					
  					
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
  	
  	 $scope.clickedLabels[$scope.inputBatch]=label;
  	 
  	if($scope.inputBatch<$scope.inputPictures.length-1)
  	{
		$scope.inputBatch = $scope.inputBatch+1;
	}
	
        
       
        

	};
	




$scope.cityClick = function(n){
		
		$scope.page= 3
		getRecs();
  		

		//alert('Nice Choice!  Go to www.tripadvisor.com to learn more.');
		
	};

  }]);
  

