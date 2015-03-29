'use strict';

angular.module('beautyApp')
  .controller('DashboardCtrl', function ($scope, $auth, $modal, $state, CurrentSaleService, CustomerService) {

    $auth.validateUser().catch(function () {
      $state.go('login');
    });

    CurrentSaleService.list().success(function(response){
      $scope.currentSales = response.map(function(currentSale){
        var total = currentSale.sale.sale_items.sum(function(item){
          return item.product.price;
        });
        currentSale.total = total;
        return currentSale;
      });

      console.log($scope.currentSales);
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
  .controller('SaleModalCtrl', function($scope, $modalInstance, CurrentSaleService, customers){
    $scope.customers = customers;
//    $scope.tabs = [
//      {heading: 'Selecionar', content: 'views/dashboard/selectCustomer.html'},
//      {heading: 'Cadastrar', content: 'views/dashboard/createCustomer.html'}
//    ];

    $scope.close = function() {
      $modalInstance.dismiss();
    };

    $scope.save = function(){
      CurrentSaleService.create({

      })
    };

  });
