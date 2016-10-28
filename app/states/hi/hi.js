(function (angular) {
    'use strict';

    angular
        .module('app')
        .directive('hi', hi)
        .config(config);

    config.$inject = ['$stateProvider'];
    function config($stateProvider) {
        $stateProvider
            .state('hi', {
                url: '/hi',
                template: '<hi name="\'Bob\'"></hi>',
                params: {site: ''}
            });
    }

    function hi() {
        var directive = {
            templateUrl: './states/hi/hi.html',
            restrict: 'E',
            controller: controller,
            scope: {
                name: '='
            }
        };

        return directive;
    }

    controller.$inject = ['$scope', 'survey', '$timeout', 'api'];
    function controller($scope, survey, $timeout, api) {
        api
        .get('users')
        .then(function (res) {
            console.log(res.data);
        });

        api
        .get('z1')
        .then(function (res) {
            console.log(res.data);
        })

        api
        .get('z2')
        .then(function (res) {
            console.log(res.data);
        })

        $scope.survey = survey;

        $scope.sayHi = sayHi;
        $scope.sayHi1 = sayHi1;
        $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };

        function sayHi() {
            alert('Hi to you ' + $scope.name + '! Give me ' + survey.getTotalNumber() + '!');
        }

        function sayHi1() {
            return 'Hi Maria!';
        }

        var map;
          function initMap() {
            console.log('qqq!');
            map = new google.maps.Map(document.getElementById('map'), {
              center: {lat: -34.397, lng: 150.644},
              zoom: 8
            });
          }

        $timeout(initMap, 2000);

    }

}(angular));