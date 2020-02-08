(function(module) {

  module.service('projectDetails', ['localStorageService', 'clientDetails', '$q', 'projectEndpoint',
    function(localStorageService, clientDetails, $q, projectEndpoint) {

      var _projects = undefined;
      var _authorizedProjects = undefined;
      var _selectedProject = undefined;
      var projectStorageKey = 'projectId';


      this.setProjects = function(admin, project) {
        if (admin.isSuperAdmin) {

          if (angular.isDefined(project)) {
            _projects = project;
            _authorizedProjects = [];
            for (key in project.results) {
              if (project.results[key].client.id === clientDetails.getSelectedClient().id) {
                _authorizedProjects.push(project.results[key]);
              }
            }
          }

        } else {
          _authorizedProjects = [];
          for (key in admin.projectRoles) {
            if (admin.projectRoles[key].project.client.id === clientDetails.getSelectedClient().id) {
              _authorizedProjects.push(admin.projectRoles[key].project);
            }
          }

        }
        this.initSelectedProject();

      };

      this.initSelectedProject = function() {

        var storedId = localStorageService.get(projectStorageKey);

        if (angular.isDefined(_selectedProject)) {
          return;
        } else if (storedId) {
          this.setSelectedProject(storedId);
        } else {

          if (angular.isDefined(_authorizedProjects) && _authorizedProjects.length > 0) {
            this.setSelectedProject(_authorizedProjects[0].id);
          }

        }
      };

      this.getAuthorizedProjects = function() {
        if (angular.isDefined(_authorizedProjects)) {
          return _authorizedProjects;
        } else {
          return null; //if selected client doesn't have projects
        }
      };

      this.setSelectedProject = function(projectId) {
        var pro = _.find(_authorizedProjects, function(authPro) {
          return authPro.id === projectId
        });
        if (angular.isDefined(pro)) {
          _selectedProject = pro;
          localStorageService.set(projectStorageKey, pro.id);
        }
      };


      this.getSelectedProject = function() {
        this.initSelectedProject();
        return _selectedProject;

      };

      this.clear = function() {
        _projects = undefined;
        _authorizedProjects = undefined;
        _selectedProject = undefined;
        localStorageService.remove(projectStorageKey);
      };

    }
  ]);

})(angular.module('aet.security'));
