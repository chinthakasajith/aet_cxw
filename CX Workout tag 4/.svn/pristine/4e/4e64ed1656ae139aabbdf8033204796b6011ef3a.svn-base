(function(module) {

  module.controller('ModalInstanceController', ['$scope', '$modalInstance', '$log',
    function($scope, $modalInstance, $log) {

      $log.debug("ModalInstanceController");

      $scope.ok = function() {
        $modalInstance.close();
      };

      $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
      };

      $scope.add = function() {
        $modalInstance.close({
          title: $scope.newChanel
        });
      };

    }
  ]);

})(angular.module('aet.modals'));
