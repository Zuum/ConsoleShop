/**
 * Created by d1m4o on 27.04.17.
 */
'use strict';

angular.module('core')
    .factory('NavBar', ['Restangular', 'ServiceHelper', function (Restangular, ServiceHelper) {
        var route = 'nav-bar',
            fields = [
                { name: 'link' },
                { name: 'name' }
            ];

        return ServiceHelper.createRestfulResource(route, fields);
    }]);