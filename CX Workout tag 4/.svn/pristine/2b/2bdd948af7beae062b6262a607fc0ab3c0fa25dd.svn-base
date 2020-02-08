(function(module) {

  module.service('clientTransformer', ['genericTransformer', 'CreateClientRequestDTO', 'Client', 'UpdateClientRequestDTO',
    function(genericTransformer, CreateClientRequestDTO, Client, UpdateClientRequestDTO) {

      this.clientToCreateDTO = function(client) {
        return genericTransformer.objectToDTO(client, CreateClientRequestDTO);
      };

      this.getDTOToClient = function(dto) {
        return genericTransformer.DTOToObject(dto, Client);
      };

      this.clientToUpdateDTO = function(client) {
        return genericTransformer.objectToDTO(client, UpdateClientRequestDTO);
      };

      this.searchDTOToSearchResults = function(dto) {
        var self = this;

        var searchResults = genericTransformer.DTOToSearchResults(dto.data);
        searchResults.results = _.map(dto.data.clients, function(client) {
          return self.getDTOToClient(client);
        });

        return searchResults;
      };

    }
  ]);

})(angular.module('aet.domain.client'));
