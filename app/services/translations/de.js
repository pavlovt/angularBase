(function (angular) {
    'use strict';

    /**
     * Contains german translations
     */
    angular
        .module('app')
        .constant('translationDe', service());

    function service() {
        return {
            'hi there!': 'hi there! in german',
        };
    }

}(angular));

/*
var conf =  {
    env: 'dev' // or 'prod'
}
 */
