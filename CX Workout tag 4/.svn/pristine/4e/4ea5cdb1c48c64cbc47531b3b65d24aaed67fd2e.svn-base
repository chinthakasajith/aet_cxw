/**
 * Created by supun.s on 06/08/2015.
 */
(function (module) {

  module.controller("ViewHierarchyMapCtrl", ['$scope', 'HierarchyMapService', '$rootScope', 'mapService',
    function ($scope, HierarchyMapService, $rootScope, mapService) {

      $scope.data = HierarchyMapService.getMapData();
      $scope.HierarchyMapService = HierarchyMapService;

      $scope.hasComments = function(commentsSummaries){
        if(commentsSummaries.POSITIVE.length > 0 || commentsSummaries.NEGATIVE.length > 0 || commentsSummaries.NEUTRAL.length > 0){
          return true;
        }
      };

      var date = new Date();
      var timeNow = date.getTime();
      var millisecondsForHour = 86400000;

      $scope.isNew = function(time){
        if((timeNow - time) <= millisecondsForHour) {
          return 'new';
        }
      };

      $scope.setNodeColor = function (expectationAverage, loyaltyAverage) {
        return HierarchyMapService.setColor(expectationAverage, loyaltyAverage);
      };

      $scope.averageColor = function (average) {

        if(average === 0){
          return 'white';
        } else if (average <= 2.9) {
          return 'solidRed';
        } else if (average >= 4 && average <= 5) {
          return 'solidGreen';
        } else {
          return 'solidGray';
        }

      };

      $scope.stage_index = 0;
      $scope.touchpoint_index = 0;
      $scope.action_index = null;

      $scope.active = function (stageIndex, touchpointIndex) {
        $scope.stage_index = stageIndex;
        $scope.touchpoint_index = touchpointIndex;
        $scope.action_index = null;
      };

      $scope.dynamicPopover = {
        content: 'Hello, World!',
        templateUrl: 'myPopoverTemplate.html',
        title: 'Title'
      };

      $scope.options = {
        colours : [
          {
            fillColor: ["#c6000a", "#de6a70", "#96a1a1", "#bbe88e", "#9bce67"]
          }
        ],
        listOfLocations : ['1', '2', '3', '4', '5'],
        options : {
          barShowStroke: false,
          scaleOverlay: true,
          scaleOverride: false,
          scaleShowLabels: true,
          scaleLineColor: 'rgba(0,0,0,0.5)',
          scaleGridLineColor: "rgba(0,0,0,.05)",
          scaleShowHorizontalLines: true,
          scaleShowVerticalLines: false,
          scaleGridLineWidth: 5,
          barValueSpacing: 6,
          responsive: true,
          maintainAspectRatio: false
        }
      };

      $scope.actionDetails = function (actionIndex) {
        $scope.action_index = actionIndex;
      };

      $scope.closeActionDetails = function () {
        $scope.action_index = null;
      };

    }
  ])
  ;

})
(angular.module('aet-directives-hierarchyMap'));
