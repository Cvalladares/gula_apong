angular.module('Gula.controllers').controller('overviewOfProducersCtrl', function ($scope, $rootScope, PouchDBService, localStorageService,
                                                                       $state, $cordovaDialogs, $ionicHistory) {

  $scope.$on('$ionicView.enter', function (e) {
    PouchDBService.getProfileDb().allDocs({
      // we want all different databases, of all users. Not all documents....
      include_docs: true,
      attachments: true
    }).then(function (res) {
      $scope.allData = _.map(res.rows, 'doc');
      $scope.$digest();
    });

  });


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
    $state.go('addArea');
  };

  $scope.addArea = function () {

    $state.go('addArea');

  }

});


