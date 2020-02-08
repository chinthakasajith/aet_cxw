(function(module) {

  module.controller('ProjectNotificationController', ['$scope', '$rootScope', '$state', '$modalInstance', '$log', 'userDetails', 'clientDetails', 'projectDetails',
    function($scope, $rootScope, $state, $modalInstance, $log, userDetails, clientDetails, projectDetails) {


      $scope.clientDetails = clientDetails;
      $scope.projectDetails = projectDetails;
      $scope.userDetails = userDetails;

      $scope.selectProject = function(project) {
        projectDetails.setSelectedProject(project.id);
        $state.reload();
      }

      $scope.selectClient = function(client) {
        clientDetails.setSelectedClient(client.id);
        projectDetails.clear();
        $state.reload();
      };

      $scope.ok = function() {
        if (projectDetails.getAuthorizedProjects().length > 0) {
          $state.go('index.secured.mapview', {}, {
            reload: true
          });
          $rootScope.showLoader('Please Wait');
        };
        $modalInstance.close();
      };

      $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
      };



    }
  ]);

})(angular.module('aet.modals'));
