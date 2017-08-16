angular.module('app', ['ionic', 'ui.mask', 'ngMessages'])

	.run(function ($ionicPlatform, $rootScope, businessCardsService) {
		$ionicPlatform.ready(function () {
			// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
			// for form inputs)
			if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
				cordova.plugins.Keyboard.disableScroll(true);

			}
			if (window.StatusBar) {
				// org.apache.cordova.statusbar required
				StatusBar.styleDefault();
			}

			businessCardsService.listenToShake(function () {
				$rootScope.$broadcast('SHAKE_GESTURE');
			});
		});
	})

	.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, appConfigProvider) {

		// Local
		// appConfigProvider.setServicesUrl('http://localhost:8080/');

		// Cloud
		appConfigProvider.setServicesUrl('https://card-bumper.herokuapp.com/');
		
		// $ionicConfigProvider.views.maxCache(0);
		$ionicConfigProvider.backButton.text('')
		$ionicConfigProvider.backButton.previousTitleText('');

		$stateProvider.state('tab', {
			url: '/tab',
			abstract: true,
			templateUrl: 'src/layout/tabs.html'
		}).state('tab.exchange-cards', {
			url: '/exchange-cards',
			views: {
				'tab-exchange-cards': {
					templateUrl: 'src/business-cards/exchange-cards.html',
					controller: 'exchangeCards as vm'
				}
			}
		}).state('tab.list-cards', {
			url: '/list-cards',
			views: {
				'tab-list-cards': {
					templateUrl: 'src/business-cards/list-cards.html',
					controller: 'listCards as vm'
				}
			}
		}).state('tab.account', {
			url: '/account',
			views: {
				'tab-account': {
					templateUrl: 'src/account/account-details.html',
					controller: 'accountDetails as vm'
				}
			}
		}).state('tab.expertises-selector', {
			url: '/expertises-selector',
			views: {
				'tab-account': {
					templateUrl: 'src/account/expertises-selector.html',
					controller: 'expertisesSelector as vm',
					resolve: {
						storageGroup: function () {
							return 'expertises';
						}
					}
				}
			}
		}).state('tab.crm-state-selector', {
			url: '/crm-state-selector',
			views: {
				'tab-account': {
					templateUrl: 'src/account/state-selector.html',
					controller: 'stateSelector as vm',
					resolve: {
						title: function () {
							return 'Estado do CRM';	
						},
						storageGroup: function () {
							return 'crm-state';
						}
					}
				}
			}
		}).state('tab.address-state-selector', {
			url: '/address-state-selector',
			views: {
				'tab-account': {
					templateUrl: 'src/account/state-selector.html',
					controller: 'stateSelector as vm',
					resolve: {
						title: function () {
							return 'Estado';	
						},
						storageGroup: function () {
							return 'address-state';
						}
					}
				}
			}
		});

		$urlRouterProvider.otherwise('/tab/exchange-cards');

	});