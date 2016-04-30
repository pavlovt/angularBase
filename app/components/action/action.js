(function (angular) {
    'use strict';

    angular
        .module('app')
        .directive('action', directive);

    function directive() {
        var directive = {
            templateUrl: './components/action/action.html',
            restrict: 'E',
            controller: controller,
            transclude: true,
            replace: true,
            scope: {
                click: '=',
                data: '='
            }
        };

        return directive;
    }

    controller.$inject = ['$scope', 'conf', 'DTOptionsBuilder', 'api'];
    function controller($scope, conf, DTOptionsBuilder, api) {
        
    }

}(angular));