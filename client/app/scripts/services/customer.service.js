'use strict';

angular.module('beautyApp')
  .service('CustomerService', function ($http, ENV) {

    var base = ENV.apiEndpoint + '/api/v1/customer';

    this.list = function(){
      return $http.get(base);
    };

    this.create = function(customer) {
      return $http.post(base, {
        customer: customer
      });
    };

    this.remove = function(customer) {
      return $http.delete(base + '/' + customer.id);
    };

    this.update = function(customer) {
      return $http.put(base + '/' + customer.id, {
        customer: customer
      });
    };

});
