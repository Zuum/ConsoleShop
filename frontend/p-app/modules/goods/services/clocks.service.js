'use strict';

angular.module('goods')
  .factory('Clocks', ['Restangular', 'ServiceHelper', function (Restangular, ServiceHelper) {
    var route = 'clocks',
      fields = [
        { name: 'link' },
        { name: 'text' },
        { name: 'position' }
      ];

    return ServiceHelper.createRestfulResource(route, fields);
  }]);