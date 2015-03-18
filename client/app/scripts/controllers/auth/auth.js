'use strict';

angular.module('beautyApp')
  .controller('AuthCtrl', ['$scope', '$location', '$auth', '$http', function ($scope, $location, $auth, $http) {

    $scope.handleRegBtnClick = function () {
      $auth.submitRegistration($scope.registrationForm).then(function () {
        $auth.submitLogin({ email: $scope.registrationForm.email, password: $scope.registrationForm.password });
      });
    };

    $scope.login = function (loginForm) {
      $auth.submitLogin(loginForm).then(function(response){
        console.log(response);
      }).catch(function(response) {
        console.log(response);
      });
    };
  }]);
