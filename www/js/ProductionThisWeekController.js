angular.module('Gula.controllers').controller('productionThisWeekCtrl', function ($scope, $stateParams, PouchDBService, $ionicHistory) {
  $scope.user = {yield_weight: 0, date: new Date(Date.now())};

  $scope.submit = function () { //the code below is executed when someone presses submit

    PouchDBService.getProductionDb().post({
      yield_weight: $scope.user.yield_weight,
      date: $scope.user.date,
    })
      .then(function (res) {
        $ionicHistory.goBack();
      })
      .catch(function (err) {
        $cordovaDialogs.alert('Whoops!', 'Data is not stored correctly. Try again.');
        console.error(err);
      });
  }
});


