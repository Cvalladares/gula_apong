angular.module('Gula.controllers').controller('overviewOfSellersCtrl', function ($scope, PouchDBService, localStorageService,
                                                                              $cordovaDialogs, $ionicHistory, $cordovaGeolocation) {

  $ionicHistory.nextViewOptions({
    disableAnimate: true,
    disableBack: false
  });

})
