(function(module) {

  module.service('projectRoleTransformer', ['ProjectRole', 'genericTransformer', 'projectTransformer', 'roleTransformer',
    function(ProjectRole, genericTransformer, projectTransformer, roleTransformer) {

      this.DTOToProjectRoles = function(dto) {
        return _.map(dto, this.DTOToProjectRole);
      }

      this.DTOToProjectRole = function(dto) {
        var projectRole = new ProjectRole();
        projectRole.project = projectTransformer.DTOToProject(dto.project);
        projectRole.role = roleTransformer.DTOToRole(dto.role);
        return projectRole;
      };

      this.projectRoleToCreateDTO = function(projectRole) {
        if (projectRole.project && projectRole.role) {
          return {
            projectId: projectRole.project.id,
            roleId: projectRole.role.id
          };
        } else {
          return {};
        }

      };

    }
  ]);

})(angular.module('aet.domain.projectRole'));
