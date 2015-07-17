
module ngGulp {
  'use strict';

  angular.module('ngGulp').controller('tryoutController', function ($scope, resource) {

    angular.extend($scope, {
      countryCode: '',
      maxlength: 0
    });

    resource.onChanged(function () {
      $scope.countries = resource.get('countries');
    }, $scope);

  });

}
