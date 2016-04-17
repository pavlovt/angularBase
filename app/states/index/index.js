(function (angular) {
    'use strict';

    angular
        .module('app')
        .directive('indexState', directive)
        .config(config);

    config.$inject = ['$stateProvider'];
    function config($stateProvider) {
        $stateProvider
            .state('index', {
                url: '/',
                template: '<index-state></index-state>'
            });
    }

    function directive() {
        var directive = {
            templateUrl: './states/index/index.html',
            restrict: 'E',
            controller: controller,
            scope: {}
        };

        return directive;
    }

    controller.$inject = ['$scope', '$rootScope'];
    function controller($scope, $rootScope) {
        $(document).ready(function() {
            $('#example').DataTable();
        });
    }

}(angular));