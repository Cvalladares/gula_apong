var app = angular.module('Gula', ['ionic', 'Gula.controllers', 'LocalStorageModule', 'Gula.services', 'ngCordova']);

app.config(function ($stateProvider, $urlRouterProvider, $compileProvider) {
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|file|blob|cdvfile|content|tel|geo|mailto|sms|market):|data:image\//);

  $stateProvider

    .state('addFarm', {
      url: '/addFarm',
      templateUrl: 'templates/addFarm.html',
      controller: 'addFarmCtrl'
    })

    .state('addCustomer', {
      url: '/addCustomer',
      templateUrl: 'templates/addCustomer.html',
      controller: 'addCustomerCtrl'
    })


    .state('dashboardBuyer', {
      url: '/dashboardBuyer',
      templateUrl: 'templates/dashboardBuyer.html',
      controller: 'dashboardBuyerCtrl'
    })

    .state('dashboardMinister', {
      url: '/dashboardMinister',
      templateUrl: 'templates/dashboardMinister.html',
      controller: 'dashboardMinisterCtrl'
    })
    .state('dashboardProducer', {
      url: '/dashboardProducer',
      templateUrl: 'templates/dashboardProducer.html',
      controller: 'dashboardProducerCtrl'
    })

    .state('help', {
      url: '/help',
      templateUrl: 'templates/help.html',
      controller: 'helpCtrl'
    })

    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl'
    })

    .state('profile', {
      url: '/profile',
      templateUrl: 'templates/profile.html',
      controller: 'profile'
    })

    .state('myFarms', {
      url: '/myFarms',
      templateUrl: 'templates/myFarms.html',
      controller: 'myFarmsCtrl'
    })

    .state('myCustomers', {
      url: '/myCustomers',
      templateUrl: 'templates/myCustomers.html',
      controller: 'myCustomersCtrl'
    })

    .state('overviewOfPrice', {
      url: '/overviewOfPrice',
      templateUrl: 'templates/overviewOfPrice.html',
      controller: 'overviewOfPriceCtrl'
    })

    .state('overviewOfProducers', {
      url: '/overviewOfProducers',
      templateUrl: 'templates/overviewOfProducers.html',
      controller: 'overviewOfProducersCtrl'
    })

    .state('overviewOfSellers', {
      url: '/overviewOfSellers',
      templateUrl: 'templates/overviewOfSellers.html',
      controller: 'overviewOfSellersCtrl'
    })

    .state('productionOverview', {
      url: '/productionOverview',
      templateUrl: 'templates/productionOverview.html',
      controller: 'productionOverviewCtrl'
    })

    .state('addProduction', {
      url: '/addProduction',
      templateUrl: 'templates/addProduction.html',
      controller: 'addProduction'
    })

    .state('production', {
      url: '/production',
      templateUrl: 'templates/production.html',
      controller: 'production'
    })

    .state('signup', {
      url: '/signup',
      templateUrl: 'templates/signup.html',
      controller: 'signupCtrl'
    })

  // .state('myProfile', {
  //   url: '/myprofile',
  //  templateUrl: 'templates/myProfile.html',
  // controller: 'myProfileCtrl'
  //})

  $urlRouterProvider.otherwise('/login')
});

app.run(function ($ionicPlatform, PouchDBService) {
  $ionicPlatform.ready(function () {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }

    PouchDBService.initSyncForUser();

  });
});
