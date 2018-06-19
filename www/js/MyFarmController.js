angular.module('Gula.controllers').controller('myFarmCtrl', function ($scope, $stateParams, PouchDBService) {
  // Fetch database Singleton
  var db = PouchDBService.getDb

  // Initializing the scope to its previous value
  db.get("123").then(function (res) {
    $scope.farmer = {trees: res.trees, distance: res.distance}
  })
    .catch(function () {
      $scope.farmer = {trees: 0, distance: 0}
    })

  // This function is binded to the submit button
  $scope.submit = function () {
    // Update Farm information
    db.get("123").then(function (res) {
      // Instance where the farm exists
      console.log("Document Exists. Updating.")
      db.put({
        _id: "123",
        _rev: res._rev,
        trees: $scope.farmer.trees,
        distance: $scope.farmer.distance
      }).then(function (res) {
        console.log(res);
      })


    })
      .catch(function (res) {
        // Instance where the farm does not exist
        console.log("The document does not exist. Creating a new doc")
        db.put({
          _id: "123",

          trees: $scope.farmer.trees,
          distance: $scope.farmer.distance
        }).then(function (res) {
          console.log(res)
        })
      });
  }
});
