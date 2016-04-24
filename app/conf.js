(function (angular) {
    'use strict';

    angular
        .module('app')
        .constant('conf', service());

    function service() {
        return {
            api: '/api/',
            get: get(),
        };

        function get() {
            return [{x:1, y:2}];
        }
    }

}(angular));