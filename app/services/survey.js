(function (angular) {
    'use strict';

    angular
        .module('app')
        .factory('survey', service);

    service.$inject = ['$http'];

    function service($http) {
        return {
            getSurveyList: get,
            get: get,
            getTotalNumber: getTotalNumber,
            getSurveyListLimit: getSurveyListLimit
        };

        function get() {
            return [{x:1, y:2}];
        }

        function getTotalNumber() {
            return 5;
        }

        function getSurveyListLimit() {
            return 5;
        }
    }

}(angular));