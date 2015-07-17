
module ngGulp {

  'use strict';

  angular.module('ngGulp').config(function ($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) {

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html'
      })
      .state('tryout', {
        url: '/tryout',
        templateUrl: 'app/tryout/tryout.html'
      });

    $urlRouterProvider.otherwise('/');
  });
}
