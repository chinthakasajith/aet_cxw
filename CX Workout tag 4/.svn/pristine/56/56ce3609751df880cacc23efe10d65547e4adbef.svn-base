(function(module) {

    module.config(['$stateProvider',
        function ($stateProvider) {

            $stateProvider
                .securedState('index.secured.discussions', {
					abstract: true,
                    url: '/discussions',
                    data: {
                        selectedTab: "Discussions"
                    }
                })
				.securedState('index.secured.discussions.search', {
					url: '',
					views: {
						'main@index': {
                    		templateUrl: 'src/screens/discussions/templates/discussions.html',
                    		controller: 'DiscussionsController',
						}
					},
                    resolve: {
						searchManager: ['SearchManager', 'adminService', '$log', 'updatedUser', function(SearchManager, adminService, $log, updatedUser) {
							//console.log(adminService.searchAdmin());
							var searchManager = new SearchManager(adminService.searchAdmin);
							return searchManager.search();
						}]
                    },
					data: {
						screenName: "Search Discussions"
					}

				})
				.securedState('index.secured.discussions.create', {
					url: '/create',
					views: {
						'main@index': {
                    		templateUrl: 'src/screens/discussions/templates/createServeysExternal.html',
	                		controller: 'CreateServeysExternalController',
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
						screenName: "Create Discussions",
						feature: "CREATE_DISCUSSION"
                    }
				})
				.securedState('index.secured.discussions.edit', {
					url: '/discussions/:id',
					views: {
						'main@index': {
                    		templateUrl: 'src/screens/discussions/templates/editServeysExternal.html',
	                		controller: 'EditDiscussionController',
						}
					},
                    data: {
                        screenName: "Edit Didcussions",
						feature: "EDIT_DISCUSSION"
                    },
					resolve: {
						roleSearchManager: ['SearchManager', 'roleService', '$log', 'updatedUser', function(SearchManager, roleService, $log, updatedUser) {
							var searchManager = new SearchManager(roleService.searchRoles);
							searchManager.count = 0;
							return searchManager.search();
						}],
					 discussions: ['adminService', '$stateParams', 'updatedUser', function(adminService, $stateParams, updatedUser) {
							return adminService.findAdmin($stateParams.id);
						}]
                    }
				});
        }
    ]);

})(angular.module('aet.screens.discussions'));
