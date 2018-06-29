angular.module('Gula.controllers').controller('myFarmsCtrl', function ($scope, $rootScope, PouchDBService, localStorageService,
                                                                       $state, $cordovaDialogs, $ionicHistory) {

  $scope.$on('$ionicView.enter', function (e) {
    PouchDBService.getFarmDb().allDocs({
      include_docs: true,
      attachments: true
    }).then(function (res) {
      $scope.allAreas = _.map(res.rows, 'doc');
      $scope.$digest();
    });

  });

  $scope.addFarm = function () {
    $state.go('addFarm');
  };


  $scope.deleteArea = function (area) {
    PouchDBService.getFarmDb().get(area._id)
      .then(function (res) {
        res._deleted = true;
        console.log(res);

        return PouchDBService.getFarmDb().remove(res);
      })
      .then(function (res) {
        _.remove($scope.allAreas, {_id: res.id});
        $scope.$digest();
      })
  };

  $scope.editArea = function (area) {
    $rootScope.areaId = area._id;
    $state.go('addFarm');
  };

  $scope.addArea = function () {

    $state.go('addFarm');

  }

});


