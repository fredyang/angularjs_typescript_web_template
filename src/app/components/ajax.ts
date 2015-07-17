module ngGulp {
  'use strict';

  angular.module('ngGulp').factory('ajax', function ($http) {

    return {
      login: function (username, password) {
        return $http.post('/login', {
          username: username,
          password: password
        });
      },

      logout: function () {
        return $http.post('/login');
      }

    };

  });
}
