'use strict';

angular.module('goods')
  .factory('Goods', ['Restangular', 'ServiceHelper', function (Restangular, ServiceHelper) {
    var route = 'goods',
      fields = [
        { name: 'link' },
        { name: 'text' },
        { name: 'position' }
      ];

    return ServiceHelper.createRestfulResource(route, fields);
  }]);