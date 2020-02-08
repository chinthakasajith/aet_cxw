(function(module) {

    module.config(['$stateProvider',
        function ($stateProvider) {

            $stateProvider
                .securedState('index.secured.listsexternal', {
					abstract: true,
                    url: '/listsexternal',
                    data: {
                        selectedTab: "Lists"
                    }
                })
				.securedState('index.secured.listsexternal.search', {
					url: '',
					views: {
						'main@index': {
                    		templateUrl: 'src/screens/listsexternal/templates/listsexternal.html',
                    		controller: 'ListsExternalController',
						}
					},
                    resolve: {
						searchManager: ['SearchManager', 'adminService', '$log', 'updatedUser', function(SearchManager, adminService, $log, updatedUser) {
							var searchManager = new SearchManager(adminService.searchAdmin);
							return searchManager.search();
						}]
                    },
					data: {
						screenName: "Search List External",
						feature: "LIST_EXTERNAL"
					}

				})
				.securedState('index.secured.listsexternal.create', {
					url: '/create',
					views: {
						'main@index': {
                    		templateUrl: 'src/screens/listsexternal/templates/createListsExternal.html',
	                		controller: 'CreateListsExternalController',
						}
					},
					resolve: {
						roleSearchManager: ['SearchManager', 'roleService', '$log', 'updatedUser', function(SearchManager, roleService, $log, updatedUser) {
							var searchManager = new SearchManager(roleService.searchRoles);
							searchManager.count = 0;
							return searchManager.search();
						}]
                    },
                    data: {
						screenName: "Create Lists External",
						feature: "CREATE_LIST"
                    }
				})
				.securedState('index.secured.listsexternal.edit', {
					url: '/listsexternal/:id',
					views: {
						'main@index': {
                    		templateUrl: 'src/screens/listsexternal/templates/editListsExternal.html',
	                		controller: 'EditListsExternalController',
						}
					},
                    data: {
                        screenName: "Edit Lists External",
						feature: "EDIT_LIST"
                    },
					resolve: {
					 listsexternal: ['adminService', '$stateParams', 'updatedUser', function(adminService, $stateParams, updatedUser) {
							return adminService.findAdmin($stateParams.id);
						}]
                    }
				});
        }
    ]);

})(angular.module('aet.screens.listsexternal'));
