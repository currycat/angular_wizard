'use strict';

angular.module('testApp').directive('wizard', function () {
	return {
		restrict: 'E',
		controller: '@',
		name: 'controller',
		templateUrl: 'views/wizard.html',
    scope:{},
		link: function (scope, element, attrs, controller) {
			controller = attrs.controller;
		}
	};
});
