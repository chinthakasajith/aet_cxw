(function(module) {

  module.service('projectEndpoint', ['$q', '$http', 'api', 'clientDetails', 'userDetails', 'CopyProjectDTO',
    function($q, $http, api, clientDetails, userDetails, CopyProjectDTO) {

      this.createProject = function(project) {
        var createProjectUrl = api('admin') + '/client/' + clientDetails.getSelectedClient().id + '/project'
        return $http.post(createProjectUrl, project);
      };

      this.updateProject = function(project) {
        var url = api('admin') + '/client/' + clientDetails.getSelectedClient().id + '/project/' + project.id;
        return $http.put(url, project);
      };

      this.findProject = function(id) {
        var url = api('admin') + '/client/' + clientDetails.getSelectedClient().id + '/project/' + id;
        return $http.get(url);
      };

      this.listProject = function(params) {
        var listProjectURL = api('admin') + '/client/' + clientDetails.getSelectedClient().id + '/businessuser/' + userDetails.getUserId() + '/project';
        return $http.get(listProjectURL, {
          params: params
        });
      };

      this.listProjectsBySelectedClient = function(client) {
        var listProjectURL = api('admin') + '/client/' + client.id + '/businessuser/' + userDetails.getUserId() + '/project';
        return $http.get(listProjectURL, {
        	params: {count: 0}
        });
      };

      this.deleteProject = function(id) {
        var url = api('admin') + '/client/' + clientDetails.getSelectedClient().id + '/project/' + id;
        return $http.delete(url);
      };

      this.listAllProject = function(params) {
        var listAllProjectURL = api('admin') + '/project';
        return $http.get(listAllProjectURL, {
          params: params
        });
      };

      this.changeSelectedChannel = function(channel,projectId) {
        var changeChannelUrl = api('admin') + '/client/' + clientDetails.getSelectedClient().id + '/project/'+projectId+'/channel/'+channel.channelId;
        return $http.post(changeChannelUrl, channel);
      };

      this.sendTestMail = function(testEmail) {
        var sendtestemailUrl = api('admin') + '/client/' + clientDetails.getSelectedClient().id + '/sendtestemail';
        return $http.post(sendtestemailUrl, testEmail);
      };
      
      this.copyProject = function(id) {
    	  var request = new CopyProjectDTO();
    	  request.creatorId = userDetails.getUserId();
    	  
          var copyProjectURL = api('admin') + '/client/' + clientDetails.getSelectedClient().id + '/project/' + id + '/copy';
          return $http.post(copyProjectURL, request);
        };
    }
  ]);

})(angular.module('aet.endpoints'));
