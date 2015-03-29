'use strict';

angular.module('beautyApp')
  .service('CurrentSaleService', function ($http, ENV) {

    var base = ENV.apiEndpoint + '/api/v1/sale/current';

    this.list = function(){
      return $http.get(base);
    };

    this.create = function(sale) {
      return $http.post(base, {
        sale: sale
      });
    };

    this.remove = function(sale) {
      return $http.delete(base + '/' + sale.id);
    };

    this.update = function(sale) {
      return $http.put(base + '/' + sale.id, {
        sale: sale
      });
    };

  });
