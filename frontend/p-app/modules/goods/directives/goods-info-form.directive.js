'use strict';

angular
  .module('goods')
  .directive('goodsInfo', ['$state', ($state) => {
    const controller = ['$scope', ($scope) => {
      const vm = $scope;
      const options = $scope.options;

      vm.goods = options.goods;

      vm.backToList = () => {
        $state.go($state.current.name.replace('info', 'list'));
      };

      vm.addBasket = (code) => {
        // сохранить заказ в сервис корзины

      }
    }];

    return {
      restrict: 'AEC',
      templateUrl: '/app-views/goods/goods-info-form.view.html',
      controller,
      scope: {
        options: '='
      }
    };
  }]);