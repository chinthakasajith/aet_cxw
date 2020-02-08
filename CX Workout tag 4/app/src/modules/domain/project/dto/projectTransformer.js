(function(module) {

  module.service('projectTransformer', ['Project', 'genericTransformer', 'clientRoleTransformer', '$log', 'CreateProjectDTO', 'UpdateProjectDTO','ChangeChannelDTO','SendTestEmailDTO',
    function(Project, genericTransformer, clientRoleTransformer, $log, CreateProjectDTO, UpdateProjectDTO,ChangeChannelDTO,SendTestEmailDTO) {

      this.DTOToProject = function(dto) {

        var project = genericTransformer.DTOToObject(dto, Project);
        project.projectAdmins = dto.projectAdmins;
        project.projectLeaders = dto.projectLeaders;
        project.projectSupportMembers = dto.projectSupportMembers;
        project.projectTeamMembers = dto.projectTeamMembers;
        project.projectSMEIds=dto.projectSMEs;
        project.client = dto.client;
        project.startDate = new Date(dto.startDate);
        project.endDate = new Date(dto.endDate);
        return project;
      };

      this.DTOToProjects = function(dto) {
        return _.map(dto, this.DTOToProject);
      };

      this.searchDTOToSearchResults = function(dto) {
        var searchResults = genericTransformer.DTOToSearchResults(dto.data);

        for (var key in dto.data.projects) {

          dto.data.projects[key].creatorName = dto.data.projects[key].creator.firstName + " " + dto.data.projects[key].creator.lastName;
          var startDate = new Date(dto.data.projects[key].startDate);
          var endDate = new Date(dto.data.projects[key].endDate);
          dto.data.projects[key].startDate = startDate.getMonth() + 1 + "/" + startDate.getDate() + "/" + startDate.getFullYear();
          dto.data.projects[key].endDate = endDate.getMonth() + 1 + "/" + endDate.getDate() + "/" + endDate.getFullYear();


        }
        searchResults.results = dto.data.projects;
        return searchResults;
      };

      this.loginDTOToProject = function(dto) {
        var project = genericTransformer.DTOToObject(dto, Project);
        project.id = dto.userId;
        project.email = dto.email;
        return project;
      };

      this.projectToCreateDTO = function(project) {
        var dto = genericTransformer.objectToDTO(project, CreateProjectDTO);
        dto.projectLeaderIds = project.projectLeaderIds;
        dto.projectAdminIds = project.projectAdminIds;
        dto.projectTeamMemberIds = project.projectTeamMemberIds;
        dto.projectSupportMemberIds = project.projectSupportMemberIds;
        dto.projectSupportMemberIds = project.projectSupportMemberIds;
        if (angular.isDefined(project.projectSMEIds) && project.projectSMEIds !== null) {
          for (i = 0; i < project.projectSMEIds.length; i++) {
            if (project.projectSMEIds[i].id !== null) {
              dto.projectSMEIds[i] = project.projectSMEIds[i].id;
            }
          }
        }
        dto.channels = project.channels;
        return dto;
      };

      this.projectToUpdateDTO = function(project) {
        var dto = genericTransformer.objectToDTO(project, UpdateProjectDTO);
        dto.projectLeaderIds = project.projectLeaderIds;
        dto.projectAdminIds = project.projectAdminIds;
        dto.projectTeamMemberIds = project.projectTeamMemberIds;
        dto.projectSupportMemberIds = project.projectSupportMemberIds;
        if (angular.isDefined(project.projectSMEIds) && project.projectSMEIds !== null) {
          for (i = 0; i < project.projectSMEIds.length; i++) {
            if (project.projectSMEIds[i].id !== null) {
              dto.projectSMEIds[i] = project.projectSMEIds[i].id;
            }
          }
        }
        dto.channels = project.channels;
        return dto;
      }

      this.channelToChangeChannelDTO = function(channel) {
        var dto = genericTransformer.objectToDTO(channel, ChangeChannelDTO);
        return dto;
      };

      this.testEmailToSendTestEmailDTO = function(testEmail) {
        var dto = genericTransformer.objectToDTO(testEmail, SendTestEmailDTO);
        return dto;
      };

    }
  ]);

})(angular.module('aet.domain.project'));
