(function (angular) {
    'use strict';

    /**
     * Translation serviice wrapper
     * this allowes us to easily use instant translation
     */
    angular
        .module('app')
        .factory('t', service);

    service.$inject = ['$translate'];

    function service($translate) {
        return translate;

        function translate(messages, replacements) {
            // if (_.isArray(messages)) messages = _.unique(messages);
            var res = $translate.instant(messages, replacements);
            // the instant function returns the result as and object $translate.instant(['qq', 'zz']) => {'qq': 'qq translation', 'zz': 'zz translation'}
            // and we need just an array of the translations
            if (res && _.isArray(messages)) res = _.values(res);

            return res;
        }
    }

}(angular));