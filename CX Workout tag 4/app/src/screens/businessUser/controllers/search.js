(function(module) {

  module.controller('SearchBusinessUserController', ['$scope', 'businessUserService', 'searchManager', '$state','alertsService', 'modalService',
    function($scope, businessUserService, searchManager, $state, alertsService,modalService) {
      $scope.searchManager = searchManager;

      $scope.deleteBusinessUser = function(businessuser) {

        var modalInstance = modalService.deleteModal(businessuser.firstName);
        modalInstance.result.then(function() {
        	businessUserService.deleteBusinessUser(businessuser.id).then(function(data) {
            alertsService.addAlert({
              title: 'Success',
              message: "Successfully deleted '" + businessuser.firstName + "'",
              type: 'success'
            });
            searchManager.delete(businessuser.id);
          }, function(err) {
            alertsService.addAlert({
              title: 'Error',
              message: "Could not delete '" + businessuser.firstName + "'",
              type: 'error'
            });
          });
        });

      };

      $scope.editBusinessUser = function(businessuser) {
        $state.go('index.secured.businessUser.edit', {
          id: businessuser.id
        });
      };
    }
  ]);

})(angular.module('aet.screens.businessUser'));
