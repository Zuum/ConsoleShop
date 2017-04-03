'use strict';

angular
  .module('core')
  .controller('SidebarController', ['$scope', '$state', ($scope, $state) => {
    let vm = $scope;
    let activeItemIndex = 0;

    vm.links = window.configData.leftSidebarItems;

    vm.active = (link) => {
      return $state.includes(link.url.replace('.list', '')) ? 'active' : '';
    };
  }]);