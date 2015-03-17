angular.module('splashapp')
  .controller('BlogController', ['$scope', function ($scope) {

	$scope.postNum=6;
	
	$scope.set = function(num){
		$scope.postNum = num;
	
	}
  
  }]);
