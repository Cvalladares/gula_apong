angular.module('Gula.controllers').controller('productionThisWeekCtrl', function ($scope, $stateParams, PouchDBService, $ionicHistory, LoadingAnimation) {
  $scope.user = {yield_weight: 0};

  $scope.submit = function () { //the code below is executed when someone presses submit
  LoadingAnimation.show();
    var obj = {
      yield_weight: $scope.user.yield_weight,
      date: moment.utc(new Date()).toISOString()
    };
    PouchDBService.getProductionDb().post(obj)
      .then(function (res) {
        $ionicHistory.goBack();
      })
      .catch(function (err) {
        $cordovaDialogs.alert('Data is not stored correctly. Try again.', 'Whoops!');
        console.error(err);
      }). finally(function () {
        LoadingAnimation.show();
    });
  }
});


