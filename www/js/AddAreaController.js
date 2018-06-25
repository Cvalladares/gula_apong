angular.module('Gula.controllers').controller('addAreaCtrl', function ($scope, PouchDBService, localStorageService,
                                                                     $state, $cordovaDialogs, $ionicHistory) {

  $scope.farmer = {trees:0};

  $scope.submit = function () { //the code below is executed when someone presses submit

    PouchDBService.getFarmDb().post({
      trees: $scope.farmer.trees,
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
