angular.module('Gula.controllers').controller('myAreasCtrl', function ($scope, PouchDBService, localStorageService,
                                                                     $state, $cordovaDialogs, $ionicHistory) {

  $scope.addArea = function () {

        $state.go('addArea');

  }

});


