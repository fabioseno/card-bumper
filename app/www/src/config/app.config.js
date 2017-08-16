(function () {
	'use strict';

	function AppConfig() {
		var servicesUrl = '',

			endpoints = {
				baseUrl: '',

				registration: {
					searchAddress: {
						url: 'zipcode/:zipCode'
					}
				},

				businessCard: {
					searchCards: {
						url: '',
						method: 'POST'
					}
				}
			};

		this.setServicesUrl = function (value) {
			endpoints.baseUrl = value;
		};

		this.$get = function () {
			var getServicesUrl = function () {
				return servicesUrl;
			};

			return {
				getServicesUrl: getServicesUrl,

				endpoints: endpoints
			};
		};
	}

	angular.module('app').provider('appConfig', AppConfig);

}());