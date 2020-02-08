(function(module) {

  /**
   * @ngdoc object
   * @name aet.modals.modalService
   *
   * @description A service used to display modals in the application
   *
   *
   *
   */
  module.service('clientSelectorService', ['$modal',  '$log', '$q', '$rootScope',
    function($modal,  $log, $q, $rootScope) {

      this.clientSelector = function(projectList, client) {
        var scope = $rootScope.$new(true);
        scope.name = name;
        scope.projects = projectList;
        scope.selectedProject = projectList[0];
        scope.client = client;
        return $modal.open({
          templateUrl: 'src/modules/modal/templates/clientSelector.html',
          controller: 'ClientSelectorController',
          scope: scope
        });
      };

    }
  ]);

})(angular.module('aet.modals'));
