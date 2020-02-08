(function(module) {

  module.service('clientService', ['clientEndpoint', '$q', '$log', 'clientTransformer',
    function(clientEndpoint, $q, $log, clientTransformer) {

      this.createClient = function(client) {
        $log.debug("clientService::createClient", client)

        var createDTO = clientTransformer.clientToCreateDTO(client);
        return clientEndpoint.createClient(createDTO).then(function(response) {
          return response.data;
        }, function(err) {
          console.error("Could not create client");
          return $q.reject(err);
        });

      };

      this.searchClients = function(searchObject) {
        return clientEndpoint.searchClients(searchObject).then(function(dto) {
          return clientTransformer.searchDTOToSearchResults(dto);
        }, function(err) {
          console.error("Could not search clients");
          return $q.reject(err);
        });

      };

      this.editClient = function(client) {
        var updateDTO = clientTransformer.clientToUpdateDTO(client)

        return clientEndpoint.editClient(updateDTO).then(function(response) {
          return response.data;
        }, function(err) {
          console.error("Could not update client");
          return $q.reject(err);
        });
      };

      this.getClient = function(clientId) {
        return clientEndpoint.getClient(clientId).then(function(dto) {
          return clientTransformer.getDTOToClient(dto.data);
        }, function(err) {
          console.error("Could not get client");
          return $q.reject(err);
        });
      };

      this.deleteClient = function(clientId) {
        $log.debug("You're in the deleteClient method (clientService)");
        $log.debug(clientId);
        return clientEndpoint.deleteClient(clientId).then(function(response) {
          return response.data;
        }, function(err) {
          console.error("Could not delete client");
          return $q.reject(err);
        });

      };

    }
  ]);

})(angular.module('aet.domain.client'));
