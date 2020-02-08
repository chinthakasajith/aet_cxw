(function(module) {
    
    module.service('clientRoleTransformer', ['ClientRole', 'genericTransformer', 'clientTransformer', 'roleTransformer',
        function(ClientRole, genericTransformer, clientTransformer, roleTransformer) {

            this.DTOToClientRoles = function(dto) {
                return _.map(dto, this.DTOToClientRole);
            }

            this.DTOToClientRole = function(dto) {
                var clientRole = new ClientRole();
                clientRole.client = clientTransformer.getDTOToClient(dto.client);
                clientRole.role = roleTransformer.DTOToRole(dto.role);

                return clientRole;
            };
			
            this.clientRoleToCreateDTO = function(clientRole) {
              if(clientRole.client && clientRole.role) {
                return {
                  clientId: clientRole.client.id,
                  roleId: clientRole.role.id
                };
              }
              else {
                return {};
              }
                
            };

        }
    ]);

})(angular.module('aet.domain.clientRole'));

