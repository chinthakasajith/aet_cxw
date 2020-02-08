(function(module) {

  module.controller('HeaderController', ['$scope','projectSelectorService','localStorageService', 'clientSelectorService', 'userDetails', '$state', '$rootScope', 'loginService','projectService', 'clientDetails', 'projectDetails',
    function($scope, projectSelectorService,localStorageService, clientSelectorService,userDetails, $state, $rootScope, loginService,projectService, clientDetails, projectDetails) {

      $scope.clientDetails = clientDetails;
      $scope.projectDetails = projectDetails;


      $scope.selectProject = function(project) {
        var addModalInstance = projectSelectorService.projectSelector(project);
        addModalInstance.result.then(function() {
          projectDetails.setSelectedProject(project.id);

        })
      };

      $scope.manage = function(){
        $state.go('index.secured.manageaccount',{},{reload:true});
      };

      $scope.selectClient = function(client) {

        projectService.getProjectsBySelectedClient(client).then(function(projectList){
          var projectList = projectList.results;
          var addModalInstance = clientSelectorService.clientSelector(projectList, client);
          addModalInstance.result.then(function(data) {
            clientDetails.setSelectedClient(data.selectedClient.id);
            var projectStorageKey = 'projectId';
            //localStorageService.set(projectStorageKey, data.selectedProject.id);
            projectDetails.clear();
            //projectDetails.setSelectedProject(data.selectedProject.id);
            localStorageService.set(projectStorageKey, data.selectedProject.id);
            //projectDetails.setProjectFromClientSelector(data.selectedProject);
            $state.go('index.secured.dashboard',{},{reload:true});

          });
        })

      };

      $scope.user = userDetails.getUser();

      $scope.screenName = $state.current.data.screenName;

      $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams, rejection) {
        if (angular.isDefined(toState.data) && angular.isDefined(toState.data.screenName))
          $scope.screenName = toState.data.screenName;
      });

      $scope.logout = function() {
        loginService.logout();
      };

    }
  ]);

})(angular.module('aet.screens.index'));
