(function(module) {

  module.controller('ChangeDefaultChannelController', ['$scope', '$state', '$modalInstance', '$log',
    function($scope, $state, $modalInstance, $log) {


      $scope.change = function() {
        $modalInstance.close({
          changedTitle : $scope.changedChannelTitle
        });
      };

      $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
      };

    }
  ]);

})(angular.module('aet.modals'));
