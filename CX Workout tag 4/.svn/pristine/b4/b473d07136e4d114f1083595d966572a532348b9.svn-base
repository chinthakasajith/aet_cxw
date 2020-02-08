(function(module) {

  module.config(['$stateProvider',
    function($stateProvider) {

      $stateProvider
        .securedState('index.secured.client', {
          abstract: true,
          url: '/client',
          data: {
            selectedTab: "Clients",
            screenName: "Clients"
          }
        })
        .securedState('index.secured.client.search', {
          url: '',
          views: {
            'main@index': {
              templateUrl: 'src/screens/client/templates/search.html',
              controller: 'SearchClientController',
            }
          },
          resolve: {
            searchManager: ['SearchManager', 'clientService', '$log', function(SearchManager, clientService, $log) {
              var searchManager = new SearchManager(clientService.searchClients);
              return searchManager.search();
            }]
          },
          data: {
            screenName: "Search Clients",
            feature: "super"
          }

        })
        .securedState('index.secured.client.create', {
          url: '/create',
          views: {
            'main@index': {
              templateUrl: 'src/screens/client/templates/create.html',
              controller: 'CreateClientController',
            }
          },
          data: {
            screenName: "Create Client",
            feature: "super"
          }
        })
        .securedState('index.secured.client.edit', {
          url: '/edit/:clientId',
          views: {
            'main@index': {
              templateUrl: 'src/screens/client/templates/edit.html',
              controller: 'EditClientController',
            }
          },
          data: {
            screenName: "Edit Client",
            feature: "super"
          },
          resolve: {
            client: ['$stateParams', 'clientService',
              function($stateParams, clientService) {
                return clientService.getClient($stateParams.clientId);
              }
            ]
          }
        });


    }
  ]);

})(angular.module('aet.screens.client'));
