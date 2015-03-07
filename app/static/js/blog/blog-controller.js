angular.module('splashapp')
  .controller('BlogController', ['$scope', function ($scope) {

	$scope.postNum=2;
	
	$scope.set = function(num){
		$scope.postNum = num;
	
	}
  
  }]);
