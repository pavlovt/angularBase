(function (angular) {
    'use strict';

    angular
        .module('app')
        .factory('mocks', service);

    service.$inject = ['$http', '$httpBackend', 'conf', 'mockData'];

    function service($http, $httpBackend, conf, mockData) {
        // allowes to use regular expression when matching url
        function rx(regexp) {
            return {
                test: function(url) {
                    // do not add the api url on resources starting with dot e.g. ./states/*
                    var tstUrl = regexp[0] === '.' ? regexp : conf.api + regexp
                    this.matches = url.match(tstUrl);
                    // console.log('url', url, conf.api + regexp, this.matches && this.matches.length);
                    return this.matches && this.matches.length > 0;
                }
            };
        };

        /**
         * Mocked apis
         */
        // Account confuration
        $httpBackend.whenGET(rx('users'))
            .respond(mockData.users);

        /**
         * Real apis
         */
        // do not mock the htmls and other state resources
        $httpBackend.whenGET(rx('\./*'))
                .passThrough();

        $httpBackend.whenGET(rx('.*backand\.com.*'))
                .passThrough();
        $httpBackend.whenPOST(rx('.*backand\.com.*'))
                .passThrough();
        $httpBackend.whenPUT(rx('.*backand\.com.*'))
                .passThrough();
        $httpBackend.whenDELETE(rx('.*backand\.com.*'))
                .passThrough();


        return {};
    }

}(angular));