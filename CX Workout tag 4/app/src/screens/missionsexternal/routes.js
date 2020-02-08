(function(module) {

    module.config(['$stateProvider',
        function ($stateProvider) {

            $stateProvider
                .securedState('index.secured.surveysexternal', {
					abstract: true,
                    url: '/surveysexternal',
                    data: {
                        selectedTab: "Surveys"
                    }
                })
				.securedState('index.secured.surveysexternal.search', {
					url: '',
					views: {
						'main@index': {
                    		templateUrl: 'src/screens/surveysexternal/templates/surveysexternal.html',
                    		controller: 'ServeysExternalController',
						}
					},
                    resolve: {
						searchManager: ['SearchManager', 'adminService', '$log', 'updatedUser', function(SearchManager, adminService, $log, updatedUser) {
							var searchManager = new SearchManager(adminService.searchAdmin);
							return searchManager.search();
						}]
                    },
					data: {
						screenName: "Search Surveys Internal",
						feature: "LIST_CLIENT"
					}

				})
				.securedState('index.secured.surveysexternal.create', {
					url: '/create',
					views: {
						'main@index': {
                    		templateUrl: 'src/screens/surveysexternal/templates/createServeysExternal.html',
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
						screenName: "Create Serveys External",
						feature: "CREATE_CLIENT"
                    }
				})
				.securedState('index.secured.surveysexternal.edit', {
					url: '/surveysexternal/:id',
					views: {
						'main@index': {
                    		templateUrl: 'src/screens/surveysexternal/templates/editServeysExternal.html',
	                		controller: 'EditServeysExternalController',
						}
					},
                    data: {
                        screenName: "Edit Serveys External",
						feature: "EDIT_Client"
                    },
					resolve: {
					 surveysexternal: ['adminService', '$stateParams', 'updatedUser', function(adminService, $stateParams, updatedUser) {
							return adminService.findAdmin($stateParams.id);
						}]
                    }
				});
        }
    ]);

})(angular.module('aet.screens.missionsexternal'));
