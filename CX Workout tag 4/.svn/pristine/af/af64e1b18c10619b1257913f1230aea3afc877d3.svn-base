(function(module) {

  module.controller('EditBusinessUserController', ['$scope', '$rootScope', 'businessUserService', 'clientDetails', 'projectDetails', 'localStorageService', 'BusinessUser', 'alertsService', '$state', '$log', 'clientLists', 'projectDetails', 'roleDetails', 'businessuser',
    function($scope, $rootScope, businessUserService, clientDetails, projectDetails, localStorageService, BusinessUser, alertsService, $state, $log, clientLists, projectDetails, roleDetails, businessuser) {

      $scope.businessuser = angular.copy(businessuser);
      $scope.clientLists = clientLists.searchResults.results;
      $scope.roleDetails = roleDetails.searchResults.results;
      $scope.clientDetails = clientDetails;

      if ($scope.businessuser.isSuperAdmin) {
        $scope.roleDetails = roleDetails.searchResults.results;
      } else {
        $scope.$watchCollection(function() {
          return $scope.businessuser.clientRoles[0].role
        }, function(newValue, oldValue) {
          console.log(newValue);
          console.log(oldValue);

          if (angular.equals(businessuser.clientRoles[0].role.id, 3) && !angular.equals(newValue, 3)) {
            console.log("Cant update");
          };

          if ((!angular.equals(businessuser.clientRoles[0].role.id, 3)) && angular.equals(role.id, 3)) {
            console.log("Cant update");
          }
        });
        /*angular.forEach(roleDetails.searchResults.results, function(role, key) {

          if (angular.equals($scope.businessuser.clientRoles[0].role.id, 3) && angular.equals(role.id, 3)) {
            $scope.roleDetails.push(role);
          };

          if ((!angular.equals($scope.businessuser.clientRoles[0].role.id, 3)) && !angular.equals(role.id, 3)) {
            $scope.roleDetails.push(role);
          }
        });*/
      }

      $scope.submitBusinessUserForm = function() {
        $rootScope.loader = true;
        var selectedProjectId = projectDetails.getSelectedProject().id;
        clientDetails.clear();
        //this if condition is added because super user does not have client roles
        if (angular.isDefined($scope.businessuser.clientRoles[0]))
          $scope.clientDetails.setSelectedClient($scope.businessuser.clientRoles[0].client.id);
        businessUserService.updateBusinessUser($scope.businessuser).then(function(response) {
          alertsService.addAlert({
            title: 'Success',
            message: 'BusinessUser "' + $scope.businessuser.firstName + '" successfully updated',
            type: 'success',
            removeOnStateChange: 2
          });
          $rootScope.loader = false;
          //updating changed BU details
          projectDetails.clear();
          localStorageService.set('projectId', selectedProjectId);
          $state.go('index.secured.businessUser.search', {}, {
            reload: true
          });
        }, function(err) {
          $rootScope.loader = false;
        });

      };

    }
  ]);

})(angular.module('aet.screens.businessUser'));
