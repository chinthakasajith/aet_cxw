(function(module) {

  module.config(['$stateProvider',
    function($stateProvider) {

      $stateProvider
        .securedState('index.secured.businessUser', {
          abstract: true,
          url: '/businessUser',
          data: {
            selectedTab: "BusinessUsers"
          }
        })
        .securedState('index.secured.businessUser.search', {
          url: '',
          views: {
            'main@index': {
              templateUrl: 'src/screens/businessUser/templates/search.html',
              controller: 'SearchBusinessUserController',
            }
          },
          resolve: {
            searchManager: ['SearchManager', 'businessUserService', '$log', 'updatedUser', function(SearchManager, businessUserService, $log, updatedUser) {
              var searchManager = new SearchManager(businessUserService.searchBusinessUser);
              return searchManager.search();
            }]
          },
          data: {
            screenName: "Search Business User",
            feature: "super"
          }

        })
        .securedState('index.secured.businessUser.create', {
          url: '/create',
          views: {
            'main@index': {
              templateUrl: 'src/screens/businessUser/templates/create.html',
              controller: 'CreateBusinessUserController',
            }
          },
          resolve: {
            clientDetails: ['SearchManager', 'clientService', '$log', function(SearchManager, clientService, $log) {
              var searchManager = new SearchManager(clientService.searchClients);
              searchManager.count = 0;
              return searchManager.search();
            }],
            roleDetails: ['SearchManager', 'roleService', '$log', 'updatedUser', function(SearchManager, roleService, $log, updatedUser) {
            	var searchManager = new SearchManager(roleService.searchBURoleLists);
                searchManager.count = 0;

                return searchManager.search();
            }]
          },
          data: {
            screenName: "Create Business User",
            feature: "super"
          }
        })
        .securedState('index.secured.businessUser.edit', {
          url: '/edit/:id',
          views: {
            'main@index': {
              templateUrl: 'src/screens/businessUser/templates/edit.html',
              controller: 'EditBusinessUserController',
            }
          },
          data: {
            screenName: "Edit Business User",
            feature: "super"
          },
          resolve: {
    	     clientLists: ['SearchManager', 'clientService', '$log', function(SearchManager, clientService, $log) {
              var searchManager = new SearchManager(clientService.searchClients);
              searchManager.count = 0;
              return searchManager.search();
            }],
            roleDetails: ['SearchManager', 'roleService', '$log', 'updatedUser', function(SearchManager, roleService, $log, updatedUser) {
              var searchManager = new SearchManager(roleService.searchBURoleLists);
              searchManager.count = 0;
              return searchManager.search();

            }],
            businessuser: ['businessUserService', '$stateParams', 'updatedUser', function(businessUserService, $stateParams, updatedUser) {
              return businessUserService.findBusinessUser($stateParams.id);
            }]
          }
        });
    }
  ]);

})(angular.module('aet.screens.businessUser'));
