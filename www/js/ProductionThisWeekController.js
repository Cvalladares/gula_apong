angular.module('Gula.controllers').controller('productionThisWeekCtrl', function ($scope, $stateParams, PouchDBService, $ionicHistory) {
  $scope.user = {yield_weight: 0};

  $scope.submit = function () { //the code below is executed when someone presses submit

    PouchDBService.getProductionDb().post({
      yield_weight: $scope.user.yield_weight,
      date: JSON.stringify(new Date())
    })
      .then(function (res) {
        $ionicHistory.goBack();
      })
      .catch(function (err) {
        $cordovaDialogs.alert('Data is not stored correctly. Try again.', 'Whoops!');
        console.error(err);
      });
  }
});


