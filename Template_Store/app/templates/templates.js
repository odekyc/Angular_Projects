angular.module('templateStore.templates', [ 'ngRoute'])
.config(['$routeProvider', function($routeProvider){
     $routeProvider.
     when('/templates', {
     	templateUrl: 'templates/templates.html',
     	controller: 'TemplatesCtrl'
     }).
      when('/templates/:templateId', {
     	templateUrl: 'templates/details.html',
     	controller: 'DetailsCtrl'
     })
}])
.controller('TemplatesCtrl', ['$scope', '$http',  function($scope, $http){
	console.log('templatescontroller init');
	$http.get('/JSON/templates.json').success(function(response){
		console.log("success response");
		$scope.templates=response;
	});
}])
.controller('DetailsCtrl', ['$scope', '$routeParams', '$http', '$filter', function($scope, $routeParams, $http, $filter){
	console.log('details');
	var templateId= $routeParams.templateId;
	$http.get('/JSON/templates.json').success(function(response){
		console.log("success response");

		$scope.mytemplate=$filter('filter')(response, function(d){
             return d.id == templateId;
		})[0];

		$scope.mainImage=$scope.mytemplate.image[0];

	});

	$scope.setImg=function(selectedImg){

		$scope.mainImage=selectedImg;
	}
	
}])