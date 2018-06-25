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
        $state.go('dashboard');
      })
      .catch(function (err) {
        $cordovaDialogs.alert( 'Username or Password incorrect', 'Whoops!');
      });
  }

  //user_profile_info = getDbFromUser(username) or getProfileDb()
  // if db.get(role)==producer:
  // go to producerdashboard
  // else if db.get(role)==buyer:
  // go to buyerdashboard
  // else if db.get(role)==minister:
  // go to ministerdashboard
  // else: //role == admin
  // go to producerdashboard (we dont have admindashboard yet)

});


