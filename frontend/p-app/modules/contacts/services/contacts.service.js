'use strict';

angular.module('contacts')
  .factory('Contacts', ['Restangular', 'ServiceHelper', function (Restangular, ServiceHelper) {
    var route = 'contacts',
      fields = [
        { name: 'contact' }
      ];

    return ServiceHelper.createRestfulResource(route, fields);
  }]);