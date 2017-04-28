'use strict';

angular.module('core')
    .factory('TopNav', ['Restangular', 'ServiceHelper', function (Restangular, ServiceHelper) {
      var route = 'top-nav',
          fields = [
            { name: 'link' },
            { name: 'name' }
          ];

      return ServiceHelper.createRestfulResource(route, fields);
    }]);