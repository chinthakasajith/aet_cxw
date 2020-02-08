(function(module) {

  module.config(['$stateProvider',
    function($stateProvider) {

      $stateProvider
        .securedState('index.secured.listsprojectteam', {
          abstract: true,
          url: '/list/projectteam',
          data: {
            selectedTab: "ProjectTeamList"
          }
        })
        .securedState('index.secured.listsprojectteam.search', {
          url: '',
          views: {
            'main@index': {
              templateUrl: 'src/screens/listsprojectteam/templates/search.html',
              controller: 'SearchListsInternalController',
            }
          },
          resolve: {
            searchManager: ['SearchManager', 'listInternalService', '$log', 'updatedUser', function(SearchManager, listInternalService, $log, updatedUser) {
              var searchManager = new SearchManager(listInternalService.searchListInternal);
              return searchManager.search();
            }]
          },
          data: {
            screenName: "Search Missions Project Team",
            feature: "LIST_SEARCH_PT_LISTS"
          }

        })
        .securedState('index.secured.listsprojectteam.create', {
          url: '/create',
          views: {
            'main@index': {
              templateUrl: 'src/screens/listsprojectteam/templates/create.html',
              controller: 'CreateListsInternalController',
            }
          },
          resolve: {
            businessUserDetails: ['SearchManager', 'businessUserService', 'updatedUser', '$log', function(SearchManager, businessUserService, updatedUser, $log) {
              return businessUserService.searchBusinessUserByClientId({
                count: 0,
                page: 0,
                sme:false
              });
            }]
          },
          data: {
            screenName: "Create Missions Project Team",
            feature: "CREATE_PT_LIST"
          }
        })
        .securedState('index.secured.listsprojectteam.edit', {
          url: '/listsprojectteam/:id',
          views: {
            'main@index': {
              templateUrl: 'src/screens/listsprojectteam/templates/edit.html',
              controller: 'EditListsInternalController',
            }
          },
          data: {
            screenName: "Edit Missions Project Team",
            feature: "VIEW_PT_LIST"
          },
          resolve: {
            listsprojectteam: ['listInternalService', '$stateParams', 'updatedUser', function(listInternalService, $stateParams, updatedUser) {
              return listInternalService.findListInternal($stateParams.id);
            }],
            businessUserDetails: ['SearchManager', 'businessUserService', 'updatedUser', '$log', function(SearchManager, businessUserService, updatedUser, $log) {
              return businessUserService.searchBusinessUserByClientId({
                count: 0,
                page: 0,
                sme:false
              });
            }]
          }
        });
    }
  ]);

})(angular.module('aet.screens.listsprojectteam'));
