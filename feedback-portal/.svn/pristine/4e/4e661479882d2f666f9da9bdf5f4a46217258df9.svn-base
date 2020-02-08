(function(module) {

  module.controller('ModalInstanceController', ['$scope', '$modalInstance', '$log',
    function($scope, $modalInstance, $log) {

      $log.debug("ModalInstanceController");

      $scope.accept = function() {
        $modalInstance.close({
          status : 'accept'
        });
      };

      $scope.decline = function() {
        $modalInstance.close({
          status : 'decline'
        });
      };
    }
  ]);

})(angular.module('aet.modals'));
