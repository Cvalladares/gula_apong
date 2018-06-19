angular.module('Gula.controllers').controller('salesTodayCtrl', ['$scope', '$stateParams',
// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
  function ($scope, $stateParams) {
    $scope.farmer = {price: 0, yield_weight: 0, date: new Date(Date.now())}

    $scope.submit = function () { //the code below is executed when someone presses submit

      PouchDBService.getProductionDb.post({
        price: $scope.farmer.price,
        yield_weight: $scope.farmer.yield_weight,
        date: $scope.farmer.date,
      })

      console.log(PouchDBService.getProductionDb)

    }

  }]);


