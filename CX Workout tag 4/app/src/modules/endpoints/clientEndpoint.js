(function(module) {

  module.service('clientEndpoint', ['$q', '$http', 'api',
    function($q, $http, api) {

      var controller = '/client';

      this.createClient = function(clientRequestDTO) {
        var createClientURL = api('admin') + controller;

        return $http.post(createClientURL, clientRequestDTO);
      };

      this.editClient = function(dto) {

        var urlExtension = '/' + dto.id; // 1 is for clientId
        var editClientURL = api('admin') + controller + urlExtension;

        return $http.put(editClientURL, dto);
      };

      this.getClient = function(clientId) {
        //console.log("client - Endpoint - getClients");
        var urlExtension = '/' + clientId; // 1 is for clientId
        var getClientURL = api('admin') + controller + urlExtension;
        ////console.log("URL " + getClient);
        return $http.get(getClientURL);
      };

      this.searchClients = function(searchQueryDTO) {
        var urlExtension = '1/client'; // 1 is for clientId
        var searchClientsURL = api('admin') + controller;

        //console.log("client - Endpoint - searchClients", searchClientsURL);

        return $http.get(searchClientsURL, {
          params: searchQueryDTO
        });
      };

      this.deleteClient = function(clientId) {
        //console.log("client - Endpoint - deleteClient");
        var urlExtension = '/' + clientId;
        var deleteClientURL = api('admin') + controller + urlExtension;
        //console.log("URL " + deleteClientURL);
        return $http.delete(deleteClientURL);
      };
    }

  ]);

})(angular.module('aet.endpoints'));
