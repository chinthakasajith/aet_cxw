(function(module) {

  module.controller('CreateListsInternalController', ['$scope', 'ListInternal', 'userDetails', 'businessUserDetails', 'listInternalService', 'alertsService', '$modal', '$state', '$log', 'modalService',
    function($scope, ListInternal, userDetails, businessUserDetails, listInternalService, alertsService, $modal, $state, $log, modalService) {

      $scope.ListInternal = new ListInternal();
      $scope.ListInternal.creatorId = userDetails.getUserId();
      $scope.ListInternal.memberIds = [];
      $scope.teamLists = businessUserDetails.results;


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

      $scope.submitMissionInternal = function() {

	      if ($scope.ListInternal.memberIds.length == 0) {
	          alertsService.addAlert({
	            title: 'Error',
	            message: 'Project Team is Required.',
	            type: 'error',
	            removeOnStateChange: 2
	          });
	      }else{
		        listInternalService.createListInternal($scope.ListInternal).then(function(data) {
		          alertsService.addAlert({
		            title: 'Success',
		            message: 'List Internal "' + $scope.ListInternal.title + '" successfully created',
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
