angular.module('Gula.controllers').controller('profile', function ($scope, $rootScope, PouchDBService, localStorageService,
                                                                   $cordovaDialogs, $ionicHistory, LoadingAnimation, $state) {

  $scope.$on('$ionicView.enter', function (e) {
    LoadingAnimation.show();
    PouchDBService.getProfileDb().get('profile')
      .then(function (res) {
        $scope.user = res;
      })
      .finally(function () {
        LoadingAnimation.hide();
      });
  });

  $scope.submit = function () {
    LoadingAnimation.show();
    PouchDBService.getProfileDb().put($scope.user)
      .then(function () {
        $ionicHistory.goBack();
      })
      .catch(function (err) {
        $cordovaDialogs.alert('Data is not stored correctly. Try again.', 'Whoops!');
        console.error(err);
      })
      .finally(function () {
        LoadingAnimation.hide();
      });
  };

  $scope.logout = function () {
    LoadingAnimation.show();
    PouchDBService.cancelSyncs()
      .then(function () {
        return PouchDBService.destroyDatabases();
      })
      .then(function () {
        localStorageService.clearAll();
        $state.go('login');
      })
      .finally(function () {
        LoadingAnimation.hide()
      });
  }

});
