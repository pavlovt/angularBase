(function (angular) {
    'use strict';

    angular
        .module('app')
        .directive('extInput', directive);

    function directive() {
        var directive = {
            templateUrl: './components/form/input/input.html',
            restrict: 'E',
            require: '?^^form',
            compile: compile,
            replace: false,
        };

        return directive;
    }

    function compile(el, attrs) {
        var excludedAttrs = ['class'],
            input = el.find('input'),
            label = el.find('label'),
            attrNames = _(attrs).keys().filter(function (val) { return val.indexOf('$') === -1;}).value();

        _.each(attrNames, function (attr) {
            if (!_.includes(excludedAttrs, attr)) {
                input.attr(_.kebabCase(attr), attrs[attr]);
                el.removeAttr(attr);
            }
        });

        if (attrs.label) label.html(attrs.label);

        return link;
    }

    function link($scope, el, attrs, form) {
        // console.log($scope, el, attrs, form);
        // $scope.label = attrs['label'] || '';
    }



}(angular));

/*
    <ext-input name="q" ng-model="vm.q" class="..." i-class="...."></ext-input>

 */