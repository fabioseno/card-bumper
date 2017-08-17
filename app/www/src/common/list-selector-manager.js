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

		return {
			openListView: openListView,
			setSelectedItems: setSelectedItems,
			getSelectedItems: getSelectedItems
		};
	}

	ListSelectorManager.$inject = ['$location'];

	angular.module('app').service('listSelectorManager', ListSelectorManager);

}());