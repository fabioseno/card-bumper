(function () {
	'use strict';

	function Toaster($ionicLoading) {
		var show = function (message) {
			$ionicLoading.show({
				template: message,
				duration: 2000
			})
		};

		return {
			show: show
		};
	}

	Toaster.$inject = ['$ionicLoading'];

	angular.module('app').service('toaster', Toaster);

}());