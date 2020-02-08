(function(module) {

  module.service('businessUserTransformer', ['BusinessUser', 'genericTransformer', 'clientRoleTransformer','projectRoleTransformer', '$log', 'CreateBusinessUserDTO', 'UpdateBusinessUserDTO',
    function(BusinessUser, genericTransformer, clientRoleTransformer,projectRoleTransformer, $log, CreateBusinessUserDTO, UpdateBusinessUserDTO) {

      this.DTOToBusinessUser = function(dto) {
        var businessUser = genericTransformer.DTOToObject(dto, BusinessUser);

        businessUser.clientRoles = clientRoleTransformer.DTOToClientRoles(dto.clientRoles);
        businessUser.projectRoles = projectRoleTransformer.DTOToProjectRoles(dto.projectRoles);
        
        setFeatures(businessUser);

        return businessUser;
      };

      this.DTOToBusinessUsers = function(dto) {
        return _.map(dto, this.DTOToBusinessUser);
      };

      this.searchDTOToSearchResults = function(dto) {
        var searchResults = genericTransformer.DTOToSearchResults(dto.data);
        searchResults.results = dto.data.businessUsers;
        return searchResults;
      };

      this.loginDTOToBusinessUser = function(dto) {
        var businessUser = genericTransformer.DTOToObject(dto, BusinessUser);
        businessUser.id = dto.userId;
        businessUser.email = dto.email;
        //businessUser.role = roleTransformer.DTOToRole(businessUser.role);

        return businessUser;
      };

      this.businessUserToCreateDTO = function(businessUser) {
        var dto = genericTransformer.objectToDTO(businessUser, CreateBusinessUserDTO);
        dto.clientRoles = _.map(businessUser.clientRoles, clientRoleTransformer.clientRoleToCreateDTO);
        return dto;
      };

      this.businessUserToUpdateDTO = function(businessUser) {
        var dto = genericTransformer.objectToDTO(businessUser, UpdateBusinessUserDTO);
        dto.clientRoles = _.map(businessUser.clientRoles, clientRoleTransformer.clientRoleToCreateDTO);
        return dto;
      };
      
      var setFeatures = function(businessUser) {
				
        businessUser.clientFeatures = _.reduce(businessUser.clientRoles, function(result, clientRole) {
          if(angular.isDefined(result[clientRole.client.id])) {
            result[clientRole.client.id] = result[clientRole.client.id].concat(clientRole.role.features);
          }
          else {
            result[clientRole.client.id] = clientRole.role.features;
          }

            return result;
        }, {});
      
        businessUser.projectFeatures = _.reduce(businessUser.projectRoles, function(result, projectRole) {
          if(angular.isDefined(result[projectRole.project.id])) {
            result[projectRole.project.id] = result[projectRole.project.id].concat(projectRole.role.features);
          }
          else {
            result[projectRole.project.id] = projectRole.role.features;
          }

            return result;
        }, {});
      }
    }
  ]);

})(angular.module('aet.domain.businessUser'));
