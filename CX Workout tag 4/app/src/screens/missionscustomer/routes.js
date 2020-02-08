(function(module) {

  module.config(['$stateProvider',
    function($stateProvider) {

      $stateProvider
        .securedState('index.secured.customermission', {
          abstract: true,
          url: '/mission/customer',
          data: {
            selectedTab: "CustomerMission"
          }
        })
        .securedState('index.secured.customermission.search', {
          url: '',
          views: {
            'main@index': {
              templateUrl: 'src/screens/missionscustomer/templates/search.html',
              controller: 'SearchCustomerMissionController',
            }
          },
          data: {
            screenName: "Customer",
            feature: "LIST_SEARCH_CUSTOMER_MISSIONS"
          },
          resolve: {
            searchManager: ['SearchManager', 'missionCustomerService', '$log', 'updatedUser', function(SearchManager, missionCustomerService, $log, updatedUser) {
              var searchManager = new SearchManager(missionCustomerService.searchMission);
              return searchManager.search();
            }]
          }

        })
        .securedState('index.secured.customermission.create', {
          url: '/create',
          views: {
            'main@index': {
              templateUrl: 'src/screens/missionscustomer/templates/create.html',
              controller: 'CreateCustomerMissionController',
            }
          },
          data: {
            screenName: "Create Customer Mission",
            feature: "CREATE_CUSTOMER_MISSION"
          }
        })
        .securedState('index.secured.customermission.edit', {
          url: '/edit/:id',
          views: {
            'main@index': {
              templateUrl: 'src/screens/missionscustomer/templates/edit.html',
              controller: 'EditCustomerMissionController',
            }
          },
          data: {
            screenName: "Edit Customer Mission",
            feature: "VIEW_CUSTOMER_MISSION"
          },
          resolve: {
            missionRequest: ['missionCustomerService', '$stateParams', 'updatedUser', function(missionCustomerService, $stateParams, updatedUser) {
              return missionCustomerService.findMission($stateParams.id);
            }],
            participantList: ['listCustomerService', 'updatedUser', '$log', function(listCustomerService, updatedUser, $log) {
              return listCustomerService.searchlistCustomer({
                count: 0,
                page: 0
              });
            }],
            mapData: ['mapService', 'updatedUser', '$log', function(mapService, updatedUser, $log) {
              return mapService.getMapData();
            }]
          }
        });
    }
  ]);

})(angular.module('aet.screens.missioncustomer'));
