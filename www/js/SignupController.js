angular.module('Gula.controllers').controller('signupCtrl', function ($scope, $stateParams, PouchDBService, $ionicHistory,
                                                                      $http, localStorageService, $state) {

  $scope.myGoBack = function () {
    // $ionicHistory.goBack() does not work for some reason
    $state.go('login');

  };

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
      })
      .catch(function (err) {
        throw err;
      })
      .then(function () {
        return PouchDBService.getProfileDb().put($scope.user);
      })
      .then(function () {
        localStorageService.remove('user');
        $state.go('login');
      })
      .catch(function (err) {
        console.error(err);
      });

  };

});
