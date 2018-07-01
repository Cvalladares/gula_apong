angular.module('Gula.controllers').controller('production', function ($scope, $rootScope, PouchDBService, localStorageService,
                                                                       $state, $cordovaDialogs, $ionicHistory) {

  $scope.$on('$ionicView.enter', function (e) {
    PouchDBService.getProductionDb().allDocs({
      include_docs: true,
      attachments: true
    }).then(function (res) {
      $scope.allProductions = _.map(res.rows, 'doc');
      $scope.$digest();
    });
  });

  $scope.addProduction = function () {
    $state.go('addProduction');
  };


  $scope.deleteProduction = function (production) {
    PouchDBService.getProductionDb().get(production._id)
      .then(function (res) {
        res._deleted = true;

        return PouchDBService.getProductionDb().remove(res);
      })
      .then(function (res) {
        _.remove($scope.allProductions, {_id: res.id});
        $scope.$digest();
      })
  };

  $scope.editProduction = function (production) {
    $rootScope.productionId = production._id;
    $state.go('addProduction');
  };

  $scope.addProduction = function () {
    $state.go('addProduction');
  }

});


