angular.module('Gula.controllers').controller('overviewOfPriceCtrl', function ($scope, PouchDBService, localStorageService,
                                                                                 $cordovaDialogs, $ionicHistory, $cordovaGeolocation) {

  $ionicHistory.nextViewOptions({
    disableAnimate: true,
    disableBack: false
  });

})
