(function (angular) {
    'use strict';

    angular
        .module('app')
        .factory('mocks', service);

    service.$inject = ['$http', '$httpBackend', 'conf', 'mockData'];

    function service($http, $httpBackend, conf, mockData) {
        // allowes to use regular expression when matching url
        function rx(regexp, exclude) {

            return {
                test: function(url) {
                    // do not add the api url on resources starting with dot e.g. ./states/*
                    var tstUrl = regexp[0] === '.' ? regexp : conf[conf.env].api + regexp
                    this.matches = url.match(tstUrl);

                    // check if we should exclude this url
                    var found = false, match;
                    exclude && _.each(exclude, function (ex) {
                        match = url.match(ex);
                        found = match && match.length > 0;

                        if (found) {
                            return false;
                        }
                    });

                    // exclude the url
                    if (found) {
                        return false;
                    }

                    return this.matches && this.matches.length > 0;
                }
            };
        };

        /**
         * Mocked apis
         */
        // allow all except users 
        $httpBackend.whenGET(rx('.*', ['users']))
                .passThrough();

        // mock users
        $httpBackend.whenGET(rx('users'))
            .respond(mockData.users);


        return {};
    }

}(angular));