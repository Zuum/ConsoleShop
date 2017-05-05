'use strict';

angular
  .module('goods')
  .directive('goodsList', [ '$state', ($state) => {
    const controller = ['$scope', 'Restangular', ($scope, Restangular) => {
      const options = $scope.options;
      const PER_PAGE = options.perPage;
      const DataSource = options.dataSource;
      const Qty = options.qtyGetter;

      let vm = $scope;
      let QTY = PER_PAGE;
      let search = "";
      vm.ask = "";

      vm.columns = options.columns;

      // paging options
      vm.currentPage = (currentState && currentState.page || 1);

      // search/filtering options
      vm.query = (currentState && currentState.query || {});

      // get items list
      const loadList = () => {
        const query = _.assign({
          goodsType: options.goodsType,
          skip: (vm.currentPage - 1) * PER_PAGE,
          limit: PER_PAGE,
          ask: search
        }, vm.query);
        DataSource
          .getList(query)
          .then((list) => {
            vm.list = list;
          })
          .catch(err => {
            console.log(err);
          })
      };
      // get items qty
      const loadQty = () => {
        const query = _.assign({ goodsType: options.goodsType }, { ask: search }, vm.query);
        Restangular.one('goods')
          .customGET('qty', query)
          .then((result)=> {
            QTY = result;
          })
          .catch(err => {
            console.log(err);
          });
      };

      vm.backButtonState = () => {
        return vm.currentPage == 1 ? 'disabled' : '';
      };

      vm.nextButtonState = () => {
        return vm.currentPage >= Math.ceil(QTY / PER_PAGE) && 'disabled';
      };

      vm.next = () => {
        if (!vm.nextButtonState()) {
          vm.currentPage += 1;
          if (AppState.states[currentStateName]) {
            AppState.states[currentStateName].page = vm.currentPage;
          } else {
            AppState.states[currentStateName] = {
              page: vm.currentPage
            }
          }
          loadList();
        }
      };

      vm.back = () => {
        if (!vm.backButtonState()) {
          vm.currentPage = --vm.currentPage < 1 ? 0 : vm.currentPage;
          if (AppState.states[currentStateName]) {
            AppState.states[currentStateName].page = vm.currentPage;
          } else {
            AppState.states[currentStateName] = {
              page: vm.currentPage
            }
          }
          loadList();
        }
      };

      vm.search = () => {
        search = "" + vm.ask.toLowerCase().replace(/([ .,;]+)/g, '§sep§').split('§sep§').filter(v => v !== '');
        loadList();
        loadQty();
      };

      vm.enterButtonForSearch = ($event) => {
        if ($event.keyCode == 13) vm.search();
      };

      loadList();
      loadQty();
    }];

    return {
      restrict: 'AEC',
      templateUrl: '/views/goods/goods-list-form.view.html',
      controller,
      scope: {
        options: '='
      }
    };
  }]);