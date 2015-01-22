#Demo de wizards
* **wizard.js**
* **wizard.html**: template común a todos los wizards (botones de avanzar, retroceder, indicar el paso en el que estás...)

Uso:

```
<wizard controller="wizard1Ctrl"></wizard>
```

Donde **wizard1Ctrl** es el nombre del controlador del wizard

Ejemplo de wizard.html

```
< div class="row">
  <h1>Wizard <small>step: {{currentStep.id}}/{{wizard.length}}</small></h1>

  <div ng-include src="currentStep.template"></div>
  <hr>
  <button ng-if="currentStep.previousStep" ng-click="setStep(currentStep.previousStep)" class="btn btn-default">Previous</button>
  <button ng-if="currentStep.nextStep" ng-click="setStep(currentStep.nextStep)" class="btn btn-primary">Next</button>

  <button ng-if="currentStep.finish" ng-click="finish()" class="btn btn-success">Submit</button>
  <button ng-if="currentStep.restart" ng-click="restart()" class="btn btn-default">Start again</button>

</div>
```

Ejemplo de controlador:

```
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
```

Donde:

* **$scope.wizard** es la configuración del wizard (paso del wizard, template, paso siguiente, paso anterior, paso que finaliza, paso que puede resetear...)
* **$scope.wizardData**: objeto donde se almacenan los posibles inputs del wizard

Ejemplo de plantilla de uno de los pasos del wizard (step1.html):

```
	<h5>Bla bla bla</h5>
	Soy el template step0.html
	<br>
	<input ng-model="wizardData.step1.nombre">

```






#Instalación
Después de clonar

```
npm install
bower install
```

#Ejecución
Ejecutar con 
```
grunt serve
```

