(function (angular) {
    'use strict';

    angular
        .module('app')
        .factory('mocks', service);

    service.$inject = ['$http'];

    function service($http) {
        // allowes to use regular expression when matching url
        function rx(regexp) {
            return {
                test: function(url) {
                    this.matches = url.match(config.webApi + regexp);
                    // console.log('url', url, config.webApi + regexp, this.matches && this.matches.length);
                    return this.matches && this.matches.length > 0;
                }
            };
        };

        /**
         * Mocked apis
         */
        // Account configuration
        $httpBackend.whenGET(rx('account-configuration/business-units'))
            .respond(accountConfBusinessUnits());

        $httpBackend.whenGET(rx('account-configuration/groups'))
            .respond(accountConfGroups());

        /**
         * Real apis
         */
        $httpBackend.whenPOST(config.webApi + 'patient/search/benefitinvestigation')
            .passThrough();
        $httpBackend.whenGET(rx('/requests/*'))
                .passThrough();
    }

}(angular));