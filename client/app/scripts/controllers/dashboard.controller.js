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

    CustomerService.list().success(function(response){
      $scope.customers = response;
    });

    $scope.createCurrentSale = function() {
      CurrentSaleService.create($scope.customer).success(function(response){
        response.total = 0;
        $scope.currentSales.push(response);
      }).error(function(response){
        console.log(response);
      });
    };

    $scope.selectCurrentSale = function(currentSale){
      $scope.currentSale = currentSale;
    };

    $scope.clearCurrentSale = function(){
      $scope.currentSale = undefined;
    };
  });
