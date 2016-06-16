// Code goes here

var app=angular.module("computer", ["ngRoute"])
.config(['$routeProvider', function($routeProvider){
   $routeProvider.
   when('/main', {
     templateUrl: 'main.html',
     controller: 'MainControl'
     
   }).
  when('/about', {
     templateUrl: 'about.html',
     controller: 'MainControl'
     
   }).
  when('/services', {
     templateUrl: 'services.html',
     controller: 'ServiceControl'
     
   }).
  when('/contact', {
     templateUrl: 'contact.html',
     controller: 'ContactControl'
     
   }).
   otherwise({ redirectTo: 'main' });
   
}])
.controller("MainControl", [ "$scope" , function($scope){
  $scope.title="Basic Website";
  console.log("maincontrol")
}])
.controller("ServiceControl", [ "$scope" , "$http", function($scope , $http ){
  $http.get('services.json').then(function(response){
    $scope.services=response.data;
  });
}])
.controller("ContactControl", [ "$scope" , "$http", function($scope , $http ){
     $http.get('contact.json').then(function(response){
    $scope.locations=response.data;
  });
}])