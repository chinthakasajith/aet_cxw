(function(module) {

  module.config(['$stateProvider',
    function($stateProvider) {

      $stateProvider
        .securedState('index.secured.project', {
          abstract: true,
          url: '/project',
          data: {
            selectedTab: "Projects",
            screenName: "Projects"
          }
        })
        .securedState('index.secured.project.search', {
          url: '',
          views: {
            'main@index': {
              templateUrl: 'src/screens/project/templates/project.html',
              controller: 'ProjectController',
            }
          },
          resolve: {
            searchManager: ['SearchManager', 'projectService', '$log', 'updatedUser', function(SearchManager, projectService, $log, updatedUser) {
              var searchManager = new SearchManager(projectService.searchProject);
              return searchManager.search();
            }]
          },
          data: {
            screenName: "Create Project",
            feature: "LIST_SEARCH_USERS_PROJECTS"
          }

        })
        .securedState('index.secured.project.create', {
          url: '/create',
          views: {
            'main@index': {
              templateUrl: 'src/screens/project/templates/create.html',
              controller: 'CreateProjectController',
            }
          },
          resolve: {
            businessUserDetails: ['businessUserService', 'updatedUser', '$log', function(businessUserService, updatedUser, $log) {
              return businessUserService.searchBusinessUserByClientId({
                count: 0,
                page: 0,
                sme: false
              });
            }],
            smeUserDetails: ['businessUserService', 'updatedUser', '$log', function(businessUserService, updatedUser, $log) {
              return businessUserService.searchBusinessUserByClientId({
                count: 0,
                page: 0,
                sme: true
              });
            }]
          },
          data: {
            screenName: "Create Project",
            feature: "ADD_PROJECT"
          }
        })
        .securedState('index.secured.project.edit', {
          url: '/edit/:projectId',
          views: {
            'main@index': {
              templateUrl: 'src/screens/project/templates/edit.html',
              controller: 'EditProjectController',
            }
          },
          data: {
            feature: "VIEW_PROJECT",
            screenName: "Edit Project"
          },
          resolve: {
            project: ['$stateParams', 'projectService', 'updatedUser', '$log', 'projectDetails',
              function($stateParams, projectService, updatedUser, $log, projectDetails) {
            	
                return projectService.findProject($stateParams.projectId);
              }
            ],
            businessUserDetails: ['updatedUser', 'businessUserService', '$log', 'project', '$stateParams',
              function(updatedUser, businessUserService, $log, project, $stateParams) {
                return businessUserService.searchBusinessUserByClientId({
                  count: 0,
                  page: 0,
                  sme: false
                });
              }
            ],
            smeUserDetails: ['updatedUser', 'businessUserService', '$log', 'project', '$stateParams',
              function(updatedUser, businessUserService, $log, project, $stateParams) {
                return businessUserService.searchBusinessUserByClientId({
                  count: 0,
                  page: 0,
                  sme: true
                });
              }
            ]
          }
        });


    }
  ]);

})(angular.module('aet.screens.project'));
