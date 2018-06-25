angular.module('Gula.controllers').controller('myAreasCtrl', function ($scope, PouchDBService, localStorageService,
                                                                       $state, $cordovaDialogs, $ionicHistory) {

  PouchDBService.getFarmDb().allDocs({
    include_docs: true,
    attachments: true
  }).then(function (res) {
    $scope.allAreas = _.map(res.rows, 'doc');
  });

  $scope.deleteArea = function (area) {
    PouchDBService.getFarmDb().get(area._id)
      .then(function (res) {
        PouchDBService.getFarmDb().remove(res);
      })
  };


  $scope.addArea = function () {

    $state.go('addArea');

  }

});


