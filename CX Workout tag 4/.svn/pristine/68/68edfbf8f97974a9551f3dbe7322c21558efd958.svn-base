(function(module) {

    module.controller('PasswordResetController', ['$scope', 'businessUserService','alertsService', '$state', 'ResetPasswordRequestDTO', 'ResetPasswordDTO','passwordReset',
        function($scope, businessUserService, alertsService,$state, ResetPasswordRequestDTO, ResetPasswordDTO, passwordReset) {
			
    		$scope.resetPasswordDTO = new ResetPasswordDTO();
    		$scope.resetPasswordDTO = passwordReset;
    		
    		$scope.resetPasswordRequestDTO = new ResetPasswordRequestDTO();

	    	$scope.passwordReset = function() {
	            	businessUserService.passwordReset($scope.resetPasswordDTO).then(function(data){	            	
	            	$state.go('login');
				}, function(err){
					
					$state.go('resetPasswordFail');
				});
	        }

        }
    ]);

})(angular.module('aet.screens.login'));
