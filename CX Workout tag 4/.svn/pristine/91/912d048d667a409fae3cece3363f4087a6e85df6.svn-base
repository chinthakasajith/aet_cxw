(function(module) {

  module.config(['$stateProvider',
    function($stateProvider) {

      $stateProvider
        .securedState('index.secured.missionsprojectteam', {
          abstract: true,
          url: '/mission/projectteam',
          data: {
            selectedTab: "ProjectTeamMission"
          }
        })
        .securedState('index.secured.missionsprojectteam.search', {
          url: '',
          views: {
            'main@index': {
              templateUrl: 'src/screens/missionsprojectteam/templates/search.html',
              controller: 'SearchPTMissionController',
            }
          },
          data: {
            screenName: "Project Team",
            feature: "LIST_SEARCH_PT_MISSIONS"
          },
          resolve: {
            searchManager: ['SearchManager', 'missionPTService', '$log', 'updatedUser', function(SearchManager, missionPTService, $log, updatedUser) {
              var searchManager = new SearchManager(missionPTService.searchMission);
              return searchManager.search();
            }]
          }

        })
        .securedState('index.secured.missionsprojectteam.create', {
          url: '/create',
          views: {
            'main@index': {
              templateUrl: 'src/screens/missionsprojectteam/templates/create.html',
              controller: 'CreatePTMissionController',
            }
          },
          data: {
            screenName: "Create Missions Internal",
            feature: "CREATE_PT_MISSION"
          }
        })
        .securedState('index.secured.missionsprojectteam.edit', {
          url: '/edit/:id',
          views: {
            'main@index': {
              templateUrl: 'src/screens/missionsprojectteam/templates/edit.html',
              controller: 'EditPTMissionController',
            }
          },
          data: {
            screenName: "Edit Missions Internal",
            feature: "VIEW_PT_MISSION"
          },
          resolve: {
            missionRequest: ['missionPTService', '$stateParams', 'updatedUser', function(missionPTService, $stateParams, updatedUser) {
              return missionPTService.findMission($stateParams.id);
            }],
            participantList: ['listInternalService', 'updatedUser', '$log', function(listInternalService, updatedUser, $log) {
              return listInternalService.searchListInternal({
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

})(angular.module('aet.screens.missionsprojectteam'));
