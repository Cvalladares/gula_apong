angular.module('Gula.controllers').controller('addAreaCtrl', function ($scope, PouchDBService, localStorageService,
                                                                       $cordovaDialogs, $ionicHistory, $cordovaGeolocation) {

  $scope.user = {trees: 0};

  $scope.submit = function () { //the code below is executed when someone presses submit

    var farmData = {
      trees: $scope.user.trees,
      coords: coords,
      date: JSON.stringify(new Date())
    };
    console.log(farmData);
    PouchDBService.getFarmDb().post(farmData)
      .then(function (res) {
        $ionicHistory.goBack();
      })
      .catch(function (err) {
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
      coords.push([lat, long])
      console.log(lat + " " + long);
    });

    $scope.watch = watch;
  };

  $scope.stopTracking = function () {
    $scope.watch.clearWatch();
  };
});
