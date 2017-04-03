'use strict';

angular.module('core').factory('ServiceHelper', ['Restangular',
  function (Restangular) {
    this.createRestfulResource = (route, fields, defaults) => {
      var restResource = Restangular.all(route);
      restResource.fields = fields;
      restResource.defaults = defaults;
      restResource.restangularizeElement = (parent, element, queryParams) => {
        Restangular.restangularizeElement(parent, element, route, queryParams);
      };
      restResource.restangularizeCollection = (parent, element, queryParams) => {
        Restangular.restangularizeCollection(parent, element, route, queryParams);
      };
      return restResource;
    };

    return this;
  }
]);
