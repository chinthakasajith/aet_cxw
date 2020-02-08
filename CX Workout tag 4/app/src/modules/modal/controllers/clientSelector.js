(function(module) {

  module.controller('ClientSelectorController', ['$scope', '$state', '$modalInstance', '$log', 'userDetails', 'clientDetails', 'projectDetails',
    function($scope, $state, $modalInstance, $log, userDetails, clientDetails, projectDetails) {

      $scope.clientDetails = clientDetails;
      $scope.projectDetails = projectDetails;
      $scope.userDetails = userDetails;

      $scope.selectProject = function(project) {
        $scope.selectedProject = project;
      }

      $scope.ok = function() {
        $modalInstance.close({
          selectedProject : $scope.selectedProject,
          selectedClient : $scope.client
        });
      };

      $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
      };

    }
  ]);

})(angular.module('aet.modals'));
