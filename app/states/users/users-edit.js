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
                url: '/users-edit/:id',
                title: 'Edit User',
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

    controller.$inject = ['$scope', 'api', '$stateParams'];
    function controller($scope, api, $stateParams) {
        $scope.vm = {
            user: {}
        };
        var vm = $scope.vm;

        api
        .get('/be/users/' + $stateParams.id)
        .then(function (res) {
            _.assign(vm.user, res.data);
        })

    }

}(angular));