(function (angular) {
    'use strict';

    angular
        .module('app')
        .constant('conf', service());

    function service() {
        return {
            mock: {
                api: '/api/',
            },
            dev: {
                api: '/api/',
            },
            mock: {
                api: '/api/',
            },
            backand: {
                api: '/api/',
            },
            menu: [
                {label: 'HOME', state: 'home'}, 
                {label: 'NEWS', state: 'news'}, 
                {label: 'HOW TO PLAY', state: 'howto'}, 
                {label: 'FAQ', state: 'faq'}, 
                {label: 'TERMS AND CONDITIONS', state: 'terms'}, 
                {label: 'ABOUT US', state: 'about'}, 
                {label: 'CONTACT US', state: 'contact'}
            ],
            get: get(),
        };

        function get() {
            return [{x:1, y:2}];
        }
    }

}(angular));