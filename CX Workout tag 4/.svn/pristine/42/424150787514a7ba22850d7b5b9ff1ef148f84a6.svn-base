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
  module.service('modalService', ['$modal', 'alertsService', '$log', '$q', '$rootScope',
    function($modal, alertsService, $log, $q, $rootScope) {

      this.deleteModal = function(name) {

        var scope = $rootScope.$new(true);
        scope.name = name;

        return $modal.open({

          templateUrl: 'src/modules/modal/templates/deleteModal.html',
          controller: 'ModalInstanceController',
          scope: scope

        });

      };

      this.unsavedChangesModal = function() {

        var scope = $rootScope.$new(true);

        return $modal.open({

          templateUrl: 'src/modules/modal/templates/saveModal.html',
          controller: 'UnsavedController',
          scope: scope

        });

      };

      this.customDeleteModal = function(name, message) {

        var scope = $rootScope.$new(true);
        scope.name = name;
        scope.message = message;

        return $modal.open({

          templateUrl: 'src/modules/modal/templates/customDeleteModal.html',
          controller: 'ModalInstanceController',
          scope: scope

        });

      };

      this.customEditModal = function(name, message, editLabel, cancelLabel) {

        var scope = $rootScope.$new(true);
        scope.name = name;
        scope.message = message;
        scope.editLabel = editLabel;
        scope.cancelLabel = cancelLabel;

        return $modal.open({

          templateUrl: 'src/modules/modal/templates/customEditModal.html',
          controller: 'ModalInstanceController',
          scope: scope

        });

      };

      this.customCopyModal = function(name, message, copyLabel, cancelLabel) {

        var scope = $rootScope.$new(true);
        scope.name = name;
        scope.message = message;
        scope.copyLabel = copyLabel;
        scope.cancelLabel = cancelLabel;

        return $modal.open({

          templateUrl: 'src/modules/modal/templates/customCopyModal.html',
          controller: 'ModalInstanceController',
          scope: scope

        });

      };

      this.createChannel = function() {

        var scope = $rootScope.$new(true);
        scope.name = name;

        return $modal.open({

          templateUrl: 'src/modules/modal/templates/addChannel.html',
          controller: 'ModalInstanceController',
          scope: scope

        });

      };

      this.createMissionSend = function(warningType) {

        var scope = $rootScope.$new(true);
        scope.warningType = warningType;

        return $modal.open({

          templateUrl: 'src/modules/modal/templates/createMissionSendModel.html',
          controller: 'CreateMissionSendController',
          scope: scope

        });

      };


      this.projectNotification = function() {

        var scope = $rootScope.$new(true);
        scope.name = name;

        return $modal.open({

          templateUrl: 'src/modules/modal/templates/projectNotification.html',
          controller: 'ProjectNotificationController',
          scope: scope

        });

      };



      this.addProjectTeamList = function() {

        var scope = $rootScope.$new(true);
        return $modal.open({

          templateUrl: 'src/modules/modal/templates/addProjectTeam.html',
          controller: 'ProjectTeamController',
          scope: scope

        });

      };

      this.addCustomerList = function() {

        var scope = $rootScope.$new(true);
        return $modal.open({

          templateUrl: 'src/modules/modal/templates/createCustomerList.html',
          controller: 'createCustomerListController',
          size: 'lg',
          scope: scope

        });

      };

      this.addEmployeeList = function() {

        var scope = $rootScope.$new(true);
        return $modal.open({

          templateUrl: 'src/modules/modal/templates/createEmployeeList.html',
          controller: 'createEmployeeListController',
          size: 'lg',
          scope: scope

        });

      };

      this.externalListDuplicateValidation = function(dupilicateListsCount, invalidUsersCount) {

        var scope = $rootScope.$new(true);
        scope.dupilicateListsCount = dupilicateListsCount;
        scope.invalidUsersCount = invalidUsersCount;

        return $modal.open({

          templateUrl: 'src/modules/modal/templates/externalListDuplicateValidationModel.html',
          controller: 'externalListDuplicateValidationController',
          scope: scope

        });

      };

    }
  ]);

})(angular.module('aet.modals'));
