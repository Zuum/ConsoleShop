'use strict';

const PER_PAGE = 9;

angular
    .module('goods')
    .controller('ClocksListController', ['$scope', 'Goods', 'Restangular', ($scope, Goods, Restangular) => {
      $scope.dirOptions = {
        goodsType: 'clocks',
        perPage: PER_PAGE,
        dataSource: Goods,
        columns: [
          { name: 'name', title: 'Название' },
          { name: 'price', title: 'Адрес' },
          { name: 'imagePath', title: 'Email'},
          { name: 'url', title: 'Сайт', content: 'link' }
          ]
      };
    }]);
