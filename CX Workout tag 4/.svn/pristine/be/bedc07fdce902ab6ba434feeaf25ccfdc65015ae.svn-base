(function(module) {

  module.config(['$stateProvider',
    function($stateProvider) {

      $stateProvider
        .securedState('index.secured.manageaccount', {
          url: '/account',
          views: {
            'main@index': {
              templateUrl: 'src/screens/manage/templates/view.html',
              controller: 'ViewManageAccountController',
            }
          },
          data: {
            screenName: "Edit Business User",
            feature: "EDIT_BUSINESS_USER"
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
              return businessUserService.findBusinessUser(updatedUser.id);
            }]
          }
        });
    }
  ]);

})(angular.module('aet.screens.manageaccount'));
