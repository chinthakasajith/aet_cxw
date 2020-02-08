(function(module) {

    module.controller('ProjectController', ['$scope', 'projectService', 'alertsService', '$state', '$log', 'searchManager','modalService', '$rootScope', 'projectDetails',
        function($scope, projectService, alertsService, $state, $log, searchManager, modalService, $rootScope, projectDetails) {

			$scope.searchManager = searchManager;

			$scope.deleteProject = function(project) {
				var modalInstance = modalService.deleteModal(project.title);
				modalInstance.result.then(function() {
					projectService.deleteProject(project.id).then(function(data){
						alertsService.addAlert({
							title: 'Success',
							message: "Successfully deleted '" + project.title + "'",
							type: 'success'
						});
						searchManager.delete(project.id);
						$state.reload();
					}, function(err){
						alertsService.addAlert({
							title: 'Error',
							message: "Could not delete '" + project.title + "'",
							type: 'error'
						});
					});
				});
			};

			$scope.editProject = function(project) {
				
				$state.go('index.secured.project.edit', {projectId:project.id}, {
	                reload: true
	              });
				
				$rootScope.hideLoader();
			}
			
			$scope.copyProject = function(project) {

		          var message = "Are you sure you want to create a copy of " + project.title + "?";

		          var modalInstance = modalService.customCopyModal(project.title, message, 'Yes', 'No');
		          modalInstance.result.then(function() {
		        	$rootScope.showLoader('Copying...');
		          	projectService.copyProject(project.id).then(function(data) {
		              alertsService.addAlert({
		                title: 'Success',
		                message: "Successfully created a copy of '" + project.title + "'",
		                type: 'success'
		              });
		              $scope.editProject(data);
		            }, function(err) {
		              $rootScope.hideLoader();
		              alertsService.addAlert({
		                title: 'Error',
		                message: "Could not create a copy of '" + project.title + "'",
		                type: 'error'
		              });
		            });
		          });

		        };
		        
	        
        }
    ]);

})(angular.module('aet.screens.project'));
