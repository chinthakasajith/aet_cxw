(function(module) {

  module.controller('SearchListsInternalController', ['$scope', 'listInternalService', 'alertsService', '$state', 'searchManager', 'modalService',
    function($scope, listInternalService, alertsService, $state, searchManager, modalService) {

      $scope.searchManager = searchManager;

      $scope.deleteProjectTeamList = function(internalLists) {

        var modalInstance = modalService.deleteModal(internalLists.title);
        modalInstance.result.then(function() {
          listInternalService.deleteListInternal(internalLists.id).then(function(data) {
            alertsService.addAlert({
              title: 'Success',
              message: "Successfully deleted '" + internalLists.title + "'",
              type: 'success'
            });
            searchManager.delete(internalLists.id);
          }, function(err) {
            alertsService.addAlert({
              title: 'Error',
              message: "Could not delete '" + internalLists.title + "'",
              type: 'error'
            });
          });
        });

      };

      $scope.editProjectTeamList = function(internalLists) {
        $state.go('index.secured.listsprojectteam.edit', {
          id: internalLists.id
        });
      };
    }
  ]);

})(angular.module('aet.screens.listsprojectteam'));
