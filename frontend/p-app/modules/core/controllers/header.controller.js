'use strict';

angular
  .module('core')
  .controller('HeaderController', ['$scope', '$state', ($scope, $state) => {
    let vm = $scope;

    vm.links = window.configData.headerItems;
    vm.active = (link) => {
      return $state.includes(link.url.replace('.main', '')) ? 'active' : '';
    };
  }]);