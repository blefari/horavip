'use strict';

angular.module('beautyApp')
  .controller('LoginCtrl', function ($scope, $auth, $state) {

    //$scope.login = function (loginForm) {
    //  $auth.submitLogin(loginForm).then(function(response){
    //    console.log(response);
    //  }).catch(function(response) {
    //    console.log(response);
    //  });
    //};
    $auth.validateUser().then(function(){
      $state.go('home');
    });
  });
