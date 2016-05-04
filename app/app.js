(function (angular) {
    'use strict';

    angular.module('app', [
        'pascalprecht.translate',
        'ui.router',
        'ui.bootstrap',
        'angular.chosen',
        'ngMockE2E',
        'datatables',
        'backand'
    ])
    .config(config)
    .run(run);

    config.$inject = ['$urlRouterProvider', 'BackandProvider'];
    function config($urlRouterProvider, BackandProvider) {
        $urlRouterProvider.otherwise('/');

        BackandProvider.setAppName('betgame');
        BackandProvider.setSignUpToken('a9e5e2d4-df03-4fd2-9e91-a905f457e8a8');
        BackandProvider.setAnonymousToken('0a85e42b-dc7c-4f20-a23c-47480a6f88e0');
    }

    run.$inject = ['$rootScope', 'mocks', 'conf'];
    function run($rootScope, mocks, conf) {
        $rootScope.conf = conf;
    }

})(angular);