(function(module) {

  module.controller('ViewManageAccountController', ['$scope', '$rootScope', 'businessUserService', 'clientDetails', 'BusinessUser', 'alertsService', '$state', '$log', 'clientLists', 'projectDetails', 'roleDetails', 'businessuser',
    function($scope, $rootScope, businessUserService, clientDetails, BusinessUser, alertsService, $state, $log, clientLists, projectDetails, roleDetails, businessuser) {

      $scope.businessuser = businessuser;
      $scope.clientLists = clientLists.searchResults.results;
      $scope.roleDetails = roleDetails.searchResults.results;
      $scope.clientDetails = clientDetails;

      $scope.submitBusinessUserForm = function() {
        $rootScope.loader = true;
        clientDetails.clear();
        $scope.clientDetails.setSelectedClient($scope.businessuser.clientRoles[0].client.id);
        projectDetails.clear();
        businessUserService.updateBusinessUser($scope.businessuser).then(function(response) {
          alertsService.addAlert({
            title: 'Success',
            message: 'BusinessUser "' + $scope.businessuser.firstName + '" successfully updated',
            type: 'success',
            removeOnStateChange: 2
          });
          $rootScope.loader = false;
        }, function(err) {
          $rootScope.loader = false;
        });

      };

    }
  ]);

})(angular.module('aet.screens.businessUser'));
