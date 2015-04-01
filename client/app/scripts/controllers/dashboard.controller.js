'use strict';

angular.module('beautyApp')
  .controller('DashboardCtrl', function ($scope, $auth, $modal, $state, CurrentSaleService, CustomerService, ProductService, ProfessionalService) {

    $auth.validateUser().catch(function () {
      $state.go('login');
    });

    function calculateTotal(currentSale) {
      var total = currentSale.sale.sale_items.sum(function(item){
        return parseFloat(item.product.price);
      });
      currentSale.total = total;
      return currentSale;
    }

    CurrentSaleService.list().success(function(response){
      $scope.currentSales = response.map(function(currentSale){
        return calculateTotal(currentSale);
      });

      console.log($scope.currentSales);
    });

    CustomerService.list().success(function(response){
      $scope.customers = response;
    });

    ProductService.list().success(function(response) {
      $scope.products = response;
    });

    ProfessionalService.list().success(function(response) {
      $scope.professionals = response;
    });

    $scope.createCurrentSale = function() {
      CurrentSaleService.create($scope.customer).success(function(response){
        response.total = 0;
        $scope.currentSales.push(response);
      }).error(function(response){
        console.log(response);
      });
    };

    $scope.addProduct = function() {
      var productId = $scope.product ? $scope.product.id : undefined;
      var professionalId = $scope.professional ? $scope.professional.id : undefined;
      CurrentSaleService.addProduct($scope.currentSale, productId, professionalId).success(function(response) {
        $scope.currentSale = calculateTotal(response);
        if(!$scope.$$phase){
          $scope.$digest();
        }
      });
    };

    $scope.removeProduct = function(productId){
      CurrentSaleService.removeProduct(productId).success(function(response) {
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
