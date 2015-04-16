'use strict';

angular.module('beautyApp')
  .controller('DashboardCtrl', function ($scope, $auth, $modal, $state, SaleService, CustomerService, ProductService, ProfessionalService) {

    $auth.validateUser().catch(function () {
      $state.go('login');
    });

    function calculateTotal(sale) {
      var total = sale.sale_items.sum(function(item){
        return parseFloat(item.product.price);
      });
      sale.total = total;
      return sale;
    }

    SaleService.list('ONGOING').success(function(response){
      $scope.currentSales = response.map(function(currentSale){
        return calculateTotal(currentSale);
      });
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
      SaleService.create($scope.customer).success(function(response){
        response.total = 0;
        $scope.currentSales.push(response);
      }).error(function(response){
        console.log(response);
      });
    };

    $scope.removeCurrentSale = function(currentSale) {
      SaleService.remove(currentSale).success(function(response){
        $scope.currentSales.remove(response);
      }).error(function(response){
        console.log(response);
      });
    };

    $scope.addProduct = function() {
      var productId = $scope.product ? $scope.product.id : undefined;
      var professionalId = $scope.professional ? $scope.professional.id : undefined;
      SaleService.addProduct($scope.currentSale, productId, professionalId).success(function(response) {
        $scope.currentSale.sale_items.push(response);
        calculateTotal($scope.currentSale);
        $scope.product = undefined;
        $scope.professional = undefined;
      });
    };

    $scope.removeProduct = function(productId){
      SaleService.removeProduct(productId).success(function(response) {
        $scope.currentSale.sale_items.remove(function(item){
          return item.id === response.id;
        });
        calculateTotal($scope.currentSale);
      });
    };

    $scope.checkout = function() {
      var modal = $modal.open({
        templateUrl: 'views/dashboard/checkoutModal.html',
        controller: 'CheckoutModalCtrl',
        size: 'lg',
        resolve: {
          currentSale: function(){
            return $scope.currentSale;
          }
        }
      });

      modal.result.then(function(){}, function(){
        console.log('modal.dismiss');
      });
    };

    $scope.selectCurrentSale = function(currentSale){
      $scope.currentSale = currentSale;
    };

    $scope.clearCurrentSale = function(){
      $scope.currentSale = undefined;
    };
  })
  .controller('CheckoutModalCtrl', function($scope, $modalInstance, SaleService, currentSale){
    $scope.currentSale = currentSale;

    $scope.close = function(){
      $modalInstance.dismiss();
    };
  });
