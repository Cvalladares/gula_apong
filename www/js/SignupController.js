angular.module('Gula.controllers').controller('signupCtrl', function ($scope, $stateParams) {

  var db = PouchDBService.getProfileDb();

  // Initializing the scope to its previous value
  db.get("profile").then(function (res) {
    $scope.farmer = {
      FirstName: res.FirstName,
      LastName: res.LastName,
      Phone_Number: res.Phone_Number,
      Address: res.Address,
      Region: res.Region,
      Role: res.role
    }
  })
    .catch(function () {
      $scope.farmer = {
        FirstName: "No First Name",
        LastName: "No Last Name",
        Phone_Number: "+60123456789",
        Address: "No address",
        Region: "Tambirat",
        Role: "Producer"
      }
    });


  // This function is binded to the submit button
  $scope.submit = function () {
    // Update Profile information
    db.get("profile").then(function (res) {
      // Instance where the profile exists
      console.log("Document Exists. Updating.")
      db.put({
        _id: "profile",
        _rev: res._rev,
        FirstName: $scope.farmer.FirstName,
        LastName: $scope.farmer.LastName,
        Phone_Number: $scope.farmer.Phone_Number,
        Address: $scope.farmer.Address,
        Region: $scope.farmer.Region,
        Role: $scope.farmer.role
      }).then(function (res) {
        console.log(res);
      })

    }).catch(function (res) {
      // Instance where the profile does not exist
      console.log("The document does not exist. Creating a new doc")
      db.put({
        _id: "profile",
        _rev: res._rev,
        FirstName: $scope.farmer.FirstName,
        LastName: $scope.farmer.LastName,
        Phone_Number: $scope.farmer.Phone_Number,
        Address: $scope.farmer.Address,
        Region: $scope.farmer.Region,
        Role: $scope.farmer.role
      }).then(function (res) {
        console.log(res)
      })
    });
  }

});
