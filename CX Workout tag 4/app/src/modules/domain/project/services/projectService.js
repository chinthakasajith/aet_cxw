(function(module) {

  module.service('projectService', ['projectEndpoint', 'projectTransformer', '$q', '$log', 'ChangeChannelDTO', 'clientDetails', 'ClientRole', 'userDetails',
    function(projectEndpoint, projectTransformer, $q, $log, ChangeChannelDTO, clientDetails, ClientRole, userDetails) {

      this.createProject = function(project) {
        var dto = projectTransformer.projectToCreateDTO(project);
        return projectEndpoint.createProject(dto).then(function(response) {
          return response.data;
        }, function(err) {
          $log.debug("Could not create project", err);
          return $q.reject(err);
        });

      };

      this.deleteProject = function(projectId) {
        return projectEndpoint.deleteProject(projectId).then(function(response) {
          return response.data;
        }, function(err) {
          $log.debug("Could not delete project", err);
          return $q.reject(err);
        });
      };

      this.updateProject = function(project) {
        var projectChannelArrayLength=project.channels.length;
        for (var i = 0; i < projectChannelArrayLength; i++) {
          if (angular.isObject(project.channels[i])) {
              project.channels.splice(i,1);
              projectChannelArrayLength--;
              i--;
          }
        }
        var dto = projectTransformer.projectToUpdateDTO(project);

        return projectEndpoint.updateProject(dto).then(function(response) {
          return response.data;
        }, function(err) {
          $log.debug("Could not update project", err);
          return $q.reject(err);
        });
      };


      this.findProject = function(id) {

        return projectEndpoint.findProject(id).then(function(response) {
          return projectTransformer.DTOToProject(response.data);
        }, function(err) {
          //console.error("Could not load project");
          return $q.reject(err);
        });
      };

      this.searchProject = function(params) {
        return projectEndpoint.listProject(params).then(function(dto) {
          return projectTransformer.searchDTOToSearchResults(dto);
        }, function(err) {
          //console.error("Could not search project", err);
          return $q.reject(err);
        });

      };

      this.getProjectsBySelectedClient = function(client) {
        return projectEndpoint.listProjectsBySelectedClient(client).then(function(dto) {
          return projectTransformer.searchDTOToSearchResults(dto);
        }, function(err) {
          //console.error("Could not search project", err);
          return $q.reject(err);
        });

      };

      this.searchAllProject = function(params) {
        return projectEndpoint.listAllProject(params).then(function(dto) {
          return projectTransformer.searchDTOToSearchResults(dto);
        }, function(err) {
          //console.error("Could not search all project", err);
          return $q.reject(err);
        });

      };

      this.changeSelectedChannel = function(channel, projectId) {
        var dto = projectTransformer.channelToChangeChannelDTO(channel);
        return projectEndpoint.changeSelectedChannel(dto, projectId).then(function(response) {
          return response.data;
        }, function(err) {
          $log.debug("Could not change channel title", err);
          return $q.reject(err);
        });

      };

      this.sendTestMail = function(testEmail) {
        var dto = projectTransformer.testEmailToSendTestEmailDTO(testEmail);
        return projectEndpoint.sendTestMail(dto).then(function(response) {
          return response.data;
        }, function(err) {
          $log.debug("Could not send test e-mail", err);
          return $q.reject(err);
        });

      };
      
      this.copyProject = function(id) {

        return projectEndpoint.copyProject(id).then(function(response) {
          
          return projectTransformer.DTOToProject(response.data);
        }, function(err) {
          console.error("Could not copy project");
          return $q.reject(err);
        });
      };


    }
  ]);

})(angular.module('aet.domain.project'));
