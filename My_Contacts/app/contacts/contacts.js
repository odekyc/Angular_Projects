'use strict';

angular.module('myContacts.contacts', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/contacts', {
    templateUrl: 'contacts/contacts.html',
    controller: 'ContactsCtrl'
  });
}])

.controller('ContactsCtrl', [ '$scope' , '$firebaseArray', function($scope , $firebaseArray) {
    var ref= new Firebase('https://elvasmycontacts.firebaseio.com/contacts');
    $scope.contacts= $firebaseArray(ref);
    
    $scope.addFormShow=false;
    $scope.showAddForm=function(){
        console.log("showAddForm");
    	$scope.addFormShow=true;
    	
    }

    $scope.hide=function(){
        $scope.addFormShow=false;
    }
}]);