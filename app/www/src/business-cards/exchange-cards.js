(function () {
	'use strict';

	function ExchangeCards($scope, $window, businessCardsService, toaster, loader) {
		var vm = this,

			watchID,

			watchPosition = function () {
				watchID = $window.navigator.geolocation.watchPosition(function (position) {
					businessCardsService.setPosition(position.coords);
				},
					function (error) {
						businessCardsService.setPosition();
					},
					{
						maximumAge: 10000,
						timeout: 5000,
						enableHighAccuracy: true
					}
				);
			};

		vm.searchBusinessCards = function () {
			loader.show();

			businessCardsService.searchBusinessCards().then(function (businessCards) {
				loader.hide();

				for (var i = 0; i < businessCards.length; i++) {
					businessCardsService.addBusinessCard(businessCards[i]).then(function (status) {
						if (status === 'new') {
							toaster.show('Cartão adicionado com sucesso');
						} else {
							toaster.show('Cartão atualizado com sucesso');
						}
					})
				}
			}, function (error) {
				loader.hide();
			})
		};

		vm.simulateShake = function () {
			vm.searchBusinessCards();
		}

		$scope.$on('SHAKE_GESTURE', function () {
			vm.searchBusinessCards();
		});

		$scope.$on('$ionicView.beforeEnter', function () {
			watchPosition();
		});

		$scope.$on('$ionicView.beforeLeave', function () {
			$window.navigator.geolocation.clearWatch(watchID);
		});

	}

	ExchangeCards.$inject = ['$scope', '$window', 'businessCardsService', 'toaster', 'loader'];

	angular.module('app').controller('exchangeCards', ExchangeCards);

}());