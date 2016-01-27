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
                template: '<hi name="\'Bob\'"></hi>'
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

    controller.$inject = ['$scope', 'survey', 'prompt'];
    function controller($scope, survey, prompt) {
        $scope.survey = survey;

        $scope.sayHi = sayHi;
        $scope.sayHi1 = sayHi1;
        $scope.sayHi2 = sayHi2;

        function sayHi() {
            alert('Hi to you ' + $scope.name + '! Give me ' + survey.getTotalNumber() + '!');
        }

        function sayHi1() {
            return 'Hi Maria!';
        }

        function sayHi2() {
            //ask the user for a string
          prompt({
            title: 'Give me a name',
            message: 'What would you like to name it?',
            input: true,
            label: 'Name',
            value: ''
          }).then(function(name){
            //the promise is resolved with the user input
            console.log('and the name is ', name);
          }); 
        }
    }

}(angular));