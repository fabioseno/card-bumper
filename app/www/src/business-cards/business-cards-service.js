(function () {
	'use strict';

	function BusinessCardsService($window, $q, $http) {
		var listenToShake = function (onShake) {
			if ($window.shake) {
				$window.shake.startWatch(onShake, 60 /*, onError */);
			}
		},

			hashCode = function (value) {
				var hash = 0, i, chr;
				if (value.length === 0) return hash;
				for (i = 0; i < value.length; i++) {
					chr = value.charCodeAt(i);
					hash = ((hash << 5) - hash) + chr;
					hash |= 0; // Convert to 32bit integer
				}
				return hash;
			},

			getMyBusinessCard = function () {
				return JSON.parse($window.localStorage.getItem('CARD_DETAILS')) || {}
			},

			saveMyBusinessCard = function (businessCard) {
				return $q.when($window.localStorage.setItem('CARD_DETAILS', JSON.stringify(businessCard)));
			},

			searchBusinessCard = function (businessCard) {
				var deviceId = new Date().getTime();

				if ($window.device) {
					deviceId = $window.device.uuid;
				}

				var data = {
					from: deviceId,
					cardDetails: businessCard
				};

				return $http.post('https://card-bumper.herokuapp.com/search', data).then(function (result) {
					// return $http.post('http://192.168.1.3:8080/search', data).then(function (result) {
					return result.data;
				}, function (error) {

				});
			},

			addBusinessCard = function (businessCard) {
				var cards = JSON.parse($window.localStorage.getItem('BUSINESS_CARDS')) || [],
					found = false,
					status;

				businessCard.hash = hashCode(JSON.stringify(businessCard));

				for (var i = 0; i < cards.length; i++) {
					if (cards[i].crm === businessCard.crm && cards[i].crmState === businessCard.crmState) {
						found = true;
						break;
					}
				}

				if (!found) {
					status = 'new';
					cards.push(businessCard);
				}

				$window.localStorage.setItem('BUSINESS_CARDS', JSON.stringify(cards));

				return $q.when(status);
			},

			removeBusinessCard = function (hash) {
				var cards = JSON.parse($window.localStorage.getItem('BUSINESS_CARDS')) || [];

				for (var i = 0; i < cards.length; i++) {
					if (cards[i].hash === hash) {
						cards.splice(i, 1);
						break;
					}
				}

				$window.localStorage.setItem('BUSINESS_CARDS', JSON.stringify(cards));

				return $q.when(cards);
			},

			listBusinessCards = function () {
				return $q.when(JSON.parse($window.localStorage.getItem('BUSINESS_CARDS')) || []);
			};

		return {
			listenToShake: listenToShake,

			getMyBusinessCard: getMyBusinessCard,
			saveMyBusinessCard: saveMyBusinessCard,

			searchBusinessCard: searchBusinessCard,
			addBusinessCard: addBusinessCard,
			removeBusinessCard: removeBusinessCard,
			listBusinessCards: listBusinessCards
		};
	}

	BusinessCardsService.$inject = ['$window', '$q', '$http'];

	angular.module('app').service('businessCardsService', BusinessCardsService);

}());