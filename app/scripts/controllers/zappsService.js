'use strict';

angular.module('testApp').factory('zappsService', function($log, $window, requestManagerService) {

	var zapp1 = function() {

			var _id = 'ZAPP.1',
				callback = function(data) {
					$log.log(_id + ' item data received:', data);
				},
				callbackGroup = function(data) {
					$log.log(_id + ' group data received:', data);
				};

			return {
				id: _id,
				init: function() {
					var reqList = [];
					var req = requestManagerService.newRequestObject();
					req.url = 'http://localhost:3000/item';
					req.callback = callback;
					reqList.push(req);

					req = requestManagerService.newRequestObject();
					req.url = 'http://localhost:3000/group';
					req.callback = callbackGroup;
					reqList.push(req);
					requestManagerService.pushArray(_id, reqList);
					requestManagerService.runIfPossible();

					$log.log('Calls for ' + _id, requestManagerService.callsForApp(_id));
				}
			};
		},
		zapp2 = function() {

			var _id = 'ZAPP.2',
				callback = function(data) {
					$log.log(_id + ' item data received:', data);
				};

			return {
				id: _id,
				init: function() {
					var req = requestManagerService.newRequestObject();
					req.url = 'http://localhost:3000/item';
					req.callback = callback;
					requestManagerService.push(_id, req);
					requestManagerService.runIfPossible();

					$log.log('Calls for ' + _id, requestManagerService.callsForApp(_id));
				}
			};
		};

	return {
		zapps: [zapp1, zapp2]
	};

});