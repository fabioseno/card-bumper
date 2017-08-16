/*global angular*/
(function () {
	'use strict';

	function BusinessCard($rootScope, $window, accountDetailsManager, businessCardsService) {
		return {
			templateUrl: 'src/business-cards/business-card.html',

			scope: {
				card: '='
			},

			link: function (scope, element, attrs) {
				scope.flip = function () {
					scope.card.front = !scope.card.front;
				};

				scope.getExpertises = function () {
					return accountDetailsManager.getFormattedExpertises(scope.card.expertises);
				};

				scope.deleteCard = function () {
					$rootScope.$broadcast('SHOW_CARD_DETAILS', scope.card);
				};
			}
		};
	}

	BusinessCard.$inject = ['$rootScope', '$window', 'accountDetailsManager', 'businessCardsService'];

	angular.module('app').directive('businessCard', BusinessCard);

}());