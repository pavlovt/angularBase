(function (angular) {
    'use strict';

    angular
        .module('app')
        .directive('usersState', directive)
        .config(config);

    config.$inject = ['$stateProvider'];
    function config($stateProvider) {
        $stateProvider
            .state('users', {
                url: '/users',
                title: 'Users',
                template: '<users-state></users-state>'
            });
    }

    function directive() {
        var directive = {
            templateUrl: './states/users/users.html',
            restrict: 'E',
            controller: controller,
            scope: {}
        };

        return directive;
    }

    controller.$inject = ['$scope', 'conf', 'DTOptionsBuilder', 'api'];
    function controller($scope, conf, DTOptionsBuilder, api) {
        $scope.vm = {dtOptions: {}, dtInstance: {}};

        $scope.vm.dtOptions = {
            /*ajax: { 
                url: conf.api + 'users',
                dataSrc: ''
            },*/
            ajax: function(data, callback, settings) {
                return api
                    .get('users')
                    .then(function (res) {
                        callback(res.data);
                    });
            }
        };

        /*$scope.vm.dtOptions = DTOptionsBuilder.fromFnPromise(function() {
            return api.get('users');
        }).withPaginationType('full_numbers');*/

        $scope.vm.dtColumns = [
            {data: 'first_name', title: 'First Name'},
            {data: 'last_name', title: 'Last Name'},
            {data: 'email', title: 'Email'},
            {data: 'gender', title: 'Gender'},
            {data: 'date', title: 'Birth Date'},
        ]
    }

}(angular));