(function (module) {

  module.service('businessUserService', ['businessUserEndpoint', 'businessUserTransformer', '$q', '$log', 'clientDetails', 'ClientRole', 'userDetails', 'projectService', '$stateParams', 'projectDetails',
    function (businessUserEndpoint, businessUserTransformer, $q, $log, clientDetails, ClientRole, userDetails, projectService, $stateParams, projectDetails) {

      this.createBusinessUser = function (businessuser) {
        if (businessuser.isSuperAdmin) {
          businessuser.clientRoles = [{}];
        }

        var dto = businessUserTransformer.businessUserToCreateDTO(businessuser);
        return businessUserEndpoint.createBusinessUser(dto).then(function (response) {
          return response.data;
        }, function (err) {
          $log.debug("Could not create businessuser", err);
          return $q.reject(err);
        });

      };

      this.deleteBusinessUser = function (id) {
        return businessUserEndpoint.deleteBusinessUser(id).then(function (response) {
          return response.data;
        }, function (err) {
          $log.debug("Could not delete businessuser", err);
          return $q.reject(err);
        });
      };

      this.updateBusinessUser = function (businessuser) {
        if (businessuser.isSuperAdmin) {
          businessuser.clientRoles = [{}];
        }

        var dto = businessUserTransformer.businessUserToUpdateDTO(businessuser);

        return businessUserEndpoint.updateBusinessUser(dto).then(function (response) {
          return response.data;
        }, function (err) {
          $log.debug("Could not update businessuser", err);
          return $q.reject(err);
        });

      };

      this.findSelfBusinessUser = function (adminId) {

        return businessUserEndpoint.findSelfBusinessUser(adminId).then(function (response) {
          return businessUserTransformer.DTOToBusinessUser(response.data);
        }, function (err) {
          console.error("Could not load businessuser");
          return $q.reject(err);
        });

      };

      this.findBusinessUser = function (id) {

        return businessUserEndpoint.findBusinessUser(id).then(function (response) {
          return businessUserTransformer.DTOToBusinessUser(response.data);
        }, function (err) {
          console.error("Could not load businessuser");
          return $q.reject(err);
        });

      };

      this.searchBusinessUser = function (params) {

        return businessUserEndpoint.listBusinessUser(params).then(function (dto) {
          return businessUserTransformer.searchDTOToSearchResults(dto);
        }, function (err) {
          console.error("Could not search businessuser", err);
          return $q.reject(err);
        });

      };

      this.searchBusinessUserByClientId = function (params) {

        return businessUserEndpoint.searchBusinessUserByClientId(params).then(function (dto) {
          return businessUserTransformer.searchDTOToSearchResults(dto);
        }, function (err) {
          console.error("Could not search business users by client id", err);
          return $q.reject(err);
        });

      };

      this.searchBusinessUserByClientIdEditProject = function (params, projectId) {

        return businessUserEndpoint.searchBusinessUserByClientId(params).then(function (dto) {
          projectService.findProject(projectId).then(function (businessUser) {

            var businessUsers = dto.data.businessUsers;
            var selectedBusinessUsers = businessUser;
            var users = [];

            angular.forEach(selectedBusinessUsers.projectAdmins, function (projectAdmin, projectAdminsKey) {
              users.push(projectAdmin);
            });
            angular.forEach(selectedBusinessUsers.projectLeaders, function (projectLeader, projectAdminsKey) {
              users.push(projectLeader);
            });
            angular.forEach(selectedBusinessUsers.projectSupportMembers, function (projectSupportMember, projectAdminsKey) {
              users.push(projectSupportMember);
            });
            angular.forEach(selectedBusinessUsers.projectTeamMembers, function (projectTeamMember, projectAdminsKey) {
              users.push(projectTeamMember);
            });

            angular.forEach(users, function (user, userKey) {
              for (var i = 0; businessUsers.length > i; i++) {
                if (businessUsers[i].id === user.id) {
                  businessUsers.splice(i, 1);
                }
              }
            });

            return businessUsers;
          });


          return businessUserTransformer.searchDTOToSearchResults(dto);


        }, function (err) {
          console.error("Could not search business users by clientId edit project", err);
          return $q.reject(err);
        });

      };


      this.getAuthorizedClients = function (admin) {
        return _.map(admin.clientRoles, function (clientRole) {
          return clientRole.client;
        });
      };

      this.hasFeature = function (admin, feature) {
        
        if(angular.isUndefined(admin.clientFeatures) || angular.isUndefined(admin.projectFeatures)) {
          return false;
        }
        
        // setting projectFeatures to null if there aren't any projects in the project selector
        var projectFeatures = null;
        if(angular.isDefined(projectDetails.getSelectedProject())){
        	projectFeatures = admin.projectFeatures[projectDetails.getSelectedProject().id];
        }
        var clientFeatures = admin.clientFeatures[clientDetails.getSelectedClient().id];
        
        var hasClientFeature = _.any(clientFeatures, function (f) {
          return f.title === feature;
        });
        
        var hasProjectFeature = _.any(projectFeatures, function (f) {
          return f.title === feature;
        });
        
        return hasClientFeature || hasProjectFeature;
      };

      this.addRole = function (admin, role) {
        var mr = new ClientRole();
        mr.client = clientDetails.getSelectedClient();
        mr.role = role;
        admin.clientRoles.push(mr);
      };

      this.forgotPassword = function (dto) {

        return businessUserEndpoint.forgotPassword(dto).then(function (dto) {
          return true;
        }, function (err) {
          console.error("Could not reset password", err);
          return $q.reject(err);
        });
      };

      this.passwordReset = function (dto) {
        return businessUserEndpoint.passwordReset(dto).then(function (dto) {
          return true;
        }, function (err) {
          console.error("Could not reset password", err);
          return $q.reject(err);
        });
      };

    }
  ]);

})(angular.module('aet.domain.businessUser'));
