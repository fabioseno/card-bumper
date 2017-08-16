(function () {
	'use strict';

	function ExpertisesSelector($scope, $location, accountDetailsManager, listSelectorManager, storageGroup) {
		var vm = this,

			selectedItems,

			loadSelectedItems = function () {
				selectedItems = listSelectorManager.getSelectedItems(storageGroup);
			};

		vm.expertises = accountDetailsManager.expertises;

		vm.isItemSelected = function (item) {
			//return listSelectorManager.isItemSelected(storageGroup, function (selectedItems) {
			var found = false;

			for (var i = 0; i < selectedItems.length; i++) {
				var selectedItem = selectedItems[i];

				if (selectedItem && selectedItem.code === item.code) {
					found = true;
					break;
				}
			}

			return found;
			//});
		}

		vm.selectItem = function (item) {
			var found = false;

			for (var i = 0; i < selectedItems.length; i++) {
				if (selectedItems[i].code === item.code) {
					found = true;
					selectedItems.splice(i, 1);
					break;
				}
			}

			if (!found) {
				selectedItems.push(item);
			}
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

	ExpertisesSelector.$inject = ['$scope', '$location', 'accountDetailsManager', 'listSelectorManager', 'storageGroup'];

	angular.module('app').controller('expertisesSelector', ExpertisesSelector);

}());