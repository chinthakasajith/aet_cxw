(function(module) {

  module.service('missionEndpoint', ['$q', '$http', 'api', 'clientDetails', 'userDetails', 'projectDetails', 'CopyMissionDTO',
    function($q, $http, api, clientDetails, userDetails, projectDetails, CopyMissionDTO) {

      var controller = '/client/';

      this.createMission = function(request, type) {
        var urlExtension = '/' + type + '/mission'
        var createMissionURL = api('admin') + controller + clientDetails.getSelectedClient().id + '/project/' + projectDetails.getSelectedProject().id + urlExtension;
        return $http.post(createMissionURL, request);
      };

      this.editMission = function(request, type, sending) {
        var urlExtension = '/' + type + '/mission/' + request.id + '?sending=' + sending;
        var editMissionURL = api('admin') + controller + clientDetails.getSelectedClient().id + '/project/' + projectDetails.getSelectedProject().id + urlExtension;
        return $http.put(editMissionURL, request);
      };

      this.getMission = function(missionId, type) {
        var urlExtension = '/' + type + '/mission/' + missionId;
        var getMissionURL = api('admin') + controller + clientDetails.getSelectedClient().id + '/project/' + projectDetails.getSelectedProject().id + urlExtension;
        return $http.get(getMissionURL);
      };

      this.searchMission = function(searchQueryDTO, type) {
        var urlExtension = '/' + type + '/mission';
        var searchClientsURL = api('admin') + controller + clientDetails.getSelectedClient().id + '/project/' + projectDetails.getSelectedProject().id + urlExtension;
        return $http.get(searchClientsURL, {
          params: searchQueryDTO
        });
      };

      this.deleteMission = function(missionId, type) {
        var urlExtension = '/' + type + '/mission/' + missionId;
        var deleteMissionURL = api('admin') + controller + clientDetails.getSelectedClient().id + '/project/' + projectDetails.getSelectedProject().id + urlExtension;
        return $http.delete(deleteMissionURL);
      };

      this.setMissionToDraft = function(missionId, type) {
        var urlExtension = '/' + type + '/mission/' + missionId + '/draft';
        var draftingMissionURL = api('admin') + controller + clientDetails.getSelectedClient().id + '/project/' + projectDetails.getSelectedProject().id + urlExtension;
        return $http.put(draftingMissionURL);
      };
      
      this.copyMission = function(missionId) {
    	  var request = new CopyMissionDTO();
    	  request.creatorId = userDetails.getUserId();
    	  
          var urlExtension = '/mission/' + missionId + '/copy';
          var copyMissionURL = api('admin') + controller + clientDetails.getSelectedClient().id + '/project/' + projectDetails.getSelectedProject().id + urlExtension;
          return $http.post(copyMissionURL, request);
        };
    }

  ]);

})(angular.module('aet.endpoints'));
