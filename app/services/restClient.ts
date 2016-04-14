module Diplomat.Networking {
    interface Window{
        error: any;
    }

    export interface RestClientServiceInterface {
        url: Function,
        get: Function,
        post: Function,
        put: Function,
        del: Function,
        http: Function,
        handleSoftError: Function,
        handleCriticalError: Function
    }

    class Service implements RestClientServiceInterface {

        url: Function;
        get: Function;
        post: Function;
        put: Function;
        del: Function;
        http: Function;
        handleSoftError: Function;
        handleCriticalError: Function;

        static $inject: string[] = ['$http', 'config', "$rootScope", "$q"];

        constructor($http, config, $rootScope, $q) {

            let scope = $rootScope.$new();

            //number of pending http calls
            let callCount = 0;

            //starts loading animation    
            let startSpinner = function() {
                if (callCount === 0) {
                    $(".spinner").css("display", "block");
                    kendo.ui.progress($("#loading"), true);
                }
                callCount++;
            };

            this.url = (url) => {
                return config.webApi + url;
            };

            this.http = (uri, method, args, headers, httpOptions) => {
                startSpinner();
                headers = headers || {};
                let addHeaders = {
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

                let addHttpOptions = {
                    method: method,
                    url: this.url(uri),
                    headers: headers,
                    data: args
                };

                httpOptions = httpOptions || {};

                // we want the possible httpOptions to be able to replace addHttpOptions
                httpOptions = _.extend(addHttpOptions, httpOptions);

                let defer = $q.defer();
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

            this.get = (url, args, headers, httpOptions) => {
                return this.http(url, 'GET', args, headers, httpOptions);
            };

            this.post = (url, args, headers, httpOptions) => {
                return this.http(url, 'POST', args, headers, httpOptions);
            };
            this.put = (url, args, headers, httpOptions) => {
                return this.http(url, 'PUT', args, headers, httpOptions);
            };
            this.del = (url, args, headers, httpOptions) => {
                return this.http(url, 'DELETE', args, headers, httpOptions);
            };

            this.handleSoftError = (res) => {
                if (res.status < 200 || res.status > 299) {
                    // TODO: What message shoud be desplayed?
                    scope.$emit("alertMessage", { title: 'Warrning', content: '', type: 'error' });
                    console.log(res);
                }
                return res;
            };

            this.handleCriticalError = (error) => {
                var message = "URL:"+ error.config.url +" Status:"+ error.data.status || error.data.message + " Method: " + error.config.method || error.data.messageDetails + " Payload: " +JSON.stringify(error.config.data);
                var errorData = { level: "5", message: message + " " + error.data.stackTrace  };
                window.errors.push(errorData);
                scope.$emit("alertMessage", { title: 'Server error', content: '', type: 'error' });
                console.log('Server error: ', error);
                return {};
            };

        }

    }

    // Register factory.
    export class RestClient {
        app: ng.IModule;

        constructor() {
            this.app = angular.module("Diplomat.Networking");
            this.app.service("restClient", Service);
        }
    }

}

// Instantiate the service.
new Diplomat.Networking.RestClient();