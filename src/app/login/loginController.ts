
module ngGulp {
  'use strict';

  angular.module('ngGulp').controller('loginController', function ($scope, ajax, $location) {

    angular.extend($scope, {
      userName: '',
      password: '',
      login: function () {
        ajax.login($scope.userName, $scope.password).then(function () {
          $location.path('/');
        });
      }
    });

  });
}
