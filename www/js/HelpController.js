angular.module('Gula.controllers').controller('helpCtrl', function ($scope, PouchDBService, localStorageService,
                                                                              $cordovaDialogs, $ionicHistory, $cordovaGeolocation) {

  $scope.myGoBack = function() {
    $ionicHistory.goBack() ;

  };

})
