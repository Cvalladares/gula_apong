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
        $state.go('dashboardProducer');
       // $scope.goToInterface();
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
          console.log("hoi producer");
          $state.go('dashboardProducer');
        } else if ($scope.farmer.role == "buyer") {
          console.log("hoi producer");
          $state.go('dashboardBuyer');
        } else if ($scope.farmer.role == "minister") {
          console.log("hoi minister");
          $state.go('dashboardMinister');
        } else // $scope.farmer.role == admin
          console.log("you are in the else");
          $state.go('dashboardProducer');

      })
      .catch(function () {
        //something
      });
  }


});


