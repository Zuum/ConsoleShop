'use strict';

angular
  .module('core')
  .directive('pageSelect', function() {
    return {
      restrict: 'E',
      templateUrl: '/app-views/core/page-select.directive.html',
      link: function(scope, element, attrs) {
        scope.$watch('currentPage', function(c) {
          scope.inputPage = c;
        });
      }
    }
  });