(function(module) {

  module.controller('CreateMissionController', ['$scope', '$filter', 'Mission', 'alertsService', '$state', 'userDetails',
    function($scope, $filter, Mission, alertsService, $state, userDetails) {

      $scope.mission = new Mission();
      $scope.mission.creatorId = userDetails.getUserId();

      function getDaysDifference(date1, date2) {
        var d1 = new Date($filter('date')(date1, 'yyyy-MM-dd'));
        var d2 = new Date($filter('date')(date2, 'yyyy-MM-dd'));
        return ((d1 - d2) / (1000 * 3600 * 24)).toFixed(0);
      }

      function addOneDayToDate(date) {
        var dt = new Date(date);
        dt.setDate(dt.getDate() + 1);
        return dt;
      };

      $scope.minStartdDate = new Date();
      $scope.minEndDate = addOneDayToDate($scope.minStartdDate);

      $scope.onStartDateChange = function() {
        $scope.minEndDate = $scope.mission.startDate;
        if (getDaysDifference($scope.mission.endDate, $scope.mission.startDate) < 1) {
          $scope.mission.endDate = addOneDayToDate($scope.mission.startDate);
        }
        $scope.minEndDate = addOneDayToDate($scope.minEndDate);
      };

      $scope.today = function() {
        $scope.mission.startDate = new Date();
        $scope.mission.endDate = addOneDayToDate($scope.mission.startDate);
      };

      $scope.today();

      $scope.clear = function() {
        $scope.mission.startDate = null;
      };

      // Disable weekend selection
      $scope.disabled = function(date, mode) {
        return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
      };

      $scope.toggleMin = function() {
        $scope.minDate = $scope.minDate ? null : new Date();
      };
      $scope.toggleMin();

      $scope.open = function($event) {
        $scope.opened = true;
      };

      $scope.open1 = function($event) {
        $scope.opened1 = true;
      };

      $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
      };

      $scope.formats = ['dd-MMMM-yyyy', 'yyyy-MM-dd', 'dd.MM.yyyy', 'shortDate'];
      $scope.format = $scope.formats[1];

      var tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      var afterTomorrow = new Date();
      afterTomorrow.setDate(tomorrow.getDate() + 2);
      $scope.events = [{
        date: tomorrow,
        status: 'full'
      }, {
        date: afterTomorrow,
        status: 'partially'
      }];

      $('span.tooltip-hover').webuiPopover('destroy').webuiPopover({
        trigger: 'hover',
        placement: 'right',
        delay: {
          show: 0,
          hide: 500
        }
      });

    }
  ]);

})(angular.module('aet.screens.mission'));
