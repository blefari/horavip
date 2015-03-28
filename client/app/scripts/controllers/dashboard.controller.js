'use strict';

angular.module('beautyApp')
  .controller('DashboardCtrl', function ($scope, $auth, $modal, $state, SaleService, CustomerService) {

    $auth.validateUser().catch(function () {
      $state.go('login');
    });

    SaleService.list().success(function(response){
      $scope.sales = response;
      console.log(response);
    });

    var customers;
    CustomerService.list().success(function(response){
      customers = response;
    });

    function updateSales() {

    }

    $scope.customerModal = function() {
      var modal = $modal.open({
        templateUrl: 'views/dashboard/saleModal.html',
        controller: 'SaleModalCtrl',
        size: 'sm',
        resolve: {
          customers: function(){
            return customers;
          }
        }
      });

      modal.result.then(updateSales, function(){
        console.log('modal.dismiss');
      });
    };
  })
  .controller('SaleModalCtrl', function($scope, $modalInstance, SaleService, customers){
    $scope.customers = customers;
    $scope.tabs = [
      {heading: 'Selecionar', content: 'views/dashboard/selectCustomer.html'},
      {heading: 'Cadastrar', content: 'views/dashboard/createCustomer.html'}
    ];

    $scope.close = function() {
      $modalInstance.dismiss();
    };

    $scope.save = function(){

      SaleService.create({

      })
    };

  });
