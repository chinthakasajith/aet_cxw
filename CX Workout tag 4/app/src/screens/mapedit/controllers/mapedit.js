(function (module) {

  module.controller('MapEditController', ['$scope', '$rootScope', 'HierarchyMapService', 'mapService', 'mapData', 'projectDetails', '$log', 'modalService', 'alertsService', '$state',
    function ($scope, $rootScope, HierarchyMapService, mapService, mapData, projectDetails, $log, modalService, alertsService, $state) {

      var channels = HierarchyMapService.getMapData().channels;
      $rootScope.hideLoader();

      $scope.addStage = function () {
        HierarchyMapService.addStage(mapService.createStage, mapService.getMapData);
      };

      $scope.editStage = function (stage) {
        HierarchyMapService.editStage(stage, mapService.updateStage, mapService.getMapData);
      };

      $scope.addTouchpoint = function (stage) {
        HierarchyMapService.addTouchpoint(stage, mapService.createTouchpoint, mapService.getMapData);
      };

      $scope.editTouchpoint = function (stage, touchpoint) {
        HierarchyMapService.editTouchpoint(stage, touchpoint, mapService.updateTouchpoint, mapService.getMapData);
      };

      $scope.addAction = function (stage, touchpoint) {
        HierarchyMapService.addAction(stage, touchpoint, channels, mapService.createAction, mapService.getMapData);
      };

      $scope.editAction = function (stage, touchpoint,action) {
        HierarchyMapService.editAction(stage, touchpoint, action, channels, mapService.updateAction, mapService.getMapData);
      };

      $scope.delete = function (stageId, touchPointId, actionId) {
        HierarchyMapService.delete(stageId, touchPointId, actionId, mapService.deleteStage, mapService.deleteTouchpoint, mapService.deleteAction, mapService.getMapData)
      }
      
      $scope.copy = function() {

     	 var project = projectDetails.getSelectedProject();
     	 var message = "Are you sure you want to create a copy of " + project.title + "?";

          var modalInstance = modalService.customCopyModal(project.title, message, 'Yes', 'No');
          modalInstance.result.then(function() {
          $rootScope.showLoader('Copying...');
          mapService.copyMap(project.id).then(function(data) {
              alertsService.addAlert({
                title: 'Success',
                message: "Successfully created a copy of '" + project.title + "'",
                type: 'success'
              });
              $scope.editProject(data);
            }, function(err) {
              $rootScope.hideLoader();
              alertsService.addAlert({
                title: 'Error',
                message: "Could not create a copy of '" + project.title + "'",
                type: 'error'
              });
            });
          });

        };
       
       
       
       $scope.editProject = function(project) {
    	   $log.debug("EDIT");
    	   $state.go('index.secured.project.edit', {projectId:project.id}, {
               reload: true
             });
			
			$rootScope.hideLoader();
       }

    }
  ]);

})(angular.module('aet.screens.mapedit'));
