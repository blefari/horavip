'use strict';

angular.module('beautyApp').service('Alert', function ($rootScope, $timeout) {
  $rootScope.alerts = [];
  var Alert = this;

  this.Success = 'success';
  this.Info = 'info';
  this.Warning = 'warning';
  this.Danger = 'danger';

  this.add = function (message, type) {
    var alert = {};
    alert.type = type || Alert.INFO;
    alert.message = message;
    alert.close = function () {
      Alert.close(alert);
    };

    $timeout(function() {
      alert.close();
    }, 5000);
    $rootScope.alerts.push(alert);
    return alert;
  };

  this.close = function (alert) {
    var index = $rootScope.alerts.indexOf(alert);
    $rootScope.alerts.splice(index, 1);
  };

});