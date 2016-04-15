(function (angular) {
    'use strict';

    angular
        .module('app')
        .factory('api', service);

    service.$inject = ['$http', 'config', "$rootScope", "$q"];

    function service($http, config, $rootScope, $q) {
        return {
            get: get,
            post: post,
            put: put,
            del: del
        };

        
        var scope = $rootScope.$new();

        //number of pending http calls
        var callCount = 0;


        function url(url) {
            return config.webApi + url;
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
            if (config.user && config.user.token) {
                //TODO: check this out

                headers.Authorization = 'Bearer ' + config.user.token;
            }

            var addHttpOptions = {
                method: method,
                url: this.url(uri),
                headers: headers,
                data: args
            };

            httpOptions = httpOptions || {};

            // we want the possible httpOptions to be able to replace addHttpOptions
            httpOptions = _.extend(addHttpOptions, httpOptions);

            var defer = $q.defer();
            $http(httpOptions)
                .then(this.handleSoftError)
                .then((res) => {
                    return defer.resolve(res);
                }, (error) => {
                    this.handleCriticalError(error);
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
            return this.http(url, 'GET', args, headers, httpOptions);
        };

        function post(url, args, headers, httpOptions) {
            return this.http(url, 'POST', args, headers, httpOptions);
        };
        function put(url, args, headers, httpOptions) {
            return this.http(url, 'PUT', args, headers, httpOptions);
        };
        function del(url, args, headers, httpOptions) {
            return this.http(url, 'DELETE', args, headers, httpOptions);
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
            var message = "URL:"+ error.config.url +" Status:"+ error.data.status || error.data.message + " Method: " + error.config.method || error.data.messageDetails + " Payload: " +JSON.stringify(error.config.data);
            var errorData = { level: "5", message: message + " " + error.data.stackTrace  };
            window.errors.push(errorData);
            scope.$emit("alertMessage", { title: 'Server error', content: '', type: 'error' });
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
    }

}(angular));
