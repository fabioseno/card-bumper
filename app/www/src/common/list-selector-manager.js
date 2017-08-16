(function () {
	'use strict';

	function ListSelectorManager($location) {
		var selectedItems = {},

			openListView = function (path) {
				$location.path(path);
			},

			setSelectedItems = function (group, items) {
				selectedItems[group] = items;
			},

			getSelectedItems = function (group) {
				return angular.copy(selectedItems[group] || []);
			};
			
			// isItemSelected = function (group, callback) {
			// 	var items = getSelectedItems(group);

			// 	return callback(items);
			// };

		return {
			openListView: openListView,
			setSelectedItems: setSelectedItems,
			getSelectedItems: getSelectedItems
			//isItemSelected: isItemSelected
		};
	}

	ListSelectorManager.$inject = ['$location'];

	angular.module('app').service('listSelectorManager', ListSelectorManager);

}());