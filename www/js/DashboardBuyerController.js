angular.module('Gula.controllers').controller('dashboardBuyerCtrl', function ($scope, PouchDBService, localStorageService,
                                                                              $cordovaDialogs, $ionicHistory, $cordovaGeolocation) {

  $scope.farmer.demand = {demand: 0};

  $scope.submit = function () { //the code below is executed when someone presses submit

    var orderData = {
      demand: $scope.farmer.demand,
      date: JSON.stringify(new Date()) //somewhere else in the code we used a different thing for the curent date. should make it consistent.
    };

    PouchDBService.getDemandDb().post(orderData)
      .then(function (res) {
        $ionicHistory.goBack();
      })
      .catch(function (err) {
        $cordovaDialogs.alert('Data is not stored correctly. Try again.', 'Whoops!');
        console.error(err);
      });
  };

})
