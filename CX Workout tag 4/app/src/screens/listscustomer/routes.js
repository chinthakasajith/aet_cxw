(function(module) {

  module.config(['$stateProvider',
    function($stateProvider) {

      $stateProvider
        .securedState('index.secured.listscustomer', {
          abstract: true,
          url: '/list/customer',
          data: {
            selectedTab: "CustomerList"
          }
        })
        .securedState('index.secured.listscustomer.search', {
          url: '',
          views: {
            'main@index': {
              templateUrl: 'src/screens/listscustomer/templates/search.html',
              controller: 'SearchListsCustomerController',
            }
          },
          resolve: {
            searchManager: ['SearchManager', 'listCustomerService', '$log', 'updatedUser', function(SearchManager, listCustomerService, $log, updatedUser) {
              var searchManager = new SearchManager(listCustomerService.searchlistCustomer);
              return searchManager.search();
            }]
          },
          data: {
            screenName: "Search List Customer",
            feature: "LIST_SEARCH_CUSTOMER_LIST"

          }

        })
        .securedState('index.secured.listscustomer.create', {
          url: '/create',
          views: {
            'main@index': {
              templateUrl: 'src/screens/listscustomer/templates/create.html',
              controller: 'CreateListsCustomerController',
            }
          },

          data: {
            screenName: "Create Lists Customer",
            feature: "CREATE_CUSTOMER_LIST"
          }
        })
        .securedState('index.secured.listscustomer.edit', {
          url: '/listscustomer/:id',
          views: {
            'main@index': {
              templateUrl: 'src/screens/listscustomer/templates/edit.html',
              controller: 'EditListCustomerController',
            }
          },
          resolve: {
            listscustomer: ['listCustomerService', '$stateParams', 'updatedUser', function(listCustomerService, $stateParams, updatedUser) {
              return listCustomerService.findlistCustomer($stateParams.id);
            }]
          },
          data: {
            screenName: "Edit Lists Customer",
            feature: "EDIT_CUSTOMER_LIST"
          }
        });
    }
  ]);

})(angular.module('aet.screens.listscustomer'));
