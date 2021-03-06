(function(module) {

  module.controller('CreatePTMissionController', ['$scope', '$controller', 'missionPTService', '$state',  'alertsService',
    function($scope, $controller, missionPTService, $state, alertsService) {
      $controller('CreateMissionController', {
        $scope: $scope
      });

      /**
       * @ngdoc function
       * @name addNintyDayToEndDate
       * @description
       * end date should be after 3 months (90 days) from start date - before 1 day
       * feature #108186768
       */

      function addNintyDayToEndDate(date) {
        var dt = new Date(date);
        dt.setDate(dt.getDate() + 90);
        return dt;
      };

      
      $scope.mission.endDate = addNintyDayToEndDate(new Date());

      $scope.submitMissionInternal = function() {
        missionPTService.createMission($scope.mission).then(function(data) {
          alertsService.addAlert({
            title: 'Success',
            message: 'Mission Project Team "' + $scope.mission.title + '" successfully created',
            type: 'success',
            removeOnStateChange: 2
          });
          $state.go('index.secured.missionsprojectteam.edit', {
            id: data.id
          });
        }, function(err) {
          console.error('Could not create mission internal', err);
        });
      };

    }
  ]);

})(angular.module('aet.screens.missionsprojectteam'));
