angular.module('splashapp')
  .controller('HomeController', ['$scope', '$http', function ($scope, $http, $filter) {
  	
  	
  	$scope.page = 1;
  	
	$scope.destination;
	
	$scope.cols=0;
	
	$scope.start1="";
	$scope.end1=""
	
	$scope.divs = [
 	{"startDate":"", "endDate":""},
 	{"startDate":"", "endDate":""},
 	{"startDate":"", "endDate":""},
 	{"startDate":"", "endDate":""},
  	];
	
	
    $scope.email1="";
    
    $scope.emailDivs=[
    {email:""},
    {email:""},
    {email:""},
    {email:""},
    {email:""},
    {email:""},
    ];  
    
    
    
    
    $scope.emailCols=1;
    $scope.increaseEmailCols = function () {
        $scope.emailCols++;
    }
    
    $scope.increaseCols = function () {
        $scope.cols++;
    }
  	
  	//json model here: http://www.w3schools.com/js/js_json.asp
  	
  	
  
  	
  	$scope.clickedLabels= [];
  	
  	
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
//put in something like: priority: budget, time, experience

 	$scope.inputPictures = [
 	
 	//need to see if they already have a destination/activity in mind or if they need to pick a place first
 	
 	// {"category":"How much have you planned so far?", "paths":["../img/picPool/BoatCouple.jpg", "../img/picPool/ParkPic.jpg","../img/picPool/SurfsUp.jpg"],
//      "labels":["Destination","Activities","Details"]},
 	
 	
     {"category":"Would you rather...", "paths":["../img/picPool/BoatCoupleO.jpg", "../img/picPool/ParkPicO.jpg","../img/picPool/SurfsUpO.jpg"],
     "labels":["Relax","See","Do"]},
     
     {"category":"Weather?", "paths":["../img/picPool/SkiO.jpg", "../img/picPool/SummerSunny.jpg","../img/picPool/AutumnO.jpg"],"labels":
     ["Cold","Warm","Mild"]},
     
     {"category":"Environment?", "paths":["../img/picPool/MountainLakeO.jpg", "../img/picPool/DenmarkTownO.jpg","../img/picPool/CityO.jpg"],
     "labels":["Nature","Town","City"]},
     //town https://www.flickr.com/photos/hozho/15242684458
     
     
    // {"category":"What type of experience?", "paths":["../img/picPool/MountainLake.jpg", "../img/picPool/Village.jpg","../img/picPool/City.jpg"],
    // "labels":["Roughing it","Quaint","Luxury"]},
     
     {"category":"Will you be traveling by yourself or with others?", "paths":["../img/picPool/CityGirlO.jpg", "../img/picPool/GroupTravelO.jpg"],
     "labels":["Solo","Group"]},
     //https://www.flickr.com/photos/rbos/77157265
     
//      //{"category":"Company", "paths":["../img/picPool/CityGirl.jpg", "../img/picPool/Kiss.jpg","../img/picPool/Party.jpg"],
//      //"labels":["solo","couple","group"]},
  	]
 	
 	
 	
 	
 	// $scope.experiencePictures = [
//  	
//  	
//  	{"experience":"Aurora Borealis (Northern Lights)", "location":"Reykjavik, Iceland", "path":"../img/picPool/NorthernLights.jpg", 
//  	 "flightPrice":717, "dailyPrice":69.66, "tags":["Relax","See","Cold","Nature"]},
//  	 
//  	 {"experience":"Scuba Dive", "location":"Great Barrier Reef, Australia", "path":"../img/picPool/ScubaGreatReef.jpg", 
//  	 "flightPrice":1138, "dailyPrice":100, "date": "November", "tags":["Warm","Nature","Do"]},
//      
//      {"experience":"Safari", "location":"Kruger National Park, South Africa", "path":"../img/picPool/KrugerSafari.jpg", 
//      "flightPrice":1194, "dailyPrice":40, "date": "September", "tags":["Warm","Mild","Nature","Town","See","Do"]},
//      
//      
//  	 
//  	 
//  	 {"experience":"Meditation Retreat", "location":"Johor Bahru, Malaysia", "path":"../img/picPool/BaliRetreat.jpg", 
//      "flightPrice":1283, "dailyPrice":25, "date": "April", "tags":["Warm","Town","Relax","Do","Mild"]},
//      
//      {"experience":"Kitesurf", "location":"Kite Beach, Dominican Republic", "path":"../img/picPool/Kitesurfing.jpg", 
//      "flightPrice":621, "dailyPrice":130, "date": "April", "tags":["Warm","Town","Do"]},
//      
//      {"experience":"Ski", "location":"Swiss Alps", "path":"../img/picPool/SwissAlps.jpg", 
//      "flightPrice":696, "dailyPrice":175, "date": "November", "tags":["Cold","Town","Nature","Do"]},
//      
//      {"experience":"World's Highest Bungee Bridge", "location":"Bloukrans Bridge, South Africa", "path":"../img/picPool/Bungee.jpg", 
//  	 "flightPrice":1600, "dailyPrice":80, "tags":["Warm","Nature","Do"]},
//      
//      {"experience":"Songkran", "location":"Chiang Mai, Thailand", "path":"../img/picPool/SongkranWatergun.jpg", 
//      "flightPrice":1338, "dailyPrice":20.02, "date": "April", "tags":["Warm","City","See","Do"]},
//      
//      {"experience":"Hot Air Balloon", "location":"Cappadocia, Turkey", "path":"../img/picPool/Balloon.jpg", 
//      "flightPrice":700, "dailyPrice":40, "date": "October", "tags":["Warm","Nature","Town","Do","See"]},
//      //https://www.flickr.com/photos/88657298@N00/7183574033
//      
//      
//      
//      {"experience":"Running of the Bulls", "location":"Pamplona, Spain", "path":"../img/picPool/RunningBulls.jpg", 
//      "flightPrice":935, "dailyPrice":45, "date": "July", "tags":["Warm","City","Do"]},
//      
//      
//      
//      {"experience":"Camp", "location":"Denali National Park, Alaska", "path":"../img/picPool/DenaliCamping.jpg", 
//      "flightPrice":526, "dailyPrice":25, "date": "July", "tags":["Mild", "Cold","Nature","Do","See"]},
//      
//      
//      {"experience":"Wine Tour", "location":"Napa Valley, California", "path":"../img/picPool/NapaVineyard.jpg", 
//      "flightPrice":328, "dailyPrice":100, "date": "September", "tags":["Warm","Mild","Nature","Town","Relax","Do"]},
//      
//  	 
//  	 
//  	 
//  	 {"experience":"Pilgrimage to Mecca", "location":"Mecca, Saudi Arabia", "path":"../img/picPool/MeccaPilgrimage.jpg", 
//  	 "flightPrice":926, "dailyPrice":25, "date": "May", "tags":["Warm","City","Do","See"]},
//      
//      {"experience":"Oktoberfest", "location":"Munich, Germany", "path":"../img/picPool/Oktoberfest.jpg", 
//  	 "flightPrice":782, "dailyPrice":65.82, "date": "September", "tags":["Mild","City","Do","See"] },
//  	 
// // 	 {"experience":"Volcano Board", "location":"South America", "path":"../img/picPool/Oktoberfest.jpg", 
//  //	 "flightPrice":782, "dailyPrice":65.82, "date": "September", "tags":["Mild","City","Do","See"] },
//      
//      
//      
// //     {"experience":"Sonar", "location":"Barcelona, Spain", "path":"../img/picPool/Oktoberfest.jpg", 
// // 	 "flightPrice":782, "dailyPrice":65.82, "date": "September", "tags":["Mild","City","Do","See"] },
//      
//      
//      
//  	 
//  	 //{"experience":"Yacht Week", "location":"in Mecca", "path":"../img/picPool/MeccaPilgrimage.jpg", "flightPrice":926, "dailyPrice":25, "date": "May"},
//  	 
//  	 //{"experience":"Hiking", "location":"in Mecca", "path":"../img/picPool/MeccaPilgrimage.jpg", "flightPrice":926, "dailyPrice":25, "date": "May"},
//  	 //{"experience":"Work on a Vineyard", "location":"in Mecca", "path":"../img/picPool/MeccaPilgrimage.jpg", "flightPrice":926, "dailyPrice":25, "date": "May"},
//  	 //{"experience":"Yoga", "location":"in Mecca", "path":"../img/picPool/MeccaPilgrimage.jpg", "flightPrice":926, "dailyPrice":25, "date": "May"},
//  	   
//  	 
//  	 
//  	 //{"experience":"St Patrick's Day", "location":"in Mecca", "path":"../img/picPool/MeccaPilgrimage.jpg", "flightPrice":926, "dailyPrice":25, "date": "May"},
//  	 //{"experience":"Adventure Sport", "location":"in New Zealand", "path":"../img/picPool/MeccaPilgrimage.jpg", "flightPrice":926, "dailyPrice":25, "date": "May"},
//  	 //{"experience":"Surf", "location":"in Mecca", "path":"../img/picPool/MeccaPilgrimage.jpg", "flightPrice":926, "dailyPrice":25, "date": "May"},
//  	 //{"experience":"Trek", "location":"in Antarctica", "path":"../img/picPool/MeccaPilgrimage.jpg", "flightPrice":926, "dailyPrice":25, "date": "May"},
//  	 //{"experience":"Surf", "location":"in Galapagos", "path":"../img/picPool/MeccaPilgrimage.jpg", "flightPrice":926, "dailyPrice":25, "date": "May"},
//  	 //{"experience":"Full Moon Party", "location":"in Koh Phangan, Thailand", "path":"../img/picPool/MeccaPilgrimage.jpg", "flightPrice":926, "dailyPrice":25, "date": "May"},
//  	]

  	$scope.inputBatch = 0;
  	$scope.e1;
  	$scope.e2;
  	$scope.e3;
  	
  	$scope.show1=true;
  	$scope.show2=true;
  	$scope.show3=true;
  	
  	$scope.tripLength;
  	$scope.budget;
  	$scope.startingCity;
  	
  	




	$scope.nextStep = function(clicked){
  		$scope.page= $scope.page + 1;
  				
  		if (clicked!=null)
  		{
  			
  			$scope.clickedLabels.push(clicked);
  		}
	
  	}
  	
  	$scope.emailClick = function(){
  		var emailString="";
  		for(var j=0; j<$scope.emailCols; j++){
  			emailString=emailString.concat($scope.emailDivs[j].email+",");
  		}
  		
  		$scope.nextStep($scope.email1.concat(","+emailString));
  		$scope.sendClicked();
  	}
  	
  	
  	var arrayToString = function(ieClickedLabels){
  		var emailString="";
  		for(var j=0; j<ieClickedLabels.length; j++){
  			emailString=emailString.concat(ieClickedLabels[j]+",");
  		}  		
  		return emailString;
  	}
  	
  	//need to change this to send email eventually.  Adding in database for now.
  	$scope.sendClicked = function(){
  			$http.post('/tempPosts/', {'email': arrayToString($scope.clickedLabels)}).success(function() {
         	alert('Good Job!');
         }).error(function() {
         	alert('ERROR!');
         });
     };
  	
  	
  	$scope.dateClick = function(){
  		var dateString="";
  		for(var j=0; j<=$scope.cols; j++){
  			dateString=dateString.concat($scope.divs[j].startDate+","+$scope.divs[j].endDate+",");
  		}
  		
  		$scope.nextStep(($scope.start1+","+$scope.end1).concat(","+dateString));
  	}
  	
  	
  	
  	$scope.exploreImg;
  	$scope.setExplore = function(path){
  		$scope.exploreImg=path;
  		$scope.goTo(5);
  	}
  	
  	$scope.goTo = function(num){
  		$scope.page= num;
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
	
	$('#dp1').datepicker();
	$('#dp2').datepicker();




$scope.cityClick = function(n){
		
		$scope.page= 3
		getRecs();
  		

		//alert('Nice Choice!  Go to www.tripadvisor.com to learn more.');
		
	};

  }]);
  

