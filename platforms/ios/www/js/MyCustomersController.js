angular.module('Gula.controllers').controller('myCustomersCtrl', function ($scope, $rootScope, PouchDBService, localStorageService,
                                                                       $state, $cordovaDialogs, $ionicHistory) {

  $scope.$on('$ionicView.enter', function (e) {
    PouchDBService.getCustomerDb().allDocs({
      include_docs: true,
      attachments: true
    }).then(function (res) {
      $scope.allCustomers = _.map(res.rows, 'doc');
      $scope.$digest();
    });

  });


  $scope.deleteCustomer = function (customer) {
    PouchDBService.getCustomerDb().get(customer._id)
      .then(function (res) {
        res._deleted = true;
        console.log(res);

        return PouchDBService.getFarmDb().remove(res);
      })
      .then(function (res) {
        _.remove($scope.allAreas, {_id: res.id});
        $scope.$digest();
      })
  };

  $scope.editCustomer = function (customer) {
    $rootScope.customerId = customer._id;
    $state.go('addCustomer');
  };

  $scope.addArea = function () {

    $state.go('addCustomer');

  }

});


