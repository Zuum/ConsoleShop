'use strict';

angular
  .module('core')
  .controller('TopNavController', ['$scope', 'Restangular', ($scope, Restangular) => {
    const vm = $scope;
    const token = Cookies.get('token');

    vm.user = {
      role: '1'
    };

    if (token) {
      Restangular
        .one(`whoAmI`)
        .customPOST({ token: Cookies.get('token') })
        .then((data) => {
          if (data) {
            if (data.success !== false) {
              vm.user = data;
            } else {
              console.log('Аутентификация провалена.', data.message);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }]);