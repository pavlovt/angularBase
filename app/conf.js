(function (angular) {
    'use strict';

    angular
        .module('app')
        .constant('conf', service());

    function service() {
        return {
            // we may have different backend depending if we are on development or production enviroment
            env: 'dev',
            prod: {
                api: '/api/',
            },
            dev: {
                api: '/api/',
            },
            mock: {
                api: '/api/',
            },
            backand: {
                api: '/1/objects/',
            },
            menu: [
                {label: 'RX', state: 'rx'}, 
            ],
            get: get(),
        };

        function get() {
            return [{x:1, y:2}];
        }
    }

}(angular));

/*
var conf =  {
    env: 'dev' // or 'prod'
}
 */
