(function (module) {

  module.controller('ResetPasswordController', ['$scope', 'businessUserService', '$state', 'ResetPasswordRequestDTO',
    function ($scope, businessUserService, $state, ResetPasswordRequestDTO) {
      $scope.alerts = [];
      $scope.loader = false;

      $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
      };

      $scope.resetPasswordRequestDTO = new ResetPasswordRequestDTO();
      $scope.resetPassword = function () {
        $scope.loader = true;
        businessUserService.forgotPassword($scope.resetPasswordRequestDTO).then(function (data) {
          $state.go('resetPasswordSuccess');
        }, function (err) {
          //console.log("Error return to controller");
          $scope.alerts = [];
          $scope.alerts.push({
            type: 'info',
            msg: "It looks like there isn't a CX Workout account associated with this email address. Need help? Email <a href='mailto:support@cxworkout.com'>support@cxworkout.com</a>."
          });
          $scope.loader = false;
        });
      }

    }
  ]);

})(angular.module('aet.screens.login'));
