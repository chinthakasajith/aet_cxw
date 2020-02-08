(function(module) {

  module.controller('ProjectSelectorController', ['$scope', '$state', '$modalInstance', '$log', 'userDetails', 'clientDetails', 'projectDetails',
    function($scope, $state, $modalInstance, $log, userDetails, clientDetails, projectDetails) {

      $scope.clientDetails = clientDetails;
      $scope.projectDetails = projectDetails;
      $scope.userDetails = userDetails;


      $scope.selectProject = function(project) {
        $scope.selectedProject=project;
      }


      $scope.ok = function() {
        $state.go('index.secured.mapview',{},{reload:true});
        $modalInstance.close();
      };

      $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
      };

    }
  ]);

})(angular.module('aet.modals'));
