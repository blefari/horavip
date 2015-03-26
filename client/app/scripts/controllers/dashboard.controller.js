'use strict';

angular.module('beautyApp')
  .controller('DashboardCtrl', function ($scope, $auth, $modal, $state, SaleService) {

    $auth.validateUser().catch(function () {
      $state.go('login');
    });

    SaleService.list().success(function(response){
      $scope.sales = response;
      console.log(response);
    });
  });
