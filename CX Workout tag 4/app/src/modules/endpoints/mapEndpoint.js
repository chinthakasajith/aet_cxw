(function(module) {

  module.service('mapEndpoint', ['$q', '$http', 'api', 'clientDetails', 'projectDetails', 'CopyMapDTO', 'userDetails',
    function($q, $http, api, clientDetails, projectDetails, CopyMapDTO, userDetails) {

      this.createStage = function(stage) {
        var createStageUrl = api('admin') + '/client/' + clientDetails.getSelectedClient().id + '/project/' + projectDetails.getSelectedProject().id + '/map/stage';
        return $http.post(createStageUrl, stage);
      };

      this.editStage = function(stage) {

        var url = api('admin') + '/client/' + clientDetails.getSelectedClient().id + '/project/' + projectDetails.getSelectedProject().id + '/map/stage/' + stage.stageId;
        return $http.put(url, stage);
      };

      this.deleteStage = function(stageId) {
        var url = api('admin') + '/client/' + clientDetails.getSelectedClient().id + '/project/' + projectDetails.getSelectedProject().id + '/map/stage/' + stageId;
        return $http.delete(url);
      };

      this.getMapData = function() {
        var url = api('admin') + '/client/' + clientDetails.getSelectedClient().id + '/project/' + projectDetails.getSelectedProject().id + '/map';
        return $http.get(url);
      };

      this.createTouchpoint = function(touchpoint) {
        var createTouchpointUrl = api('admin') + '/client/' + clientDetails.getSelectedClient().id + '/project/' + projectDetails.getSelectedProject().id + '/map/stage/' + touchpoint.stageId + '/touchpoint';
        return $http.post(createTouchpointUrl, touchpoint);
      };

      this.editTouchpoint = function(touchpoint) {
        console.log(touchpoint)
        var url = api('admin') + '/client/' + clientDetails.getSelectedClient().id + '/project/' + projectDetails.getSelectedProject().id + '/map/stage/' + touchpoint.stageId + '/touchpoint/' + touchpoint.touchpointId;
        return $http.put(url, touchpoint);
      };

      this.deleteTouchpoint = function(stageId, touchpointId) {
        var url = api('admin') + '/client/' + clientDetails.getSelectedClient().id + '/project/' + projectDetails.getSelectedProject().id + '/map/stage/' + stageId + '/touchpoint/' + touchpointId;
        return $http.delete(url);
      };

      this.createAction = function(action) {
        var createActionUrl = api('admin') + '/client/' + clientDetails.getSelectedClient().id + '/project/' + projectDetails.getSelectedProject().id + '/map/stage/' + action.stageId + '/touchpoint/' + action.touchpointId + '/action';
        return $http.post(createActionUrl, action);
      };

      this.editAction = function(action) {
        console.log(action)
        var url = api('admin') + '/client/' + clientDetails.getSelectedClient().id + '/project/' + projectDetails.getSelectedProject().id + '/map/stage/' + action.stageId + '/touchpoint/' + action.touchpointId + '/action/' + action.actionId;
        return $http.put(url, action);
      };

      this.deleteAction = function(stageId, touchpointId, actonId) {
        var url = api('admin') + '/client/' + clientDetails.getSelectedClient().id + '/project/' + projectDetails.getSelectedProject().id + '/map/stage/' + stageId + '/touchpoint/' + touchpointId + '/action/' + actonId;
        return $http.delete(url);
      };

      this.getProjectsByCliendId = function(stageId, touchpointId, title) {

      }
      
      this.copyMap = function(id) {
    	var request = new CopyMapDTO();
    	request.creatorId = userDetails.getUserId();
    	  
        var copyMapURL = api('admin') + '/client/' + clientDetails.getSelectedClient().id + '/project/' + id + '/copy';
        return $http.post(copyMapURL, request);
      };

    }
  ]);

})(angular.module('aet.endpoints'));
