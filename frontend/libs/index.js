'use strict';
//load libs
require('angular/angular.js');
require('lodash/dist/lodash.min.js');
require('restangular/dist/restangular.js');
require('angular-ui-router/release/angular-ui-router.min.js');
require('angular-animate/angular-animate.min.js');
require('angular-breadcrumb/dist/angular-breadcrumb.min.js');
require('angular-xeditable/dist/js/xeditable.min.js');
require('angular-smart-table/dist/smart-table.min.js');
require('angular-ui-notification/dist/angular-ui-notification.min.js');
require('ng-dialog/js/ngDialog.min.js');
require('angular-bootstrap-grid-tree/src/tree-grid-directive.js');
require('angular-ui-select/dist/select.min.js');
window.Cookies = require('js-cookie/src/js.cookie.js');
window.jQuery = window.$ = require('jquery/dist/jquery.min.js');
require('bootstrap/dist/js/bootstrap.min.js');

// nice scroll libs
/*var wow = require('wow/dist/wow.min.js');
var nicescroll = require('jquery.nicescroll/dist/jquery.nicescroll.min.js');
// init wow
new wow.WOW().init();
// init nice scroll
window.$(document).ready(
    function() {
        window.$("html").niceScroll({cursorcolor:"#000"});
    }
);*/