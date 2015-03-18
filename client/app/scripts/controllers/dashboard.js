'use strict';

angular.module('beautyApp')
  .controller('DashboardCtrl', function ($scope, $auth, $modal, $state) {

    $auth.validateUser().catch(function () {
      $state.go('login');
    });

  });
