angular.module('Gula.controllers').controller('myFarmCtrl', function ($scope, $stateParams, PouchDBService) {
  // Fetch database Singleton
  var db = PouchDBService.getFarmDb();

  // Initializing the scope to its previous value
  db.get("myFarm") //what is myFarm? the name of a farm??? what is in db? A dictionairy but what are the values and kes?
    .then(function (res) { //what is res?
      $scope.farmer = {trees: res.trees}
    })
    .catch(function () {
      $scope.farmer = {trees: 0}
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
          trees: $scope.farmer.trees,

        }).then(function (res) {
          console.log(res);
        })
      })
      .catch(function (res) {
        // Instance where the farm does not exist
        console.log("The document does not exist. Creating a new doc")
        db.put({
          _id: "myFarm",

          trees: $scope.farmer.trees,
        }).then(function (res) {
          console.log(res)
        })
      });
  }
});
