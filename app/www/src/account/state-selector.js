(function () {
	'use strict';

	function StateSelector($scope, $location, accountDetailsManager, listSelectorManager, storageGroup, title) {
		var vm = this,

			selectedItems,

			loadSelectedItems = function () {
				selectedItems = listSelectorManager.getSelectedItems(storageGroup);
			};

		vm.title = title;

		vm.states = accountDetailsManager.states;

		vm.isItemSelected = function (item) {
			var found = false;

			for (var i = 0; i < selectedItems.length; i++) {
				var selectedItem = selectedItems[i];

				if (selectedItem && selectedItem.code === item.code) {
					found = true;
					break;
				}
			}

			return found;
		}

		vm.selectItem = function (item) {
			selectedItems = [item];
		};

		vm.cancel = function () {
			$location.path('/tab/account');
		};

		vm.save = function () {
			listSelectorManager.setSelectedItems(storageGroup, selectedItems);
			$location.path('/tab/account');
		};

		$scope.$on('$ionicView.beforeEnter', function () {
			loadSelectedItems();
		});
	}

	StateSelector.$inject = ['$scope', '$location', 'accountDetailsManager', 'listSelectorManager', 'storageGroup', 'title'];

	angular.module('app').controller('stateSelector', StateSelector);

}());