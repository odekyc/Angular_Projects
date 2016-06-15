// module

var weatherApp = angular.module('weatherApp', [ 'ngRoute' , 'ngResource'] );

//ROUTES
weatherApp.config(function($routeProvider){
     $routeProvider
     .when( '/' , {
     	templateUrl : 'pages/home.htm' ,
     	controller : 'homeController'
     })
     .when( '/forecast', {
        templateUrl : 'pages/forecast.htm' ,
        controller : 'forecastController'
     })
     .when( '/forecast/:days', {
        templateUrl : 'pages/forecast.htm' ,
        controller : 'forecastController'
     });
});

//SERVICES

weatherApp.service('cityService', function(){
     this.city="Arcadia, CA";

});

//CONTROLLERS

weatherApp.controller('homeController', [ '$scope' , 'cityService' , function($scope, cityService){
   $scope.city=cityService.city;

   $scope.$watch('city', function(){
      cityService.city=$scope.city;

   });


}]);


weatherApp.controller('forecastController', [ '$scope' , '$resource' , '$routeParams', 'cityService',  function($scope , $resource , $routeParams , cityService){
    $scope.city=cityService.city;

    $scope.days=$routeParams.days || 2;

    $scope.weatherAPI=$resource("http://api.openweathermap.org/data/2.5/forecast/daily?APPID=ef0046d53dea5f5635696973098f4338", {
    	callback: "JSON_CALLBACK"}, { get : {method: "JSONP"}});
     
     $scope.weatherResult=$scope.weatherAPI.get({ q: $scope.city, cnt: $scope.days });

     

    $scope.convertToFah=function(degK){
    	return Math.round((1.8 * (degK -273)) + 32);
    };

    $scope.convertToDate=function( datems){
        return new Date( datems*1000);
    };
}]);