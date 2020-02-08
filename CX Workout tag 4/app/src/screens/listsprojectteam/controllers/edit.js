(function(module) {

  module.controller('EditListsInternalController', ['$scope', 'ListInternal', 'userDetails', 'listsprojectteam', 'businessUserDetails', 'listInternalService', 'alertsService', '$modal', '$state', '$log', 'modalService',
    function($scope, ListInternal, userDetails, listsprojectteam, businessUserDetails, listInternalService, alertsService, $modal, $state, $log, modalService) {

      $scope.ListInternal = listsprojectteam;
      $scope.teamLists = businessUserDetails.results;
      var selectedArray = listsprojectteam.members;
      $scope.ListInternal.members = [];
      for (var i = 0; selectedArray.length > i; i++) {
        $scope.ListInternal.members.push(selectedArray[i].id);
      }

      $scope.toggleSelection = function toggleSelection(teamlist) {
        var idx = $scope.ListInternal.members.indexOf(teamlist);

        // is currently selected
        if (idx > -1) {
          $scope.ListInternal.members.splice(idx, 1);
        }

        // is newly selected
        else {
          $scope.ListInternal.members.push(teamlist);
        }
      };

      $scope.submitMissionInternal = function() {

    	  if ($scope.ListInternal.members.length == 0) {
              alertsService.addAlert({
                title: 'Error',
                message: 'Project Team is Required.',
                type: 'error',
                removeOnStateChange: 2
              });
          }else{
		        listInternalService.updateListInternal($scope.ListInternal).then(function(data) {
		          alertsService.addAlert({
		            title: 'Success',
		            message: 'List Internal "' + $scope.ListInternal.title + '" successfully updated',
		            type: 'success',
		            removeOnStateChange: 2
		          });
		          $state.go('index.secured.listsprojectteam.search');
		        }, function(err) {
		          //console.error('Could not create project', err);
		        });
          }

      }


    }
  ]);

})(angular.module('aet.screens.listsprojectteam'));
