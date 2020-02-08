(function(module) {

  module.controller('SearchCustomerMissionController', ['$scope', 'missionCustomerService', 'alertsService', '$state', 'searchManager', 'modalService', '$rootScope',
    function($scope, missionCustomerService, alertsService, $state, searchManager, modalService, $rootScope) {

      $scope.searchManager = searchManager;

      $scope.deleteProjectTeamMission = function(internalmission) {

        var message = "Are you sure, you want to delete " + internalmission.title + "?";

        if (angular.equals(internalmission.status, "Live") || angular.equals(internalmission.status, "Closed")) {
          message = "Would you like to delete Mission " + internalmission.title + ".  This would delete all data collected so far on the Mission. Do you wish to continue?";
        } else if (angular.equals(internalmission.status, "Scheduled")) {
          message = "Do you want to delete this Mission? There is no way to retrieve it once deleted.";
        }

        var modalInstance = modalService.customDeleteModal(internalmission.title, message);
        modalInstance.result.then(function() {
        	missionCustomerService.deleteMission(internalmission.id).then(function(data) {
            alertsService.addAlert({
              title: 'Success',
              message: "Successfully deleted '" + internalmission.title + "'",
              type: 'success'
            });
            searchManager.delete(internalmission.id);
          }, function(err) {
            alertsService.addAlert({
              title: 'Error',
              message: "Could not delete '" + internalmission.title + "'",
              type: 'error'
            });
          });
        });

      };

      $scope.editProjectTeamMission = function(internalmission) {

        if (angular.equals(internalmission.status, "Scheduled")) {
          var message = "Going beyond this point will change the Mission's status to Draft.  Do you Accept?"
          var modalInstance = modalService.customEditModal(internalmission.title, message, 'Yes', 'No');
          modalInstance.result.then(function() {
        	  missionCustomerService.setMissionToDraft(internalmission.id).then(function(data) {
                  alertsService.addAlert({
                    title: 'Success',
                    message: "Successfully updated the status of '" + internalmission.title + "'",
                    type: 'success'
                  });
                  $scope.loadEditScreen(internalmission);
                }, function(err) {
                  alertsService.addAlert({
                    title: 'Error',
                    message: "Could not update the status of '" + internalmission.title + "'",
                    type: 'error'
                  });
                });
          });
        } else {
          $scope.loadEditScreen(internalmission);
        }
      };
      
      $scope.copyMission = function(internalmission) {

          var message = "Are you sure you want to create a copy of " + internalmission.title + "?";

          var modalInstance = modalService.customCopyModal(internalmission.title, message, 'Yes', 'No');
          modalInstance.result.then(function() {
        	$rootScope.showLoader('Copying...');
        	missionCustomerService.copyMission(internalmission.id).then(function(data) {
              alertsService.addAlert({
                title: 'Success',
                message: "Successfully created a copy of '" + internalmission.title + "'",
                type: 'success'
              });
              $scope.loadEditScreen(data);
            }, function(err) {
              $rootScope.hideLoader();
              alertsService.addAlert({
                title: 'Error',
                message: "Could not create a copy of '" + internalmission.title + "'",
                type: 'error'
              });
            });
          });

        };

      $scope.loadEditScreen = function(internalmission) {
        $state.go('index.secured.customermission.edit', {
          id: internalmission.id
        });
      };

    }
  ]);

})(angular.module('aet.screens.missioncustomer'));
