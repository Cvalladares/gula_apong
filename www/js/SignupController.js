angular.module('Gula.controllers').controller('signupCtrl', function ($scope, $stateParams, PouchDBService, $ionicHistory) {

  $ionicHistory.nextViewOptions({
    disableAnimate: true,
    disableBack: false
  });

  $scope.user = {
    FirstName: "",
    LastName: "",
    Phone_Number: "",
    Address: "",
    Divison: "",
    Role: ""
  };

  $scope.register = function () {
    $scope.user._id = "profile";
    PouchDBService.getProfileDb().put($scope.user);
    $ionicHistory.goBack();
  };

});
