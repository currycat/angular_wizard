'use strict';

var API_URL = 'http://localhost:3000';

angular.module('testApp').factory('itemService', function($resource, $cacheFactory) {

	var itemActions = {
			'get': {
				method: 'GET'
			},
			'save': {
				method: 'POST',
				cache: true
			},
			'create': {
				method: 'PUT',
				cache: true
			}
		},
		erroresAction = {
			'get': {
				method: 'GET',
				cache: true
			}
		},
		$httpDefaultCache = $cacheFactory.get('$http');

	var Item = $resource(API_URL + '/item/:item', {
		item: '@id'
	}, itemActions);

	var Errores = $resource(API_URL + '/error/:tipo', {
		tipo: '@id'
	}, erroresAction);

	return {
		Item: Item,
		TestError: Errores
	};

});