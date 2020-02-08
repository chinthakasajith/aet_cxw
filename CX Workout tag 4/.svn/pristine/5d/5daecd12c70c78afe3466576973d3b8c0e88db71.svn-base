/**
 * Created by naveen.w
 */
(function(module) {

  module.directive('imageonload', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.bind('load', function() {
                    //call the function that was passed
                    scope.$apply(attrs.imageonload);
                });
            }
        };
    })
})(angular.module('aet-directives-image'));
