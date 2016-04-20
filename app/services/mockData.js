(function (angular) {
    'use strict';

    angular
        .module('app')
        .factory('mockData', service);

    service.$inject = [];

    function service() {
        return {
            table: [
                {
                    
                }
            ]
        }
    }

}(angular));