angular.module('Gula.controllers').controller('addFarmCtrl', function ($scope, $rootScope, PouchDBService, localStorageService,
                                                                       $cordovaDialogs, $ionicHistory, $cordovaGeolocation, CalculateAreaService,
                                                                       LoadingAnimation) {
  // You can use https://www.daftlogic.com/projects-google-maps-area-calculator-tool.htm
  //    to test the calculations.
  // let coordinates = [
  //   [1.602810301968369,110.36798244493912],
  //   [1.6071001528072157,110.37235981005142],
  //   [1.609073481168485,110.37205940264175],
  //   [1.60810826644756,110.36901241320083],
  //   [1.6084514539562023,110.36813264864395],
  //   [1.6077650788812101,110.3652787782521],
  //   [1.6053413150518685,110.365729389366]
  // ];

  $scope.trackingInProgress = false;

  $scope.myGoBack = function () {
    // $ionicHistory.goBack() does not work for some reason
    $state.go('login');

  };


  var edit = false;
  $scope.$on('$ionicView.enter', function (e) {

    $scope.farm = {trees: '', CalculatedArea: '', coords: []};
    if ($rootScope.areaId) {
      edit = true;
      PouchDBService.getFarmDb().get($rootScope.areaId)
        .then(function (res) {
          $scope.farm = res;
          $scope.$digest();
        })
    }
  });

  $scope.$on('$ionicView.leave', function (e) {
    delete $rootScope.areaId;
  });

  $scope.submit = function () {
    LoadingAnimation.show();

    var promise;
    if (edit) {
      promise = PouchDBService.getFarmDb().put($scope.farm);
    } else {
      promise = PouchDBService.getFarmDb().post($scope.farm);
    }

    promise.then(function (res) {
      $ionicHistory.goBack();
    }).catch(function (err) {
      $cordovaDialogs.alert('Data is not stored correctly. Try again.', 'Whoops!');
      console.error(err);
    }).finally(function () {
      LoadingAnimation.hide();
    });
  };

  $scope.startTracking = function () {
    $scope.farm.coords = [];
    var watch = $cordovaGeolocation.watchPosition({timeout: 10000, enableHighAccuracy: false});
    watch.then(null, function (err) {
      console.error(err)
    }, function (position) {
      var lat = position.coords.latitude;
      var long = position.coords.longitude;
      $scope.farm.coords.push([lat, long]);
      console.debug(lat+' '+long)
    });

    $scope.trackingInProgress = true;
    $scope.watch = watch;
  };

  $scope.stopTracking = function () {
    $scope.watch.clearWatch();
    $scope.trackingInProgress = false;
    $scope.farm.CalculatedArea = parseInt(CalculateAreaService.calculateAreaOfGPSPolygonOnEarthInSquareMeters($scope.farm.coords))
  };


});
