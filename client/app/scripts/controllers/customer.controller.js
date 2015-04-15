'use strict';

angular.module('beautyApp')
  .controller('CustomerCtrl', function ($scope, $auth, $modal, $state, CustomerService) {

    $auth.validateUser().catch(function () {
      $state.go('login');
    });

    CustomerService.list().success(function(result) {
      $scope.customers = result;
    });

    function updateCustomers(customer) {
      if($scope.customers === undefined) {
        $scope.customers = [];
      }
      var cIndex  = $scope.customers.findIndex(function(c) {
        return c.id === customer.id;
      });
      if(cIndex > -1) {
        $scope.customers[cIndex] = customer;
      } else {
        $scope.customers.push(customer);
      }
    }

    $scope.removeCustomer = function(customer) {
      CustomerService.remove(customer).success(updateCustomers);//todo: do something
    };

    $scope.customerModal = function(editMode, customer) {
      var modal = $modal.open({
        templateUrl: 'views/customers/customerModal.html',
        controller: 'CustomerModalCtrl',
        size: 'sm',
        resolve: {
          editMode: function(){
            return editMode;
          },
          customer: function(){
            return angular.copy(customer);
          }
        }
      });

      modal.result.then(updateCustomers, function(){
        console.log('modal.dismiss');
      });
    };
  })
  .controller('CustomerModalCtrl', function($scope, $modalInstance, CustomerService, editMode, customer){
    $scope.editing = editMode;
    $scope.customer = customer;

    $scope.close = function(){
      $modalInstance.dismiss();
    };

    $scope.save = function(){
      CustomerService.create($scope.customer).success(function(result) {
        $modalInstance.close(result);
      });//todo: do something on error;
    };

    $scope.update = function() {
      CustomerService.update($scope.customer).success(function(result){
        $modalInstance.close(result);
      });//todo: do something
    };
  });
