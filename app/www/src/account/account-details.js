(function () {
	'use strict';

	function AccountDetails($scope, $window, $ionicScrollDelegate, accountDetailsManager, listSelectorManager, businessCardsService, toaster, loader) {
		var vm = this;

		vm.user = {};

		vm.loadDetails = function () {
			vm.user = accountDetailsManager.getAccountDetails();

			vm.expertises = accountDetailsManager.getFormattedExpertises(vm.user.expertises) || 'Especialidades *';
			vm.crmState = accountDetailsManager.getFormattedState(vm.user.crmState) || 'Estado *';
			vm.addressState = accountDetailsManager.getFormattedState(vm.user.addressState) || 'Estado *';
		};

		vm.loadAddress = function () {
			if (vm.user.zipCode && vm.user.zipCode.length === 9) {
				var cleanZipCode = vm.user.zipCode.replace('-', '');

				if ($window.cordova && $window.cordova.plugins && $window.cordova.plugins.Keyboard) {
					$window.cordova.plugins.Keyboard.close();
				}

				loader.show();
				accountDetailsManager.searchAddress(cleanZipCode).then(function (result) {
					loader.hide();

					if (result.status === 200 && !result.data.message) {
						var address = result.data;

						vm.user.address = ((address.tipoDeLogradouro || '') + ' ' + (address.logradouro || '')).trim();
						vm.user.number = '';
						vm.user.address2 = '';
						vm.user.district = address.bairro;
						vm.user.city = address.cidade;
						vm.user.addressState = address.estado;

						var addressState = accountDetailsManager.getState(address.estado);
						listSelectorManager.setSelectedItems('address-state', [addressState]);

						vm.addressState = accountDetailsManager.getFormattedState(address.estado);
					} else {
						vm.user.address = '';
						vm.user.number = '';
						vm.user.address2 = '';
						vm.user.district = '';
						vm.user.city = '';
						vm.user.addressState = '';
						vm.addressState = '';
					}
				}, function (error) {
					if (error.data) {
						toaster.show(error.data);
					}

					loader.hide();
				});
			}
		}

		vm.selectExpertise = function () {
			listSelectorManager.openListView('/tab/expertises-selector');
		};

		vm.selectAddressState = function () {
			listSelectorManager.openListView('/tab/address-state-selector');
		};

		vm.selectCrmState = function () {
			listSelectorManager.openListView('/tab/crm-state-selector');
		};

		vm.saveDetails = function () {
			$ionicScrollDelegate.resize();

			if (vm.form.$valid) {
				vm.user.phone = vm.user.phone.replace(/_/g, '');
				vm.user.mobilePhone = vm.user.mobilePhone.replace(/_/g, '');
				businessCardsService.saveMyBusinessCard(vm.user).then(function () {
					toaster.show('Dados salvos com sucesso');
				})
			}
		};

		$scope.$watch('vm.user', function (value) {
			accountDetailsManager.saveAccountDetails(value);
		}, true);

		$scope.$on('$ionicView.beforeEnter', function () {
			vm.loadDetails();
		});
		
	}

	AccountDetails.$inject = ['$scope', '$window', '$ionicScrollDelegate', 'accountDetailsManager', 'listSelectorManager', 'businessCardsService', 'toaster', 'loader'];

	angular.module('app').controller('accountDetails', AccountDetails);

}());