angular.module('splashapp')
  .controller('BlogController', ['$scope', function ($scope) {

	$scope.postNum=10;
	
	$scope.set = function(num){
		$scope.postNum = num;
	
	}
  
  }]);
