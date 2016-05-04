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

    controller.$inject = ['$scope', 'api', '$stateParams', 'notify', '$state'];
    function controller($scope, api, $stateParams, notify, $state) {
        $scope.vm = {
            data: {},
            save: save
        };
        var vm = $scope.vm;

        api
        .get('/be/users/' + $stateParams.id)
        .then(function (res) {
            _.assign(vm.data, res.data);
        })

        function save() {
            if (vm.data.id) {
                api
                .put('/be/users/' + $stateParams.id, vm.data)
                .then(function (res) {
                    notify.info("The record is updated");
                    $state.go('users');
                })
            } else {
                api
                .post('/be/users/' + $stateParams.id, vm.data)
                .then(function (res) {
                    notify.info("The record is created");
                    $state.go('users');
                })
            }
        }

    }

}(angular));