'use strict';

angular.module('beautyApp')
  .service('ProfessionalService', function ($http, ENV) {

    var base = ENV.apiEndpoint + '/api/v1/professional';

    this.list = function(){
      return $http.get(base);
    };

    this.create = function(professional) {
      return $http.post(base, {
        professional: professional
      });
    };

    this.remove = function(professional) {
      return $http.delete(base + '/' + professional.id);
    };

    this.update = function(professional) {
      return $http.put(base + '/' + professional.id, {
        professional: professional
      });
    };

  });
