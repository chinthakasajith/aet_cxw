(function(module) {

  module.controller('CreateMissionSendController', ['$scope', '$modalInstance', '$log',
    function($scope, $modalInstance, $log) {

      $scope.yes = function() {
        $modalInstance.close({
          send : true
        });
      };

      $scope.no = function() {
        $modalInstance.close({
          send : false
        });
      };

    }
  ]);

})(angular.module('aet.modals'));
