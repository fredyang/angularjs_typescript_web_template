'use strict';

// when firstName change, trigger bounce effect
//<div alert-change="firstName|bounce">

// when firstName, and last Name change, trigger bounce effect
//<div alert-change="firstName,lastName|bounce">

// when firstName, and last Name change, and enabled is truthy, trigger bounce effect
//<div alert-change="firstName,lastName|bounce|enabled">
angular.module('ngGulp').directive('alertChange', function () {

  function isAllItemsChanged(aItems, bItems) {

    if (!aItems || !bItems) {
      return false;
    }
    for (var i = 0; i < aItems.length; i++) {
      /*jshint -W116*/
      if (aItems[i] === bItems[i]) {
        return false;
      }
    }

    return true;
  }

  return function (scope, $elem, attrs) {
    var parts = attrs.alertChange.split('|');

    var modelExpression = parts[0],
      className = parts[1],
      conditionExpression = parts[2];


    var groupExpression = modelExpression.split(',');

    if (groupExpression.length > 1) {

      var oldItems;

      //angular $watchGroup
      scope.$watchGroup(groupExpression, function (newItems) {

        var changed = isAllItemsChanged(newItems, oldItems);
        oldItems = angular.copy(newItems);
        if (changed &&
          (!conditionExpression || (conditionExpression && scope.$eval(conditionExpression)))
        ) {
          $elem.flash(className);
        }
      });

    } else {

      scope.$watch(modelExpression, function (newValue, oldValue) {

        //do not run the code for the first call (oldValue === newValue)
        /*jshint -W116*/
        if ((oldValue !== newValue) &&
          (!conditionExpression || (conditionExpression && scope.$eval(conditionExpression)))
        ) {
          $elem.flash(className);
        }
      });
    }
  };
});
