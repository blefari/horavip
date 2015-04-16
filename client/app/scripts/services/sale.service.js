'use strict';

angular.module('beautyApp')
  .service('SaleService', function ($http, ENV) {

    var base = ENV.apiEndpoint + '/api/v1/sale';

    this.list = function(status){
      return $http.get(base + '/' + status);
    };

    this.create = function(customer) {
      return $http.post(base, {
        customerId: customer.id
      });
    };

    this.remove = function(sale) {
      return $http.delete(base + '/' + sale.id);
    };

    this.addProduct = function(sale, productId, professionalId) {
      return $http.put(base + '/' + sale.id + '/product/', {
        productId: productId,
        professionalId: professionalId
      });
    };

    this.removeProduct = function(productId) {
      return $http.delete(base + '/product/' + productId);
    };

    this.complete = function(sale){
      return $http.put(base + '/' + sale.id + '/complete', {
        paymentMethod: sale.paymentMethod
      });
    };
  });
