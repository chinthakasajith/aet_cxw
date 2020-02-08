(function(module) {

  module.controller('ProjectTeamController', ['$scope', '$modalInstance', 'ListInternal', 'businessUserService', 'listInternalService', 'alertsService', 'userDetails', '$log',
    function($scope, $modalInstance, ListInternal, businessUserService, listInternalService, alertsService, userDetails, $log) {

      businessUserService.searchBusinessUserByClientId({
        count: 0,
        page: 0,
        sme: false
      }).then(function(response) {
        $scope.teamLists = response.results;
      });
      $scope.ListInternal = new ListInternal();
      $scope.ListInternal.creatorId = userDetails.getUserId();
      $scope.ListInternal.memberIds = [];

      $scope.toggleSelection = function toggleSelection(teamlist) {
        var idx = $scope.ListInternal.memberIds.indexOf(teamlist);

        // is currently selected
        if (idx > -1) {
          $scope.ListInternal.memberIds.splice(idx, 1);
        }

        // is newly selected
        else {
          $scope.ListInternal.memberIds.push(teamlist);
        }
      };

      $scope.ok = function() {
        listInternalService.createListInternal($scope.ListInternal).then(function(data) {
          $scope.ListInternal.id = data.id;
          alertsService.addAlert({
            title: 'Success',
            message: 'List Internal "' + $scope.ListInternal.title + '" successfully created',
            type: 'success',
            removeOnStateChange: 2
          });
          $modalInstance.close({
            newTeam: $scope.ListInternal
          });
        });

      };

      $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
      };
    }
  ]);

})(angular.module('aet.modals'));
