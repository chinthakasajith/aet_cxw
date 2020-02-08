(function(module) {

    module.controller('ServeysExternalController', ['$scope','adminService', 'searchManager', '$state', 'modalService',
        function($scope, adminService, searchManager, $state, modalService) {
			$scope.searchManager = searchManager;

			$scope.deleteServeysExternal = function(external) {
				modalService.deleteModal(external.id, $scope.searchManager, adminService.deleteAdmin);
			};

			$scope.editServeysExternal = function(external) {
				$state.go('index.secured.surveysexternal.edit', {id:external.id});
			};

			$scope.testFunction = function(row, str) {
				
			}
        }
    ]);

})(angular.module('aet.screens.missionsexternal'));
