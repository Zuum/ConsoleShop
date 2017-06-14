'use strict';

const PER_PAGE = 9;

angular
  .module('goods')
  .controller('ChemistryListController', ['$scope', 'Goods', 'Restangular', ($scope, Goods, Restangular) => {
    $scope.dirOptions = {
      goodsType: 'chemistry',
      perPage: PER_PAGE,
      dataSource: Goods
    };
  }]);
