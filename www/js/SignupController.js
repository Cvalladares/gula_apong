angular.module('Gula.controllers').controller('signupCtrl', function ($scope, $stateParams, PouchDBService, $ionicHistory,
                                                                      $http, localStorageService, $state) {

  var signupUrl = 'https://gula-server.herokuapp.com';

  $scope.user = {
    FirstName: "",
    LastName: "",
    Phone_Number: "",
    Address: "",
    Divison: "",
    Role: "",
    username: '',
    password: '',
  };

  $scope.register = function () {
    $scope.user._id = "profile";

    $http({
      method: 'PUT',
      url: signupUrl + '/users',
      data: {id: $scope.user.username, couchPassword: $scope.user.password}
    })
      .then(function (res) {
        console.log(res);

        localStorageService.set('user', {id: $scope.user.username, couchPassword: $scope.user.password});

        delete $scope.user.password;
        return PouchDBService.initPouchDbs();
        // return PouchDBService.initSyncForUser();

      })
      .then(function () {
        return PouchDBService.getProfileDb().put($scope.user)
          .then(function () {
            $state.go('login');

          })
      })
      .then(function () {
      });

  };

});
