(function (angular) {
    'use strict';

    angular
        .module('app')
        .directive('homeState', directive)
        .config(config);

    config.$inject = ['$stateProvider'];
    function config($stateProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                title: 'Home',
                template: '<home-state></home-state>'
            });
    }

    function directive() {
        var directive = {
            templateUrl: './states/home/home.html',
            restrict: 'E',
            controller: controller,
            scope: {}
        };

        return directive;
    }

    controller.$inject = ['$scope', '$rootScope', 'api'];
    function controller($scope, $rootScope, api) {
        api
        .get('users')
        .then(function (res) {
            console.log(res.data);
        });

        $(document).ready(function() {
            $('#example').DataTable();
        });
    }

}(angular));