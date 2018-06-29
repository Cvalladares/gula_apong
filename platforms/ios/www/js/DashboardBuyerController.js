angular.module('Gula.controllers').controller('dashboardBuyerCtrl', function ($scope, PouchDBService, localStorageService,
                                                                              $cordovaDialogs, $ionicHistory, $state, $cordovaGeolocation) {
  $ionicHistory.nextViewOptions({
    disableAnimate: true,
    disableBack: false
  });

  // Fetch database Singleton
  var db = PouchDBService.getDemandDb();

  db.get("demand")
    .then(function (res) {
      $scope.user = {demand: res.trees}
    })
    .catch(function () {
      $scope.user = {demand: 0}
    });


  $scope.submit = function () { //the code below is executed when someone presses submit

    var orderData = {
      demand: $scope.user.demand,
      date: JSON.stringify(new Date()) //somewhere else in the code we used a different thing for the current date. should make it consistent.
    };

    PouchDBService.getDemandDb().post(orderData)
      .then(function (res) {
        $state.go('overviewOfSellers');
        //of: $ionicHistory.goBack();
      })
      .catch(function (err) {
        $cordovaDialogs.alert('Data is not stored correctly. Try again.', 'Whoops!');
        console.error(err);
      });
  };

})
