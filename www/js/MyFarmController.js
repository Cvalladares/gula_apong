angular.module('Gula.controllers').controller('myFarmCtrl', function ($scope, $stateParams, PouchDBService,
                                                                      $cordovaGeolocation, $ionicPlatform, $timeout) {
  // Fetch database Singleton
  var db = PouchDBService.getFarmDb();

  // Initializing the scope to its previous value
  db.get("myFarm")
    .then(function (res) {
      $scope.user = {trees: res.trees}
    })
    .catch(function () {
      $scope.user = {trees: 0}
    });

  // This function is binded to the submit button
  $scope.submit = function () {
    // Update Farm information
    db.get("myFarm")
      .then(function (res) {
        // Instance where the farm exists
        console.log("Document Exists. Updating.");
        db.put({
          _id: "myFarm",
          _rev: res._rev,
          trees: $scope.user.trees,

        }).then(function (res) {
          console.log(res);
        })
      })
      .catch(function (res) {
        // Instance where the farm does not exist
        console.log("The document does not exist. Creating a new doc")
        db.put({
          _id: "myFarm",

          trees: $scope.user.trees,
        }).then(function (res) {
          console.log(res)
        })
      });
  };

  var watchID = 0;
  $ionicPlatform.ready(function () {
    watchID = startTracking();
    $timeout(stopTracking, 5000);
  });

  function startTracking() {
    console.log("start")
    var watch = $cordovaGeolocation.watchPosition({timeout: 3000, enableHighAccuracy: true});
    watch.then(null, function (err) {
      console.error(err)
    }, function (position) {
      var lat = position.coords.latitude;
      var long = position.coords.longitude;
      console.log(lat + " " + long);
    });
    return watch;

    // var posOptions = {timeout: 10000, enableHighAccuracy: true};
    // $cordovaGeolocation
    //   .getCurrentPosition(posOptions)
    //   .then(function (position) {
    //     var lat = position.coords.latitude;
    //     var long = position.coords.longitude;
    //     console.log(lat + " " + long);
    //   }, function (err) {
    //     console.error(JSON.stringify(err));
    //   });
  }

  function stopTracking() {
    console.log("stop")
    watchID.clearWatch();
  }
});
