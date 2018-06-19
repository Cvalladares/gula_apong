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

  .controller('salesTodayCtrl', function ($scope, $stateParams, PouchDBService) {

    $scope.farmer = {price: 0, yield_weight: 0, date: new Date(Date.now())}

    $scope.submit = function () { //the code below is executed when someone presses submit

      PouchDBService.getProductionDb.post({
        price: $scope.farmer.price,
        yield_weight: $scope.farmer.yield_weight,
        date: $scope.farmer.date,
      })

      console.log(PouchDBService.getProductionDb)

    }
  })


  .controller('myFarmCtrl', function ($scope, $stateParams, PouchDBService) {
    // Fetch database Singleton
    var db = PouchDBService.getDb

    // Initializing the scope to its previous value
    db.get("123").then(function (res) {
      $scope.farmer = {trees: res.trees, distance: res.distance}
    })
      .catch(function () {
        $scope.farmer = {trees: 0, distance: 0}
      })

    // This function is binded to the submit button
    $scope.submit = function () {
      // Update Farm information
      db.get("123").then(function (res) {
        // Instance where the farm exists
        console.log("Document Exists. Updating.")
        db.put({
          _id: "123",
          _rev: res._rev,
          trees: $scope.farmer.trees,
          distance: $scope.farmer.distance
        }).then(function (res) {
          console.log(res);
        })


      })
        .catch(function (res) {
          // Instance where the farm does not exist
          console.log("The document does not exist. Creating a new doc")
          db.put({
            _id: "123",

            trees: $scope.farmer.trees,
            distance: $scope.farmer.distance
          }).then(function (res) {
            console.log(res)
          })
        });
    }
  })


  .controller('dashboardCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {


    }])
