angular.module('splashapp')
  .controller('BlogController', ['$scope', '$http', function ($scope, $http, $filter) {

	$scope.postNum=10;
	
	$scope.email="";
	
	$scope.set = function(num){
		$scope.postNum = num;
	
	}
	
	$scope.showSubscribe=true;
	
	$scope.sendEmail = function(){
  			$http.post('/email/', {'email': $scope.email}).success(function() {
  			$scope.showSubscribe=false;
         	alert('Subscribed!');
         }).error(function() {
         	alert('ERROR!');
         });
     };
     
     

  
  }]);
