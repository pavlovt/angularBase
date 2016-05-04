(function (angular) {
    'use strict';

    angular
        .module('app')
        .factory('notify', service);

    service.$inject = ['t'];

    function service(t) {
        return {
            info: info,
            error: error,
            log: log,
            prompt: alertify.prompt,
            service: alertify
            //dialog: dialog
        };

        function info(messages, replacements) {
            showMessage('success', messages, replacements);
        }

        function error(messages, replacements) {
            showMessage('success', messages, replacements);
        }

        function log(messages, replacements) {
            showMessage('log', messages, replacements);
        }

        /**
         * Shows messages (translating them if possible)
         * @param  {string} type The messages type - 'danger' or 'success'
         * @param  {array} messages The messages to be shown - each can be translation string or real message
         * @param  {object} replacements Arguments to be replace in the translated message
         */
        function showMessage(type, messages, replacements) {
            replacements = replacements || {};

            if (!messages) return;

            if (!_.isArray(messages) && !_.isString(messages)) {
                // this may be an object - stringify it
                messages = messages + "";
            }

            if (!_.isArray(messages)) {
                messages = [messages];
            }

            var translations = t(messages, replacements);
            _.each(translations, function (translation) {
                alertify[type](translation);
            });
        }

        
    }

}(angular));