(function () {
	'use strict';

	function ExchangeCards($rootScope, businessCardsService, toaster, loader) {
		var vm = this;

		vm.searchBusinessCards = function () {
			var businessCard = businessCardsService.getMyBusinessCard();

			loader.show();

			businessCardsService.searchBusinessCard(businessCard).then(function (businessCards) {
				loader.hide();
				
				if (businessCards.length > 0) {
					businessCardsService.addBusinessCard(businessCards[0]).then(function (status) {
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

		$rootScope.$on('SHAKE_GESTURE', function () {
			vm.searchBusinessCards();
		});

	}

	ExchangeCards.$inject = ['$rootScope', 'businessCardsService', 'toaster', 'loader'];

	angular.module('app').controller('exchangeCards', ExchangeCards);

}());