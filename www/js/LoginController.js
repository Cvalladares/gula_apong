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
        $scope.goToInterface();
      })
      .catch(function (err) {
        $cordovaDialogs.alert( 'Username or Password incorrect', 'Whoops!');
      });
  }

  $scope.goToInterface = function () {
    var db = PouchDBService.getProfileDb();

    // Initializing the scope to its previous value
    db.get("myProfile")
      .then(function (res) {
        if ($scope.farmer.role == "producer") {
          $state.go('dashboardProducer');
        } else if ($scope.farmer.role == "buyer") {
          $state.go('dashboardBuyer');
        } else if ($scope.farmer.role == "minister") {
          $state.go('dashboardMinister');
        } else // $scope.farmer.role == admin
          $state.go('dashboardProducer');

      })
      .catch(function () {
        //something
      });
  }


});


