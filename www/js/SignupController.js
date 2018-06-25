angular.module('Gula.controllers').controller('signupCtrl', function ($scope, $stateParams, PouchDBService) {

  var db = PouchDBService.getProfileDb();

  $scope.user = {
    FirstName: "",
    LastName: "",
    Phone_Number: "",
    Address: "",
    Region: "",
    Role: ""
  };

  db.put({
    _id: "profile",
    FirstName: $scope.user.FirstName,
    LastName: $scope.user.LastName,
    Phone_Number: $scope.user.PhoneNumber,
    Address: $scope.user.Address,
    Region: $scope.user.Region,
    Role: $scope.user.Role

  })
  // go back to login
});
