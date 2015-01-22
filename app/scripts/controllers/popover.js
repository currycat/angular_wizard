'use strict';


angular.module('testApp').directive('zPopover', function ($compile, $templateCache, $q, $http) {

	var getTemplate = function (contentType, templatePath) {
		var def = $q.defer();

		var template = '';
		switch (contentType) {
		case 'user':
			template = $templateCache.get(templatePath);
			if (typeof template === 'undefined') {
				$http.get(templatePath)
					.success(function (data) {
						$templateCache.put(templatePath, data);
						def.resolve(data);
					});
			} else {
				def.resolve(template);
			}
			break;
		}
		return def.promise;
	};

	return {
		restrict: 'E',
		controller: 'popover.test',

		link: function (scope, element, attrs, controller) {

			controller = attrs.controller;

			getTemplate('user', attrs.template).then(function (popOverContent) {

				var html = $compile(popOverContent)(scope);
				var options = {
					content: html,
					placement: attrs.placement,
					html: true,
					date: scope.date,
					trigger: attrs.trigger || 'click'
				};

				$(element).popover(options);

			});

		}
	};
});