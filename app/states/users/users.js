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

    controller.$inject = ['$scope', 'conf', '$compile', 'api', '$state'];
    function controller($scope, conf, $compile, api, $state) {
        $scope.vm = {
            users : [],
            dtInstance: {},
            edit: edit,
            del: del
        };

        $scope.vm.dtOptions = {
            /*ajax: { 
                url: conf.api + 'users',
                dataSrc: ''
            },*/
            ajax: function(data, callback, settings) {
                return api
                    .get('/be/users')
                    .then(function (res) {
                        $scope.vm.users = res.data;
                        callback(res.data);
                    });
            },
            createdRow: createdRow
        };

        /*$scope.vm.dtOptions = DTOptionsBuilder.fromFnPromise(function() {
            return api.get('users');
        }).withPaginationType('full_numbers');*/

        $scope.vm.dtColumns = [
            {data: 'firstName', title: 'First Name'},
            {data: 'lastName', title: 'Last Name'},
            {data: 'email', title: 'Email'},
            {data: 'gender', title: 'Gender'},
            {data: '', render: function ( data, type, row, meta ) {
                return  '<action class="btn btn-primary" click="vm.edit" data="' + row.id + '"><i class="fa fa-edit"></i></action>&nbsp;' +
                        '<action class="btn btn-danger" click="vm.delete" data="' + row.id + '"><i class="fa fa-trash-o"></i></action>&nbsp;';
            }},
        ]

        function createdRow(row, data, dataIndex) {
            // Recompiling so we can bind Angular directive to the DT
            $compile(angular.element(row).contents())($scope);
        }

        function edit(id) {
            $state.go('users-edit', {id:id});
        }

        function del(id) {
            alert(id);
            $scope.vm.dtInstance.reloadData();
        }
    }

}(angular));