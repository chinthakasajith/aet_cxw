(function(module) {

  module.controller('SearchListsEmployeeController', ['$scope', 'listEmployeeService', 'alertsService', '$state', 'searchManager', 'modalService',
    function($scope, listEmployeeService, alertsService, $state, searchManager, modalService) {

      $scope.searchManager = searchManager;

            console.log(searchManager);
            console.log("hi");

      $scope.deleteEmployeeList = function(employeeLists) {

        var modalInstance = modalService.deleteModal(employeeLists.title);
        modalInstance.result.then(function() {
          listEmployeeService.deletelistEmployee(employeeLists.id).then(function(data) {
            alertsService.addAlert({
              title: 'Success',
              message: "Successfully deleted '" + employeeLists.title + "'",
              type: 'success'
            });
            searchManager.delete(employeeLists.id);
          }, function(err) {
            alertsService.addAlert({
              title: 'Error',
              message: "Could not delete '" + employeeLists.title + "'",
              type: 'error'
            });
          });
        });

      };

      $scope.editEmployeeList = function(employeeLists) {
        $state.go('index.secured.listsemployee.edit', {
          id: employeeLists.id
        });
      };
    }
  ]);

})(angular.module('aet.screens.listsemployee'));
