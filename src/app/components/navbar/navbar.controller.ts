module ngGulp {
  'use strict';

  interface INavbarScope extends ng.IScope {
    date: Date
  }

  class NavbarCtrl {
    /* @ngInject */
    constructor ($scope: INavbarScope) {
      $scope.date = new Date();
    }
  }

  angular.module('ngGulp').controller('NavbarCtrl', NavbarCtrl);

}
