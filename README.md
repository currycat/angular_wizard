#Demo de Popovers <z-popover></z-popover>

Directiva para crear popovers de UIBootstrap con contenido proveniente de un template de angular y asociándole un controller (o no). Permite indicarle:

- placement: lugar donde aparecerá el popover. Por defecto bottom
- trigger: evento que dispara el popover. Valores conocidos:
	- click (valor por defecto)
	- hover
	- focus: se abre al clicar (al recibi el foco) y se cerrará al pulsar sobre otro elemento (o un elemento del popup). Hace falta indicarle el tabindex del elemento)
- template: ruta del template html
- controller (opcional): controller que gestionará la lógica ligada al template.

##Ejemplos

###Plantillas y controllers
Imaginemos que tenemos 2 plantillas y 1 controller

#####popover.html

```
<img width="300" src="https://31.media.tumblr.com/8ea823e5d57fb51d02c755b2f959dc9c/tumblr_mi6vbkd5og1qbcq3wo1_500.gif">
```

#####popover2.html**

```
<img width="100" src="https://s-media-cache-ak0.pinimg.com/236x/2c/57/8d/2c578d5c9928ca63836c3fe0e8ccd13b.jpg">
<br><br>
<span ng-repeat="item in datasource track by item.id" ng-click="item.callback()">
	<i ng-if="item.icon" class="icon {{item.icon}}"></i> {{item.label}}<br>
</span>
<br>
<button class="btn btn-primary btn-sm" ng-click="gotIt()">Got it fistro</button>

```

#####Controller 'popover.test'

```
angular.module('testApp').controller('popover.test', function ($scope, $log, $window) {

  var addItem = function () {
    $window.alert('ADD ITEM');
  };

  var showInfo = function () {
    $window.alert('SHOW INFO');
  };

  $scope.datasource = [
    {
      id: 0,
      icon: 'ion-plus-circled',
      label: 'añadir...',
      callback: addItem
    }, {
      id: 1,
      icon: 'ion-information-circled',
      label: 'mostrar info',
      callback: showInfo
    }
  ];

  $scope.gotIt = function () {
    $window.alert('Fistroooooor');
  };

});
```



###Ejemplo.1: Botón que muestra un popover con acciones y que con dismiss al perder el foco 

```
<z-popover tabindex="0" class="btn btn-default" placement="bottom" template="scripts/controllers/popover2.html" controller="popover.test" trigger="focus">Pasa por encima</z-popover>
```

Si cambiamos trigger="click", no se esconderá hasta que volvamos a pulsar el botón (comportamiento por defecto si no se especifica trigger)

###Ejemplo.2: texto que muestra un popover "informativo" que se muestra al hacer hover

```
<z-popover placement="right" template="scripts/controllers/popover.html" trigger="hover"><strong>Soy un texto que activa PopZilla si pasas por encima</strong></z-popover>
```
Como este popup no tiene acciones, no especificamos el controller


###Ejemplo.3: mismo texto informativo, pero esta vez en un dropdown

```
< div class="dropdown">
  <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-expanded="true">
    Dropdown
    <span class="caret"></span>
  </button>
  <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
    <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Another action</a></li>
    <li role="presentation"><a role="menuitem" tabindex="-1" href="#"><z-popover placement="right" template="scripts/controllers/popover.html" trigger="hover">PopZilla Hover</z-popover></a></li>

    <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Something else here</a></li>
    <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Separated link</a></li>
  </ul>
< /div>
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

