(function (angular) {
    'use strict';

    angular
        .module('app')
        .directive('newsState', directive)
        .config(config);

    config.$inject = ['$stateProvider'];
    function config($stateProvider) {
        $stateProvider
            .state('news', {
                url: '/news',
                title: 'news',
                template: '<news-state></news-state>'
            });
    }

    function directive() {
        var directive = {
            templateUrl: './states/news/news.html',
            restrict: 'E',
            controller: controller,
            scope: {}
        };

        return directive;
    }

    controller.$inject = ['$scope', 'api'];
    function controller($scope, api) {

    }

}(angular));