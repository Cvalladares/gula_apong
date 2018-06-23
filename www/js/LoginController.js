angular.module('Gula.controllers').controller('loginCtrl', function ($scope, PouchDBService, localStorageService,
                                                                     $state, $cordovaDialogs, $ionicHistory) {

  $ionicHistory.nextViewOptions({
    disableAnimate: true,
    disableBack: true
  });

  $scope.$on('$ionicView.enter', function (e) {
    $ionicHistory.clearHistory();
    $ionicHistory.clearCache();

    $scope.user = {id: "", couchPassword: ""};
  });


  $scope.authUser = function () {
    localStorageService.set('user', $scope.user);
    PouchDBService.initPouchDbs();
    PouchDBService.initSyncForUser()
      .then(function () {
     //   if (PouchDBServiqce.getProfileDb().get(password) == user.couchPassword){ // is the password in database the same as password entered? then ok.
        $state.go('dashboard')

      //}
  })
      .catch(function (err) {
        $cordovaDialogs.alert('Whoops!', err.message);
      });
  }

});


