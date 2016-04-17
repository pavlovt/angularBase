(function (angular) {
    'use strict';

    angular.module('app', ['ui.router','ui.bootstrap'])
    .config(config)
    .run(run);

    config.$inject = ['$urlRouterProvider'];
    function config($urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
    }

    run.$inject = [];
    function run() {
        
    }

})(angular);
