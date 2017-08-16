/*global angular*/
(function () {
    'use strict';

    function Loader($ionicLoading) {
        var show = function (message) {
            if (message) {
                message = '<br />' + message;
            } else {
                message = '';
            }
            
            $ionicLoading.show({
                template: '<ion-spinner></ion-spinner>' + message
            });
        },

            hide = function () {
                $ionicLoading.hide();
            };

        return {
            show: show,
            hide: hide
        };
    }

    Loader.$inject = ['$ionicLoading'];

    angular.module('app').service('loader', Loader);

}());