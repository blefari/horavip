'use strict';

angular.module('beautyApp')
  .controller('ProductCtrl', function ($scope, $auth, $modal, $state, ProductService) {

    $auth.validateUser().catch(function () {
      $state.go('login');
    });

    ProductService.list().success(function(result) {
      $scope.products = result;
    });

    $scope.updateProducts = function(product) {
      if($scope.products === undefined) {
        $scope.products = [];
      }
      var cIndex  = $scope.products.findIndex(function(c) {
        return c.id === product.id;
      });
      if(cIndex > -1) {
        $scope.products[cIndex] = product;
      } else {
        $scope.products.push(product);
      }
    };

    $scope.removeProduct = function(product) {
      ProductService.remove(product).success($scope.updateProducts);//todo: do something
    };

    $scope.productModal = function(editMode, product) {
      var modal = $modal.open({
        templateUrl: 'views/products/productModal.html',
        controller: 'ProductModalCtrl',
        size: 'sm',
        resolve: {
          editMode: function(){
            return editMode;
          },
          product: function(){
            return angular.copy(product);
          }
        }
      });

      modal.result.then($scope.updateProducts, function(){
        console.log('modal.dismiss');
      });
    };
  })
  .controller('ProductModalCtrl', function($scope, $modalInstance, ProductService, editMode, product){
    $scope.editing = editMode;
    $scope.product = product;

    $scope.close = function(){
      $modalInstance.dismiss();
    };

    $scope.save = function(){
      ProductService.create($scope.product).success(function(result) {
        $modalInstance.close(result);
      })//todo: do something on error;
    };

    $scope.update = function() {
      ProductService.update($scope.product).success(function(result){
        $modalInstance.close(result);
      });//todo: do something
    };
  });
