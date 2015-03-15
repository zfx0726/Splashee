angular.module('splashapp')
  .controller('BlogController', ['$scope', function ($scope) {

	$scope.postNum=4;
	
	$scope.set = function(num){
		$scope.postNum = num;
	
	}
  
  }]);
