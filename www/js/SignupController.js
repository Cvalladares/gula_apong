angular.module('Gula.controllers').controller('signupCtrl', function ($scope, $stateParams, PouchDBService) {

  var db = PouchDBService.getProfileDb();

  $scope.farmer = {
    FirstName: "",
    LastName: "",
    Phone_Number: "",
    Address: "",
    Region: "",
    Role: ""
  };

  db.put({
    _id: "profile",
    FirstName: $scope.farmer.FirstName,
    LastName: $scope.farmer.LastName,
    Phone_Number: $scope.farmer.PhoneNumber,
    Address: $scope.farmer.Address,
    Region: $scope.farmer.Region,
    Role: $scope.farmer.Role

  })
  // go back to login
});
