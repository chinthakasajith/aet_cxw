(function(module) {

  module.service('clientDetails', ['localStorageService', '$q', 'clientEndpoint',
    function(localStorageService, $q, clientEndpoint) {

      var _clients = undefined;
      var _authorizedClients = undefined;
      var _selectedClient = undefined;
      var clientStorageKey = 'clientId';


      this.setClients = function(admin, clients) {


        if (angular.isDefined(clients)) {
          _clients = clients;
          _authorizedClients = clients.results;
        } else {
          _authorizedClients = _.values(_.reduce(admin.clientRoles, function(obj, clientRole) {
            if (!obj.hasOwnProperty(clientRole.client.id))
              obj[clientRole.client.id] = clientRole.client;

            return obj;
          }, {}));
        }

        this.initSelectedClient();

      };

      this.initSelectedClient = function() {

        var storedId = localStorageService.get(clientStorageKey);

        if (angular.isDefined(_selectedClient)) {
          return;
        } else if (storedId) {
          this.setSelectedClient(storedId);
        } else {
          this.setSelectedClient(_authorizedClients[0].id);
        }
      };

      this.getAuthorizedClients = function() {
        return _authorizedClients;
      };

      this.setSelectedClient = function(clientId) {
        var client = _.find(_authorizedClients, function(authClient) {
          return authClient.id === clientId
        });
        if (angular.isDefined(client)) {
          _selectedClient = client;
          localStorageService.set(clientStorageKey, client.id);
        }
      };

      this.getSelectedClient = function() {
        return _selectedClient;
      };

      this.clear = function() {
        _clients = undefined;
        _authorizedClients = undefined;
        _selectedClient = undefined;
        localStorageService.remove(clientStorageKey);
      };

    }
  ]);

})(angular.module('aet.security'));
