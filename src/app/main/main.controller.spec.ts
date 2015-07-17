'use strict';

describe('controllers', function(){
  var scope;



  beforeEach(module('ngGulp'));

  beforeEach(inject(function($rootScope: any) {
    scope = $rootScope.$new();
  }));

  it('should define more than 5 awesome things', inject(function($controller: any) {
    expect(scope.awesomeThings).toBeUndefined();

    $controller('MainCtrl', {
      $scope: scope
    });

    expect(angular.isArray(scope.awesomeThings)).toBeTruthy();
    expect(scope.awesomeThings.length === 10).toBeTruthy();
  }));
});
