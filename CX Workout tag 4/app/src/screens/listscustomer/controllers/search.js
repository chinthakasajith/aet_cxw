(function(module) {

  module.controller('SearchListsCustomerController', ['$scope', 'listCustomerService', 'alertsService', '$state', 'searchManager', 'modalService',
    function($scope, listCustomerService, alertsService, $state, searchManager, modalService) {

      $scope.searchManager = searchManager;

      $scope.deleteCustomerList = function(customerLists) {

        var modalInstance = modalService.deleteModal(customerLists.title);
        modalInstance.result.then(function() {
          listCustomerService.deletelistCustomer(customerLists.id).then(function(data) {
            alertsService.addAlert({
              title: 'Success',
              message: "Successfully deleted '" + customerLists.title + "'",
              type: 'success'
            });
            searchManager.delete(customerLists.id);
          }, function(err) {
            alertsService.addAlert({
              title: 'Error',
              message: "Could not delete '" + customerLists.title + "'",
              type: 'error'
            });
          });
        });

      };

      $scope.editCustomerList = function(customerLists) {
        $state.go('index.secured.listscustomer.edit', {
          id: customerLists.id
        });
      };
    }
  ]);

})(angular.module('aet.screens.listscustomer'));
