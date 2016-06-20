'use strict';

angular.module('myContacts.contacts', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/contacts', {
    templateUrl: 'contacts/contacts.html',
    controller: 'ContactsCtrl'
  });
}])
//contacts controller
.controller('ContactsCtrl', [ '$scope' , '$firebaseArray', function($scope , $firebaseArray) {
    //init Firebase
    var ref= new Firebase('https://elvasmycontacts.firebaseio.com/contacts');
    $scope.contacts= $firebaseArray(ref);
    //get contacts

    $scope.addFormShow=false;
    //show add form
    $scope.showAddForm=function(){
        console.log("showAddForm");
    	$scope.addFormShow=true;
    	
    }
    //hide forms
    $scope.hide=function(){
        $scope.addFormShow=false;
        $scope.contactShow=false;
    }
    //submit contact
    $scope.addFormSubmit=function(){
        console.log("adding contacts....");

        //assign values
        if($scope.name){ var name=$scope.name} else {var name=null;}
        if($scope.email){ var email=$scope.email} else {var email=null;}
        if($scope.company){ var company=$scope.company} else {var company=null;}
        if($scope.mobile_phone){ var mobile_phone=$scope.mobile_phone} else {var mobile_phone=null;}
        if($scope.home_phone){ var home_phone=$scope.home_phone} else {var home_phone=null;}
        if($scope.work_phone){ var work_phone=$scope.work_phone} else {var work_phone=null;}
        if($scope.street_add){ var street_add=$scope.street_add} else {var street_add=null;}
        if($scope.city){ var city=$scope.city} else {var city=null;}
        if($scope.state){ var state=$scope.state} else {var state=null;}
        if($scope.zipcode){ var zipcode=$scope.zipcode} else {var zipcode=null;}

        //build objects
        $scope.contacts.$add({
             name: name,
             email: email,
             company:company,
             phones:[
             {
                mobile: mobile_phone,
                home: home_phone,
                work: work_phone
             }

             ],
             address: [{
                   street_address: street_add,
                   city: city,
                   state: state,
                   zipcode: zipcode
             }
             ]
        }).then(function(ref){
            var id= ref.key();
            console.log("add contact with ID"+id);
            //clear form
            clearFields();

            //hide form
            $scope.addFormShow=false;

            //send msg to user

            $scope.msg='Contact Added';

        });
    }
    
    $scope.showContact=function(curcontact){
        console.log("getting contact");
        $scope.name=curcontact.name;
        $scope.email=curcontact.email;
        $scope.company=curcontact.company;
        $scope.work_phone=curcontact.phones[0].work;
        $scope.home_phone=curcontact.phones[0].home;
        $scope.mobile_phone=curcontact.phones[0].mobile;
        $scope.street_add=curcontact.address[0].street_address;
        $scope.city=curcontact.address[0].city;
        $scope.state=curcontact.address[0].state;
        $scope.zipcode=curcontact.address[0].zipcode;

        $scope.contactShow=true;
    }
    var clearFields=function(){
        console.log("clear fields....");
         $scope.name='';
        $scope.email='';
        $scope.company='';
        $scope.mobile_phone='';
        $scope.home_phone='';
        $scope.work_phone='';
        $scope.street_add='';
        $scope.city='';
        $scope.state='';
        $scope.zipcode='';

    }
}]);