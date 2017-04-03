'use strict';

angular.module('core')
  .factory('FooterLinks', ['Restangular', 'ServiceHelper', function (Restangular, ServiceHelper) {
    var route = 'footer-links',
      fields = [
        { name: 'link' },
        { name: 'text' },
        { name: 'position' }
      ];

    return ServiceHelper.createRestfulResource(route, fields);
  }]);