(function(module) {

  module.controller('CreateBusinessUserController', ['$scope', '$rootScope', 'businessUserService', 'roleService', 'BusinessUser', 'alertsService', '$state', '$log', 'clientDetails', 'roleDetails', 'ClientRole',
    function($scope, $rootScope, businessUserService, roleService, BusinessUser, alertsService, $state, $log, clientDetails, roleDetails, ClientRole) {

      $scope.businessuser = new BusinessUser();
      $scope.businessuser.clientRoles.push(new ClientRole());
      $scope.clientDetails = clientDetails.searchResults.results;
      $scope.roleDetails = roleDetails.searchResults.results;
      $scope.businessuser.pictureUrl = "aeturnum.jpg";
      $scope.businessuser.clientRoles[0].client = undefined;

      $scope.picUrl = function($evt) {
        Console.log("Selected Image :");
        Console.log($evt.files);

      };

      $scope.submitBusinessUserForm = function() {
        $rootScope.loader = true;
        businessUserService.createBusinessUser($scope.businessuser).then(function(response) {
          alertsService.addAlert({
            title: 'Success',
            message: 'BusinessUser "' + $scope.businessuser.firstName + '" successfully created',
            type: 'success',
            removeOnStateChange: 2
          });
          $rootScope.loader = false;
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
