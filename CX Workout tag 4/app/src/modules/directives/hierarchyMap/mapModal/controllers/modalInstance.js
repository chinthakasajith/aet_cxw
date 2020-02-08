(function (module) {

  module.controller('MapModalInstanceController', ['$scope', '$modalInstance', '$log',
    function ($scope, $modalInstance, $log) {

      $scope.ok = function () {
        $modalInstance.close();
      };

      $scope.edit = function () {
        console.log($scope.touchpointTitle, $scope.stageTitle);
        $modalInstance.close({
          title : $scope.stageTitle == undefined ? $scope.touchpointTitle : $scope.stageTitle,
          channel : $scope.channel
        });
      };

      $scope.save = function () {
        $modalInstance.close({
          title : $scope.title,
          channel : $scope.channel
        });
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    }
  ]);

})(angular.module('aet-directives-hierarchyMap'));
