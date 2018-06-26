angular.module('Gula.controllers').controller('addAreaCtrl', function ($scope, $rootScope, PouchDBService, localStorageService,
                                                                       $cordovaDialogs, $ionicHistory, $cordovaGeolocation) {


  var edit = false;
  $scope.$on('$ionicView.enter', function (e) {
    $scope.user = {trees: 0};
    if ($rootScope.areaId) {
      edit = true;
      PouchDBService.getFarmDb().get($rootScope.areaId)
        .then(function (res) {
          $scope.user = res;
          $scope.$digest();
        })
    }
  });

  $scope.$on('$ionicView.leave', function (e) {
    delete $rootScope.areaId;
  });

  $scope.submit = function () { //the code below is executed when someone presses submit

    var farmData = {
      trees: $scope.user.trees,
      coords: coords,
      date: JSON.stringify(new Date())
    };

    var promise;
    if (edit) {
      promise = PouchDBService.getFarmDb().put($scope.user);
    } else {
      promise = PouchDBService.getFarmDb().post(farmData);
    }

    promise.then(function (res) {
      $ionicHistory.goBack();
    }).catch(function (err) {
      $cordovaDialogs.alert('Data is not stored correctly. Try again.', 'Whoops!');
      console.error(err);
    });
  };

  var coords = [];

  $scope.startTracking = function () {
    var watch = $cordovaGeolocation.watchPosition({timeout: 3000, enableHighAccuracy: true});
    watch.then(null, function (err) {
      console.error(err)
    }, function (position) {
      var lat = position.coords.latitude;
      var long = position.coords.longitude;
      coords.push([lat, long]);
      console.log(lat + " " + long);
    });

    $scope.watch = watch;
  };

  $scope.stopTracking = function () {
    $scope.watch.clearWatch();
  };
});
