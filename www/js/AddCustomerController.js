angular.module('Gula.controllers').controller('addCustomerCtrl', function ($scope, $rootScope, $stateParams, PouchDBService, $ionicHistory,
                                                                      $http, localStorageService, $state) {

  var addCustomerUrl = 'https://gula-server.herokuapp.com';

  $scope.user = {
    FirstName: "",
    LastName: "",
    PhoneNumber: "",
    IsReselling: "", //IsReselling: yes if it is middleman, no if it is not a middleman.
  };

  var edit = false;
  $scope.$on('$ionicView.enter', function (e) {

    $scope.user = {FirstName: "", LastName: "", PhoneNumer: "", IsReselling: ""};
    if ($rootScope.customerId) {
      edit = true;
      PouchDBService.getCustomerDb().get($rootScope.customerId)
        .then(function (res) {
          $scope.user = res;
          $scope.$digest();
        })
    }
  });

  $scope.$on('$ionicView.leave', function (e) {
    delete $rootScope.customerId;
  });

  $scope.submit = function () { //the code below is executed when someone presses submit
    //var new_index = $scope.user.index+1;
    var customerData = {
      FirstName: "scope.user.FirstName",
      LastName: "scope.user.LastName",
      PhoneNumber: "scope.user.PhoneNumber",
      IsReselling: "scope.user.IsReselling",

    };


    var promise;
    if (edit) {
      promise = PouchDBService.getCustomerDb().put($scope.user);
    } else {
      promise = PouchDBService.getCustomerDb().post(customerData);
    }

    promise.then(function (res) {
      $ionicHistory.goBack();
    }).catch(function (err) {
      $cordovaDialogs.alert('Data is not stored correctly. Try again.', 'Whoops!');
      console.error(err);
    });
  };


});

