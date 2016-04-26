(function (angular) {
    'use strict';

    angular
        .module('app')
        .directive('usersEditState', directive)
        .config(config);

    config.$inject = ['$stateProvider'];
    function config($stateProvider) {
        $stateProvider
            .state('users-edit', {
                url: '/users-edit',
                title: 'users-edit',
                template: '<users-edit-state></users-edit-state>'
            });
    }

    function directive() {
        var directive = {
            templateUrl: './states/users/users-edit.html',
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