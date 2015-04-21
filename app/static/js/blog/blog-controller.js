angular.module('splashapp')
  .controller('BlogController', ['$scope', '$http', function ($scope, $http, $filter) {

	$scope.postNum=11;
	
	$scope.email="";
	
	$scope.set = function(num){
		$scope.postNum = num;
	
	}
	
	$scope.next = function(){
		if($scope.postNum<13){
			$scope.postNum = $scope.postNum +1;
		}
	
	}
	
	$scope.back = function(){
		if($scope.postNum>0){
			$scope.postNum = $scope.postNum-1;
		}
	
	}
	
	$scope.showSubscribe=true;
	
	//get rid of this eventually and send real emails!
	$scope.sendEmail = function(){
  			$http.post('/tempPosts/', {'email': $scope.email}).success(function() {
  			$scope.showSubscribe=false;
         	alert('Subscribed!');
         }).error(function() {
         	alert('ERROR!');
         });
     };
     
     

  
  }]);
