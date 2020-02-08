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
  module.service('projectSelectorService', ['$modal', '$log', '$q', '$rootScope',
    function($modal, $log, $q, $rootScope) {


      this.projectSelector = function(selectedProject) {

        var scope = $rootScope.$new(true);
        scope.name = name;
        scope.selectedProject = selectedProject;

        return $modal.open({

          templateUrl: 'src/modules/modal/templates/projectSelector.html',
          controller: 'ProjectSelectorController',
          scope: scope

        });
      };

    }
  ]);

})(angular.module('aet.modals'));
