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
  module.service('modalService', ['$modal', 'alertsService', '$log', '$q', '$rootScope',
    function ($modal, alertsService, $log, $q, $rootScope) {

      this.TNC = function (client) {

        var scope = $rootScope.$new(true);
        scope.client = client;

        return $modal.open({

          templateUrl: 'src/modules/modal/templates/tnc.html',
          controller: 'ModalInstanceController',
          scope: scope,
          backdrop : 'static'

        });
      };

    }
  ]);

})(angular.module('aet.modals'));
