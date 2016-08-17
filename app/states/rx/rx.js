(function (angular) {
    'use strict';

    angular
        .module('app')
        .directive('rx', directive)
        .config(config);

    config.$inject = ['$stateProvider'];
    function config($stateProvider) {
        $stateProvider
            .state('rx', {
                url: '/rx',
                template: '<rx></rx>',
                params: {site: ''}
            });
    }

    function directive() {
        var directive = {
            templateUrl: './states/rx/rx.html',
            restrict: 'E',
            controller: controller,
            scope: {
                name: '='
            }
        };

        return directive;
    }

    controller.$inject = ['$scope'];
    function controller($scope) {
        $scope.vm = {

        };
        var vm = $scope.vm;

        
    }

}(angular));