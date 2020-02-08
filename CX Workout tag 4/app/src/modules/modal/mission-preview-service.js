(function (module) {

  /**
   * @ngdoc object
   * @name aet.modals.modalService
   *
   * @description A service used to display modals in the application
   *
   *
   *
   */
  module.service('missionPreviewService', ['$modal','questionService', 'alertsService', '$log', '$q', '$rootScope',
    function ($modal,questionService,alertsService, $log, $q, $rootScope) {

      this.missionPreview = function () {

        var scope = $rootScope.$new(true);
        
        return $modal.open({

          templateUrl: 'src/modules/modal/templates/mission-preview.html',
          controller: 'MissionPreviewCtrl as MissionPreview',
          size: 'lg',
          scope: scope

        });

      };

    }
  ]);

})(angular.module('aet.modals'));
