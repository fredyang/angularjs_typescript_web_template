
module ngGulp {
  'use strict';

  angular.module('ngGulp').run(function (yiConfig) {
    yiConfig.resourcePath = 'app/resource/';
    yiConfig.supportedLanguages.zh = '中文';
  });
}
