'use strict';

angular.module('testApp').factory('actionsService', function($rootScope) {

	var _actions = {},
		_keys = {
			topmenu: 'com.zyncro.topmenu.actions',
			leftmenu: 'com.zyncro.sideleftmenu.actions',
			postitem: 'com.zyncro.item.post.actions'
		};

	var get = function(entityKey) {
		var data = _actions[entityKey];
		return typeof data !== 'undefined' ? data : [];
	};


	//Falta comprobar que las actions no estén ya registradas...
	var push = function(entityKey, action) {

		var entity = _actions[entityKey] || null;

		if (!entity) {
			_actions[entityKey] = [action];
		} else {
			_actions[entityKey].push(action);
		}

		$rootScope.$broadcast(entityKey + 'UPDATED', _actions);

	};

	var pushArray = function(entityKey, actionsArray) {
		var entity = _actions[entityKey] || null;

		if (!entity) {
			_actions[entityKey] = actionsArray;
		} else {
			_actions[entityKey].concat(actionsArray);
		}

		$rootScope.$broadcast(entityKey + 'UPDATED', _actions);
	};

	var remove = function(entityKey, id) {
		var entity = _actions[entityKey] || null;

		if (entity) {

			_actions[entityKey] = entity.filter(function(item) {
				return item.id !== id;
			});

			$rootScope.$broadcast(entityKey + 'UPDATED', _actions);
		}
	};

	var removeAll = function(entityKey) {
		var entity = _actions[entityKey] || null;

		if (entity) {
			_actions[entityKey] = [];

			$rootScope.$broadcast(entityKey + 'UPDATED', _actions);
		}
	};

	return {
		actions: _actions,
		keys: _keys,
		get: function(entityKey) {
			return get(entityKey);
		},
		push: function(entityKey, action) {
			return push(entityKey, action);
		},
		pushArray: function(entityKey, actionsArray) {
			return pushArray(entityKey, actionsArray);
		},
		remove: function(entityKey, id) {
			return remove(entityKey, id);
		},
		removeAll: function(entityKey) {
			return removeAll(entityKey);
		}
	};

});