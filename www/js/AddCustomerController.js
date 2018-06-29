angular.module('Gula.controllers').controller('addCustomerCtrl', function ($scope, $stateParams, PouchDBService, $ionicHistory,
                                                                      $http, localStorageService, $state) {

  var addCustomerUrl = 'https://gula-server.herokuapp.com';

  $scope.user = {
    FirstName: "",
    LastName: "",
    PhoneNumber: "",
    IsReselling: "", //IsReselling: yes if it is middleman, no if it is not a middleman.
  };

  $scope.register = function () {
    $scope.user._id = "profile";

    $http({
      method: 'PUT',
      url: signupUrl + '/users',
    })
      .then(function (res) {
        console.log(res);

        return PouchDBService.initPouchDbs();
        // return PouchDBService.initSyncForUser();

      })
      .then(function () {
        return PouchDBService.getCustomerDb().put($scope.user)
          .then(function () {
            $state.go('/myCustomers');

          })
      })
      .then(function () {
      });

  };

});

