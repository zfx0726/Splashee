angular.module('splashapp')
  .controller('ExploreController', ['$scope', function ($scope) {

  	$scope.questions = [
    {'text': 'Hot or Cold',
     'answers': ['Hot','Cold']},
    {'text': 'Style',
     'answers': ['Budget','Medium','Luxury']},
 
  ];
  
  }]);
