'use strict';

angular
  .module('goods')
  .directive('goodsList', [ '$state', ($state) => {
    const controller = ['$scope', 'Restangular', ($scope, Restangular) => {
      const options = $scope.options;
      const PER_PAGE = options.perPage;
      const DataSource = options.dataSource;

      let vm = $scope;
      let QTY = PER_PAGE;

      // paging options
      vm.currentPage = 1;
      vm.rows = [[],[],[]];

      const div = (val, by) => {
        return (val - val % by) / by;
      };

      // get items list
      const loadList = () => {
        const query = _.assign({
          goodsType: options.goodsType,
          skip: (vm.currentPage - 1) * PER_PAGE,
          limit: PER_PAGE
        }, vm.query);
        DataSource
          .getList(query)
          .then((list) => {
            vm.list = list;
            for(let i = 0; i < div(list.length, 3); i++){
              for(let j = 0; j < 3; j++){
                if (list[i*3 + j]){
                  vm.rows[i][j] = list[i*3 + j];
                }
                else{
                  break;
                }
              }
            }
          })
          .catch(err => {
            console.log(err);
          })
      };
      // get items qty
      const loadQty = () => {
        const query = _.assign({ type: options.goodsType }, vm.query);
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
          loadList();
        }
      };

      vm.back = () => {
        if (!vm.backButtonState()) {
          vm.currentPage = --vm.currentPage < 1 ? 0 : vm.currentPage;
          loadList();
        }
      };

      /*vm.search = () => {
        search = "" + vm.ask.toLowerCase().replace(/([ .,;]+)/g, '§sep§').split('§sep§').filter(v => v !== '');
        loadList();
        loadQty();
      };

      vm.enterButtonForSearch = ($event) => {
        if ($event.keyCode == 13) vm.search();
      };
      */
      loadList();
      loadQty();
    }];

    return {
      restrict: 'AEC',
      templateUrl: '/app-views/goods/goods-list-form.view.html',
      controller,
      scope: {
        options: '='
      }
    };
  }]);