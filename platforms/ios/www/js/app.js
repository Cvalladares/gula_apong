var app = angular.module('Gula', ['ionic', 'Gula.controllers','LocalStorageModule', 'Gula.services']);

app.config(function ($stateProvider, $urlRouterProvider, $compileProvider) {
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|file|blob|cdvfile|content|tel|geo|mailto|sms|market):|data:image\//);

  $stateProvider


    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl'
    })

    .state('signup', {
      url: '/signup',
      templateUrl: 'templates/signup.html',
      controller: 'signupCtrl'
    })

    .state('salesToday', {
      url: '/saleentry',
      templateUrl: 'templates/salesToday.html',
      controller: 'salesTodayCtrl'
    })

    .state('myFarm', {
      url: '/myfarm',
      templateUrl: 'templates/myFarm.html',
      controller: 'myFarmCtrl'
    })

    .state('dashboard', {
      url: '/dashboard',
      templateUrl: 'templates/dashboard.html',
      controller: 'dashboardCtrl'
    })
    .state('myProfile', {
      url: '/myprofile',
      templateUrl: 'templates/myProfile.html',
      controller: 'myProfileController'
    });

  $urlRouterProvider.otherwise('/dashboard')
});

app.run(function ($ionicPlatform) {
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

  });
});
