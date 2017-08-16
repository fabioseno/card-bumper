(function () {
	'use strict';

	function ListCards($rootScope, $scope, $window, $ionicActionSheet, businessCardsService, toaster) {
		var vm = this;

		vm.listBusinessCards = function () {
			businessCardsService.listBusinessCards().then(function (businessCards) {
				vm.businessCards = businessCards;
			})
		}

		vm.showOptions = function (businessCard) {
			var buttons = [],
				hideSheet,

				addToContacts = function () {
					alert('Em desenvolvimento...');
				},

				composeEmail = function () {
					if ($window.cordova && $window.cordova.plugins && $window.cordova.plugins.email) {
						$window.cordova.plugins.email.isAvailable(function (hasAccount) {
							if (hasAccount) {
								$window.cordova.plugins.email.open({
									to: [businessCard.email],
									isHtml: true
								});
							} else {
								toaster.show('Nenhuma conta de e-mail está configurada');
							}
						});
					}
				},

				callPhone = function () {
					if ($window.plugins && $window.plugins.CallNumber) {
						$window.plugins.CallNumber.callNumber(function () {
							return true;
						}, function (error) {
							toaster(error);
						}, businessCard.phone, true);
					}
				},

				callMobilePhone = function () {
					if ($window.plugins && $window.plugins.CallNumber) {
						$window.plugins.CallNumber.callNumber(function () {
							return true;
						}, function (error) {
							toaster(error);
						}, businessCard.mobilePhone, true);
					}
				},

				openMap = function () {
					alert('Em desenvolvimento...');
				};

			buttons.push({ text: 'Adicionar aos contatos', action: addToContacts });

			if (businessCard.email) {
				buttons.push({ text: 'Enviar e-mail', action: composeEmail });
			}

			if (businessCard.phone) {
				buttons.push({ text: 'Ligar para ' + businessCard.phone, action: callPhone });
			}

			if (businessCard.mobilePhone) {
				buttons.push({ text: 'Ligar para ' + businessCard.mobilePhone, action: callMobilePhone });
			}

			buttons.push({ text: 'Ver no mapa', action: openMap });

			hideSheet = $ionicActionSheet.show({
				buttons: buttons,
				destructiveText: 'Excluir cartão',
				titleText: businessCard.name,
				cancelText: 'Cancelar',
				cancel: function () {
					hideSheet();
				},
				buttonClicked: function (index) {
					if (buttons[index].action) {
						buttons[index].action()
					}

					return true;
				},
				destructiveButtonClicked: function () {
					businessCardsService.removeBusinessCard(businessCard.hash).then(function (businessCards) {
						vm.listBusinessCards();
					});
					return true;
				}
			})
		};

		$scope.$on('SHOW_CARD_DETAILS', function (event, businessCard) {
			vm.showOptions(businessCard);
		});

		$scope.$on('REFRESH_CARDS', function (event, businessCards) {
			vm.businessCards = businessCards;
		});

		$scope.$on('$ionicView.beforeEnter', function () {
			vm.listBusinessCards();
		});

	}

	ListCards.$inject = ['$rootScope', '$scope', '$window', '$ionicActionSheet', 'businessCardsService', 'toaster'];

	angular.module('app').controller('listCards', ListCards);

}());