'use strict';


describe('alertChange directive', function () {

  beforeEach(module('ngGulp'));

  it('call $elem.flash when model changed', function () {

    var $elem, scope;

    inject(function ($rootScope: any, $compile: any) {

      scope = $rootScope;

      scope.firstName = 'Yang';

      $elem = $('<div alert-change="firstName|bounce"></div>');

      spyOn($.fn, 'flash');

      $compile($elem)(scope);

      scope.$digest();

      expect($elem.flash).not.toHaveBeenCalled();

      scope.firstName = 'Fred';

      scope.$digest();

      expect($elem.flash).toHaveBeenCalledWith('bounce');

    });
  });

  it('call $elem.flash when all model changed', function () {

    var $elem, scope;

    inject(function ($rootScope, $compile) {

      scope = $rootScope;

      scope.firstName = 'Fred';
      scope.lastName = 'Yang';

      $elem = $('<div alert-change="firstName,lastName|bounce"></div>');

      spyOn($.fn, 'flash');

      $compile($elem)(scope);

      scope.$digest();

      expect($elem.flash).not.toHaveBeenCalled();

      scope.firstName = 'first';

      scope.$digest();

      expect($elem.flash).not.toHaveBeenCalled();

      scope.lastName = 'last';

      scope.$digest();

      expect($elem.flash).not.toHaveBeenCalled();

      scope.firstName += '1';
      scope.lastName += '1';

      scope.$digest();

      expect($elem.flash).toHaveBeenCalledWith('bounce');

    });
  });

  it('will not call $elem.flash when model changed but condition is not meet', function () {

    var $elem, scope;

    inject(function ($rootScope, $compile) {

      scope = $rootScope;

      scope.enabled = false;

      scope.firstName = 'Yang';

      $elem = $('<div alert-change="firstName|bounce|enabled"></div>');

      spyOn($.fn, 'flash');

      $compile($elem)(scope);

      scope.$digest();

      expect($elem.flash).not.toHaveBeenCalled();

      scope.firstName = 'Fred';

      scope.$digest();

      expect($elem.flash).not.toHaveBeenCalled();

    });
  });

});
