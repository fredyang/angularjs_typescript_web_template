
module ngGulp {

  'use strict';

  angular.module('ngGulp').config(function ($provide) {

    $provide.decorator('ajax', function ($delegate, $q) {


      angular.extend($delegate, {

        login: function (userName, password) {

          return $q.when(true);

        }
      });

      return $delegate;

    });


  });
}
