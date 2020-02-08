(function(module) {

  module.config(['$stateProvider',
    function($stateProvider) {

      $stateProvider
        .securedState('index.secured.employeemission', {
          abstract: true,
          url: '/mission/employee',
          data: {
            selectedTab: "EmployeeMission"
          }
        })
        .securedState('index.secured.employeemission.search', {
          url: '',
          views: {
            'main@index': {
              templateUrl: 'src/screens/missionsemployee/templates/search.html',
              controller: 'SearchEmpMissionController',
            }
          },
          data: {
            screenName: "Employee",
            feature: "LIST_SEARCH_EMPLOYEE_MISSIONS"
          },
          resolve: {
            searchManager: ['SearchManager', 'missionEmployeeService', '$log', 'updatedUser', function(SearchManager, missionEmployeeService, $log, updatedUser) {
              var searchManager = new SearchManager(missionEmployeeService.searchMission);
              return searchManager.search();
            }]
          }

        })
        .securedState('index.secured.employeemission.create', {
          url: '/create',
          views: {
            'main@index': {
              templateUrl: 'src/screens/missionsemployee/templates/create.html',
              controller: 'CreateEmpMissionController',
            }
          },
          data: {
            screenName: "Create Employee Mission",
            feature: "CREATE_EMPLOYEE_MISSION"
          }
        })
        .securedState('index.secured.employeemission.edit', {
          url: '/edit/:id',
          views: {
            'main@index': {
              templateUrl: 'src/screens/missionsemployee/templates/edit.html',
              controller: 'EditEmpMissionController',
            }
          },
          data: {
            screenName: "Edit Employee Mission",
            feature: "VIEW_EMPLOYEE_MISSION"
          },
          resolve: {
            missionRequest: ['missionEmployeeService', '$stateParams', 'updatedUser', function(missionEmployeeService, $stateParams, updatedUser) {
              return missionEmployeeService.findMission($stateParams.id);
            }],
            participantList: ['listEmployeeService', 'updatedUser', '$log', function(listEmployeeService, updatedUser, $log) {
              return listEmployeeService.searchlistEmployee({
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

})(angular.module('aet.screens.missionemployee'));
