(function(module) {

    module.service('actionTransformer', ['Action', 'genericTransformer',
        function(ClientRole, genericTransformer) {

            // this.DTOToActions = function(dto) {
            //     return _.map(dto, this.DTOToClientRole);
            // }

            this.DTOToActions = function(dto) {
                var action = new Action();
                action.id=dto.id;
                action.title=dto.title;
                action.positionIndex=dto.positionIndex;
                action.channel=dto.channel;
                return action;
            };

            // this.actionToCreateDTO = function(action) {
            //   if(clientRole.client && clientRole.role) {
            //     return {
            //       clientId: clientRole.client.id,
            //       roleId: clientRole.role.id
            //     };
            //   }
            //   else {
            //     return {};
            //   }
            //
            // };

        }
    ]);

})(angular.module('aet.domain.action'));
