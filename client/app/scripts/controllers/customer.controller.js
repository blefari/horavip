'use strict';

angular.module('beautyApp')
  .controller('CustomerCtrl', function ($scope, $auth, $modal, $state, CustomerService) {

    $auth.validateUser().catch(function () {
      $state.go('login');
    });

    CustomerService.list().success(function(result) {
      $scope.customers = result;
      console.log(result);
    });

    $scope.createCustomer = function(customer) {
      CustomerService.create(customer).success(function(result) {

        if($scope.customers === undefined) {
          $scope.customers = [];
        }
        $scope.customers.push(result);
      });
    };

    $scope.editCustomer = function(customer) {
      CustomerService.update(customer);//todo: do something
    };

    $scope.removeCustomer = function(customer) {
      CustomerService.remove(customer);//todo: do something
    };



  });
