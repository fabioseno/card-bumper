(function () {
	'use strict';

	function Invoker($q, $http, appConfig) {
		var mapParameters = function (url, parameters) {
			var extra = [],
				param,
				newUrl,
				result = url;

			if (parameters) {
				for (param in parameters) {
					if (url.indexOf(':' + param) < 0) {
						extra.push(param + '=' + parameters[param]);
					}
				}

				newUrl = url.replace(/:(\w+)/g, function (substring, match) {
					parameters = parameters || {};

					var routeValue = parameters[match];
					if (!routeValue) {
						routeValue = ':' + match;
					}
					return routeValue;
				});

				// if we missed a value completely, then throw again
				if (newUrl.indexOf('/:') > 0) {
					throw 'Sushi: not all route values were matched (' + url + ')';
				}

				result = (extra.length === 0) ? newUrl : newUrl + '?' + extra.join('&');
			}

			// finally attach query string parameters if necessary
			return result;
		},

			call = function (service, operation, params) {
				var serviceConfig = appConfig.endpoints[service][operation],
					defer = $q.defer(),
					options = {},
					headers,
					url,
					i;

				params = params || {};
				appConfig.endpoints.defaults = appConfig.endpoints.defaults || {};

				if (!serviceConfig) {
					return;
				}

				if (serviceConfig.baseUrl) {
					url = serviceConfig.baseUrl;
				} else {
					url = appConfig.endpoints.baseUrl;
				}

				if (serviceConfig.url) {
					url += serviceConfig.url;
				}

				options.url = mapParameters(url, params.query);
				options.method = serviceConfig.method || 'GET';

				options.headers = appConfig.endpoints.defaults.headers || {};

				if (serviceConfig.headers) {
					for (i in serviceConfig.headers) {
						options.headers[i] = serviceConfig.headers[i];
					}
				}

				if (serviceConfig.options) {
					for (i in serviceConfig.options) {
						options[i] = serviceConfig.options[i];
					}
				}

				if (params.data) {
					options.data = params.data;
				}

				$http(options).then(function (result) {
					defer.resolve(result);
				}, function (error) {
					defer.reject(error);
				});

				return defer.promise;
			};

		return {
			call: call
		};
	}

	Invoker.$inject = ['$q', '$http', 'appConfig'];

	angular.module('app').service('invoker', Invoker);

}());