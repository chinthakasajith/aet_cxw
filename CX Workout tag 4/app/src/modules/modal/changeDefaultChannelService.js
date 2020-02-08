(function(module) {

  /**
   * @ngdoc object
   * @name aet.modals.modalService
   *
   * @description A service used to display default channel change modals in the application
   *
   *
   *
   */
  module.service('changeDefaultChannelService', ['$modal', '$log', '$q', '$rootScope',
    function($modal, $log, $q, $rootScope) {


      this.changeDefaultChannelModel = function() {

        var scope = $rootScope.$new(true);

        return $modal.open({

          templateUrl: 'src/modules/modal/templates/channelModal.html',
          controller: 'ChangeDefaultChannelController',
          scope: scope

        });
      };

    }
  ]);

})(angular.module('aet.modals'));
