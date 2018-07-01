angular.module('Gula.controllers').controller('addProduction', function ($scope, $rootScope, $stateParams, PouchDBService, $ionicHistory, LoadingAnimation) {

  var edit = false;
  $scope.$on('$ionicView.enter', function (e) {

    $scope.user = {yield_weight: 0};
    if ($rootScope.productionId) {
      edit = true;
      PouchDBService.getProductionDb().get($rootScope.productionId)
        .then(function (res) {
          $scope.user = res;
          $scope.$digest();
        })
    }
  });

  $scope.$on('$ionicView.leave', function (e) {
    delete $rootScope.productionId;
  });


  $scope.submit = function () {
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
      })
      .finally(function () {
        LoadingAnimation.hide();
      });
  }
});


