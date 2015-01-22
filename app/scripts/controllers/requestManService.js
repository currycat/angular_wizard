'use strict';

var API_URL = 'http://localhost:3000';

angular.module('testApp').factory('requestManagerService', function($rootScope, $http) {

	var _apps = {},
		_expectedApps = 0,
		_liveRequests = {};

	var _isReadyToRun = function() {
		var keys = Object.keys(_apps);
		return keys.length === _expectedApps;
	};

	var _notifySuccessToCallbacks = function(response) {
		var results = response.data;

		results.forEach(function(res) {

			var apps = _liveRequests[res.origin];
			apps.forEach(function(app) {
				app.callback(res.data);
			});

		});

		$rootScope.zAppsDataInitOK();
	};

	var _executeRequest = function(requests) {

		if (requests.length) {

			var request = $http({
				method: 'post',
				url: API_URL + '/requestmanager',
				headers: {
					'x-access-token': 'XXXXXXXXX'
				},
				data: {
					requests: requests
				}
			});

			return (request.then(_notifySuccessToCallbacks, $rootScope.zAppsDataInitKO));

		} else {

			$rootScope.zAppsDataInitOK();
		}
	};


	var push = function(appID, call) {
		var zapp = _apps[appID] || null;

		if (zapp) {
			zapp.push(call);
		} else {
			_apps[appID] = [call];
		}
	};

	var pushArray = function(appID, arrayOfCalls) {
		var zapp = _apps[appID] || null;


		if (zapp) {
			zapp.concat(arrayOfCalls);
		} else {
			_apps[appID] = arrayOfCalls;
		}
	};

	var run = function() {

		if (_isReadyToRun()) {

			var keys = Object.keys(_apps),
				requests = [];

			keys.forEach(function(app) {

				_apps[app].forEach(function(req) {

					var url = _liveRequests[req.url] || null;
					if (!url) {
						_liveRequests[req.url] = [];
						url = _liveRequests[req.url];
						requests.push(req.url);
					}

					url.push({
						callback: req.callback,
						id: app
					});

				});
			});

			_executeRequest(requests);
		}
	};

	return {
		setNumberOfApps: function(n) {
			_expectedApps = n;
		},
		getNumberOfApps: function() {
			return angular.copy(_expectedApps);
		},
		push: function(appID, call) {
			return push(appID, call);
		},
		pushArray: function(appID, arrayOfCalls) {
			return pushArray(appID, arrayOfCalls);
		},
		runIfPossible: function()  {
			return run();
		},
		callsForApp: function(appID) {
			return _apps[appID] || null;
		},
		newRequestObject: function() {
			return {
				url: null,
				method: 'get',
				parameters: null,
				callback: null
			};
		}
	};

});