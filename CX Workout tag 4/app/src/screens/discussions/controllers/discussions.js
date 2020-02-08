(function(module) {

    module.controller('DiscussionsController', ['$scope','adminService', 'searchManager', '$state', 'modalService',
        function($scope, adminService, searchManager, $state, modalService) {
			$scope.searchManager = searchManager;

			$scope.deleteDiscussion = function(external) {
				modalService.deleteModal(external.id, $scope.searchManager, adminService.deleteAdmin);
			};

			$scope.editDiscussion = function(external) {
				$state.go('index.secured.discussions.edit', {id:external.id});
			};

			
        }
    ]);

})(angular.module('aet.screens.discussions'));
