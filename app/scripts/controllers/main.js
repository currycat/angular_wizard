'use strict';

/**
 * @ngdoc function
 * @name testApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the testApp
 */
angular.module('testApp').controller('MainCtrl', function ($scope) {

});

angular.module('testApp').controller('wizard1Ctrl', function ($scope, $window, $log) {

  $scope.wizard = [
    {
      id: 1,
      template: 'scripts/controllers/step0.html',
      nextStep: 2
    },
    {
      id: 2,
      template: 'scripts/controllers/step1.html',
      nextStep: 3,
      previousStep: 1
    }, {
      id: 3,
      template: 'scripts/controllers/step2.html',
      previousStep: 2,
      nextStep: 4
    },
    {
      id: 4,
      template: 'scripts/controllers/step3.html',
      previousStep: 3,
      restart: 1,
      finish: 1
    }
  ];

  $scope.wizardData = {};

  $scope.setStep = function (step) {
    $scope.currentStep = $scope.wizard[step - 1];
  };

  $scope.restart = function () {

    $scope.wizardData = {
      step1: {
        nombre: ''
      },
      step2: {
        nombre: ''
      },
      step3: {
        nombre: ''
      },
    };
    $scope.setStep(1);

  };

  $scope.finish = function () {
    $window.alert('Submitting...');
  };

  $scope.setStep(1);

});
