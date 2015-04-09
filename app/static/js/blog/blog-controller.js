angular.module('splashapp')
  .controller('BlogController', ['$scope', '$http', function ($scope, $http, $filter) {

	$scope.postNum=10;
	
	$scope.email="";
	
	$scope.set = function(num){
		$scope.postNum = num;
	
	}
	
	
	$scope.sendEmail = function(){
  			$http.post('/email/', {'email': $scope.email}).success(function() {
         	alert('Subscribed!');
         }).error(function() {
         	alert('ERROR!');
         });
     };
     
     

  
  }]);
