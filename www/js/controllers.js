angular.module('Gula.controllers', [])

  .controller('loginCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {


    }])

  .controller('signupCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {


    }])

  .controller('salesTodayCtrl', ['$scope', '$stateParams',
// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {


    }])

  .controller('myFarmCtrl', function ($scope, $stateParams, localStorageService, PouchDBService) {
    PouchDBService.getDb.get("123")
      .then(function (res) {

        console.log(res);
      })
      .catch(function (err) {
        console.error(err);

      });
    $scope.farmer = {trees: localStorageService.get("trees") || 0, distance: localStorageService.get("distance") || 0}
    console.log($scope.farmer.trees);
    $scope.submit = function () {
      console.log($scope.farmer.trees + "" + $scope.farmer.distance)
      $scope.farmer.trees += 1;
//bug: if you press submit another time, then it tries to put a new value in the database that has the same ID. this gives
      // an error of course. instead, we should update the old value in the database.
      PouchDBService.getDb.put({
        _id: "123", //wat is _ ?? iets met lambda
        tree: $scope.farmer.trees,
        distance: $scope.farmer.distance,
      })
      localStorageService.set("trees", $scope.farmer.trees);
      localStorageService.set("distance", $scope.farmer.distance);
      console.log(localStorageService.get("trees"));
    }
  })

  .controller('dashboardCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {


    }])
