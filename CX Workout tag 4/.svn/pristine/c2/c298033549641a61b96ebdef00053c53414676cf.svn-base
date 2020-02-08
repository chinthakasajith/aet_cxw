(function(module) {
    
    module.controller('SearchClientController', ['$scope', 'clientService', 'alertsService', '$state', 'searchManager', 'modalService',
        function($scope, clientService, alertsService, $state, searchManager, modalService) {
		
    		$scope.searchManager = searchManager;
			
			$scope.deleteClient = function(client) {
				
				var modalInstance = modalService.deleteModal(client.name);
				modalInstance.result.then(function() {
					clientService.deleteClient(client.id).then(function(data){
					    alertsService.addAlert({
					  		title: 'Success',
							message: "Successfully deleted '" + client.name + "'",
							type: 'success'
						});
						searchManager.delete(client.id);
					}, function(err){
						alertsService.addAlert({
						    title: 'Error',
							message: "Could not delete '" + client.name + "'",
							type: 'error'
						});
					});
				});
				
			};
			
			$scope.editClient = function(client) {
				$state.go('index.secured.client.edit', {clientId:client.id});
			};
        }
    ]);
    
})(angular.module('aet.screens.client'));