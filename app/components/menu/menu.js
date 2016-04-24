(function (angular) {
    'use strict';

    angular
        .module('app')
        .directive('menu', directive);

    function directive() {
        var directive = {
            templateUrl: './components/menu/menu.html',
            restrict: 'E',
            controller: controller,
            scope: {}
        };

        return directive;
    }

    controller.$inject = ['$scope', 'conf'];
    function controller($scope, conf) {
        console.log($scope.conf);
    }

}(angular));