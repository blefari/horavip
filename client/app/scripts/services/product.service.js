'use strict';

angular.module('beautyApp')
  .service('ProductService', function ($http, ENV) {

    var base = ENV.apiEndpoint + '/api/v1/product';

    this.list = function(){
      return $http.get(base);
    };

    this.create = function(product) {
      return $http.post(base, {
        product: product
      });
    };

    this.remove = function(product) {
      return $http.delete(base + '/' + product.id);
    };

    this.update = function(product) {
      return $http.put(base + '/' + product.id, {
        product: product
      });
    };

  });
