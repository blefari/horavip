'use strict';

angular.module('beautyApp')
  .controller('FooterCtrl', ['$scope', function ($scope) {
    $scope.template = '/views/common/footer.html';
  }]);
