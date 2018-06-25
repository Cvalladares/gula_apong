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
        return PouchDBService.getProfileDb().get("profile")
          .catch(function (err) {
            throw err;
          });
      })
      .then(function (res) {

        if (res.Role == "Producer") {
          $state.go('dashboardProducer');
        } else if (res.Role === "Buyer") {
          $state.go('dashboardBuyer');
        } else if (res.Role === "Minister") {
          $state.go('dashboardMinister');
        } else {
          // res.Role == admin or res.Role == ""
          $state.go('dashboardProducer');
        }
      })
      .catch(function (err) {
       $cordovaDialogs.alert('Username or Password incorrect', 'Whoops!');
      });
  }

});


