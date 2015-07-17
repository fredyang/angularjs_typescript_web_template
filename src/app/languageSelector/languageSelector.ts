'use strict';

angular.module('ngGulp').directive('languageSelector', function (yiConfig, userLanguage) {

  return {

    restrict: 'E',

    scope: {},

    templateUrl: 'app/languageSelector/languageSelector.html',

    controller: function ($scope) {

      angular.extend($scope, {

        languages: yiConfig.supportedLanguages,

        selectedLang: userLanguage(),

        changeLanguage: function () {
          userLanguage(this.selectedLang);
        }

      });

    }
  };
});
