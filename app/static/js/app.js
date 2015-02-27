// Declare app level module which depends on filters, and services
angular.module('splashapp', ['ngResource', 'ngRoute', 'ui.bootstrap', 'ui.date'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home/home.html', 
        controller: 'HomeController'})
      .when('/blog', {
        templateUrl: 'views/blog/blog.html', 
        controller: 'BlogController'})  
      .when('/explore', {
        templateUrl: 'views/explore/explore.html', 
        controller: 'ExploreController'})
      .when('/comingsoon', {
        templateUrl: 'views/coming/coming.html', 
        controller: 'ComingController'})
      .otherwise({redirectTo: '/'});}
      
]);


