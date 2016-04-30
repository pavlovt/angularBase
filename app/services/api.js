(function (angular) {
    'use strict';

    angular
        .module('app')
        .factory('api', service);

    service.$inject = ['$http', 'conf', '$rootScope', '$q', 'Backand'];

    function service($http, conf, $rootScope, $q, Backand) {
        return {
            get: get,
            post: post,
            put: put,
            del: del
        };

        
        var scope = $rootScope.$new();

        //number of pending http calls
        var callCount = 0;

        // format the url depending on the backend used: let's say that we want to get the users api
        // - /rb/users - redirect to the real backend
        // - /be/users - redirect to the backand.com
        // - users - redirect to the local mocks
        function url(url) {
            if (url.match('/be/')) {
                url = Backand.getApiUrl() + conf.backand.api + url.replace('/be/', '');
            } else {
                url = conf[conf.env].api + url.replace('/rb/', '');
            }

            return url;
        };

        function http(uri, method, args, headers, httpOptions) {
            startSpinner();
            headers = headers || {};
            var addHeaders = {
                "Content-Type": "application/json",
                Authorization: undefined
            };

            // we want the possible headers to be able to replace addHeaders
            headers = _.extend(addHeaders, headers);

            // Attach authorization token, if available.
            if (conf.user && conf.user.token) {
                headers.Authorization = 'Bearer ' + conf.user.token;
            }

            var addHttpOptions = {
                method: method,
                url: url(uri),
                headers: headers,
                data: args
            };

            httpOptions = httpOptions || {};

            // we want the possible httpOptions to be able to replace addHttpOptions
            httpOptions = _.extend(addHttpOptions, httpOptions);

            var defer = $q.defer();
            $http(httpOptions)
                .then(handleSoftError)
                .then((res) => {
                    return defer.resolve(transformResponse(res));
                }, (error) => {
                    handleCriticalError(error);
                    return defer.reject(error);
                }).finally(() => {
                    callCount--;
                    if (callCount === 0) {
                        $(".spinner").css("display", "none");
                        kendo.ui.progress($("#loading"), false);
                    }
                });

            return defer.promise;
        };

        function get(url, args, headers, httpOptions) {
            return http(url, 'GET', args, headers, httpOptions);
        };

        function post(url, args, headers, httpOptions) {
            return http(url, 'POST', args, headers, httpOptions);
        };
        function put(url, args, headers, httpOptions) {
            return http(url, 'PUT', args, headers, httpOptions);
        };
        function del(url, args, headers, httpOptions) {
            return http(url, 'DELETE', args, headers, httpOptions);
        };

        function handleSoftError(res) {
            if (res.status < 200 || res.status > 299) {
                // TODO: What message shoud be desplayed?
                scope.$emit("alertMessage", { title: 'Warrning', content: '', type: 'error' });
                console.log(res);
            }
            return res;
        };

        function handleCriticalError(error) {
            // scope.$emit("alertMessage", { title: 'Server error', content: '', type: 'error' });
            console.log('Server error: ', error);
            return {};
        };

        //starts loading animation    
        function startSpinner() {
            /*if (callCount === 0) {
                $(".spinner").css("display", "block");
                kendo.ui.progress($("#loading"), true);
            }
            callCount++;*/
        };

        // transfer data depending on the backend it is comming from
        function transformResponse(res) {
            if (res.config.url.match('backand.com') && res.data && res.data.data) {
                res.data = res.data.data;
            }

            return res;
        }
    }

}(angular));
