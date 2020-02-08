(function (module) {

    module.controller('LoginController', ['$scope','$rootScope', 'loginService', 'modalService','LoginRequestDTO', '$log', '$state', 'alertsService', 'localStorageService',
        function ($scope, $rootScope,loginService,modalService, LoginRequestDTO, $log, $state, alertsService, localStorageService) {

            $scope.loginRequestDTO = new LoginRequestDTO();
            $scope.loginRequestDTO.rememberme = false;
            $scope.alerts = [];

            $scope.closeAlert = function(index) {
                $scope.alerts.splice(index, 1);
            };

            $scope.updateRememberme = function () {
                var localValue = localStorageService.get($scope.loginRequestDTO.username + ".rememberme") === "true";
                $scope.loginRequestDTO.rememberme = localValue || false;

            };

            $scope.submitLogin = function () {
                console.log('Logging in...');
                $rootScope.showLoader('Logging in...');
                loginService.login($scope.loginRequestDTO).then(function (response) {
                      console.log('Logging in... Done');
                    $scope.hideLoader();
                    $log.debug("Login successful", response);
                    modalService.projectNotification();
                    $state.go('index.secured.dashboard');
                }, function (error) {
                    console.log('Logging in... Done');
                    $scope.hideLoader();
                    $log.error("Could not log in", error);
                    $scope.alerts = [];
                    $scope.alerts.push({ type: 'danger', msg: "Username and password don't match" });
                });
            };

        }
    ]);

})(angular.module('aet.screens.login'));
