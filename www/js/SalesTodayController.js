angular.module('Gula.controllers').controller('salesTodayCtrl',  function ($scope, $stateParams,PouchDBService ) {
  $scope.farmer = {yield_weight: 0, date: new Date(Date.now())}

  $scope.submit = function () { //the code below is executed when someone presses submit

    PouchDBService.getProductionDb.post({

      yield_weight: $scope.farmer.yield_weight,
      date: $scope.farmer.date,

    })

    console.log(PouchDBService.getProductionDb)

  }

});


