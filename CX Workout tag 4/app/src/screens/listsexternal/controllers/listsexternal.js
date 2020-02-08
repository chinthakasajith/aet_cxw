(function(module) {

    module.controller('ListsExternalController', ['$scope','adminService', 'searchManager', '$state', 'modalService',
        function($scope, adminService, searchManager, $state, modalService) {
			$scope.searchManager = searchManager;

			$scope.deleteListsExternal = function(external) {
				modalService.deleteModal(external.id, $scope.searchManager, adminService.deleteAdmin);
			};

			$scope.editListsExternal = function(external) {
				$state.go('index.secured.listsexternal.edit', {id:external.id});
			};

			$scope.testFunction = function(row, str) {
				
			}
        }
    ]);

})(angular.module('aet.screens.listsexternal'));
