angular.module('Gula.controllers').controller('loginCtrl', function ($scope, PouchDBService, localStorageService,
                                                                     $state, $cordovaDialogs) {

  $scope.user = {id: "", couchPassword: ""};

  $scope.authUser = function () {
    localStorageService.set('user', $scope.user);
    PouchDBService.initPouchDbs();
    PouchDBService.initSyncForUser()
      .then(function () {
        $state.go('dashboard')

      })
      .catch(function (err) {
        $cordovaDialogs.alert('Whoops!', err)
      });
  }

});


