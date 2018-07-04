angular.module('Gula.controllers').controller('loginCtrl', function ($scope, PouchDBService, localStorageService,
                                                                     $state, $cordovaDialogs, $ionicHistory,
                                                                     LoadingAnimation, $ionicPopup, $ionicLoading) {

  $ionicHistory.nextViewOptions({
    disableAnimate: true,
    //disableBack: true;
  });

  $scope.$on('$ionicView.enter', function (e) {
    $ionicHistory.clearHistory();
    $ionicHistory.clearCache();
    $scope.user = {id: "", couchPassword: ""};

    var user = localStorageService.get('user');
    if ((user != null) && (typeof user.id != 'undefined')) {
      navigatePage(user);
    }
  });


  $scope.authUser = function () {
    LoadingAnimation.show();
    localStorageService.set('user', $scope.user);

    PouchDBService.initPouchDbs();
    PouchDBService.initSyncForUser()
      .then(function () {
        return PouchDBService.getProfileDb().get("profile")
          .then(function (res) {
            res.id = $scope.user.id;
            res.couchPassword = $scope.user.couchPassword;
            localStorageService.set('user', res);
            return res;
          })
          .catch(function (err) {
            throw err;
          });
      })
      .then(function (res) {
        navigatePage(res);
      })
      .catch(function (err) {
        $cordovaDialogs.alert('Username or Password incorrect', 'Whooptidi scoop!');
        localStorageService.remove('user');
      })
      .finally(function () {
            LoadingAnimation.hide();
      });
  };

  function navigatePage(user) {

    if (user.Role == "Producer") {
      $state.go('dashboardProducer');
    } else if (user.Role == "Buyer") {
      $state.go('dashboardBuyer');
    } else if (user.Role == "Minister") {
      $state.go('dashboardMinister');
    } else {
      $state.go('dashboardProducer');
    }
  }

});


