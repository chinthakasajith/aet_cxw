(function(module) {

  module.config(['$stateProvider',
    function($stateProvider) {

      $stateProvider
        .securedState('index.secured.listsemployee', {
          abstract: true,
          url: '/list/employee',
          data: {
            selectedTab: "EmployeeList"
          }
        })
        .securedState('index.secured.listsemployee.search', {
          url: '',
          views: {
            'main@index': {
              templateUrl: 'src/screens/listsemployee/templates/search.html',
              controller: 'SearchListsEmployeeController',
            }
          },
          resolve: {
            searchManager: ['SearchManager', 'listEmployeeService', '$log', 'updatedUser', function(SearchManager, listEmployeeService, $log, updatedUser) {
              var searchManager = new SearchManager(listEmployeeService.searchlistEmployee);
              return searchManager.search();
            }]
          },
          data: {
            screenName: "Search List Employee",
            feature: "LIST_SEARCH_EMPLOYEE_LISTS"

          }

        })
        .securedState('index.secured.listsemployee.create', {
          url: '/create',
          views: {
            'main@index': {
              templateUrl: 'src/screens/listsemployee/templates/create.html',
              controller: 'CreateListsEmployeeController',
            }
          },

          data: {
            screenName: "Create Lists Employee",
            feature: "CREATE_EMPLOYEE_LIST"
          }
        })
        .securedState('index.secured.listsemployee.edit', {
          url: '/list/employee/:id',
          views: {
            'main@index': {
              templateUrl: 'src/screens/listsemployee/templates/edit.html',
              controller: 'EditListEmployeeController',
            }
          },
          resolve: {
            listsemployee: ['listEmployeeService', '$stateParams', 'updatedUser', function(listEmployeeService, $stateParams, updatedUser) {
              return listEmployeeService.findlistEmployee($stateParams.id);
            }]
          },
          data: {
            screenName: "Edit Lists Employee",
            feature: "EDIT_EMPLOYEE_LIST"
          }
        });
    }
  ]);

})(angular.module('aet.screens.listsemployee'));
