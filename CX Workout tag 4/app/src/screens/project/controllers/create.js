(function(module) {

  module.controller('CreateProjectController', ['$scope', '$rootScope', 'localStorageService', 'security', 'clientDetails', 'userDetails', 'projectDetails', 'Project', 'projectService', 'businessUserDetails', 'alertsService', '$modal', '$state', '$log', 'modalService', '$filter', 'uploadManager', 's3Uploader', 's3config', 'projectDetails', 'smeUserDetails', 'SendTestEmailDTO',
    function($scope, $rootScope, localStorageService, security, clientDetails, userDetails, projectDetails, Project, projectService, businessUserDetails, alertsService, $modal, $state, $log, modalService, $filter, uploadManager, s3Uploader, s3config, projectDetails, smeUserDetails, SendTestEmailDTO) {

      $scope.project = new Project();
      $scope.project.creatorId = userDetails.getUserId();

      $scope.project.projectLeaderIds = [];
      $scope.project.projectTeamMemberIds = [];
      $scope.project.projectSupportMemberIds = [];
      $scope.project.projectAdminIds = [];


      $scope.businessUserDetails = businessUserDetails.results;
      //to gettting SME Users
      $scope.smeUserDetails = smeUserDetails.results;
      $scope.channels = undefined;
      $scope.project.channels = [];
      $scope.buttonLoader = false;

      $scope.testedEmailConfig = null;

      $scope.isValidProjectInfo = function() {
        var isEmailValid = $scope.isValidEmailConfig();
        if ($scope.isValidTestEmailConfig()) {
          isEmailValid = $scope.isEmailConfigTested();
        }
        return !$scope.createProjectForm.$invalid && isEmailValid && $scope.project.logoUrl;
      }

      $scope.isValidProjectLogo = function() {
        var isEmailValid = $scope.isValidEmailConfig();
        if ($scope.isValidTestEmailConfig()) {
          isEmailValid = $scope.isEmailConfigTested();
        }
        return !$scope.createProjectForm.$invalid && isEmailValid && !$scope.project.logoUrl;
      }

      angular.isUndefinedOrNull = function(val) {
        return angular.isUndefined(val) || val === null || val === ""
      }

      //returns true if configuration is not set or set configuration is complete. Checks if form values are accurate. DOES NOT CHECK IF ITS TESTED.
      $scope.isValidEmailConfig = function() {
        var isValid = false;
        if (!angular.isUndefinedOrNull($scope.project.emailConfig) && (!angular.isUndefinedOrNull($scope.project.emailConfig.senderEmail) || !angular.isUndefinedOrNull($scope.project.emailConfig.host) || !angular.isUndefinedOrNull($scope.project.emailConfig.username) || !angular.isUndefinedOrNull($scope.project.emailConfig.password) || !angular.isUndefinedOrNull($scope.project.emailConfig.port) || !angular.isUndefinedOrNull($scope.project.emailConfig.secureProtocol))) {
          isValid = $scope.isValidTestEmailConfig();
        } else {
          isValid = true;
        }
        return isValid;
      };

      $scope.sendTestMail = function() {
        $scope.buttonLoader = true;
        // send test email
        //on success set $scope.testedEmailConfig = angular.copy($scope.project.emailConfig);
        var newTestEmail = new SendTestEmailDTO();
        newTestEmail.receiverId = userDetails.getUserId();
        newTestEmail.senderEmail = $scope.project.emailConfig.senderEmail;
        newTestEmail.host = $scope.project.emailConfig.host;
        newTestEmail.username = $scope.project.emailConfig.username;
        newTestEmail.password = $scope.project.emailConfig.password;
        newTestEmail.port = $scope.project.emailConfig.port;
        newTestEmail.secureProtocol = $scope.project.emailConfig.secureProtocol;

        projectService.sendTestMail(newTestEmail).then(function(response) {
          alertsService.addAlert({
            title: 'Success',
            message: 'Your E-mail configuration successfully validated.',
            type: 'success',
            removeOnStateChange: 2
          });
          $scope.testedEmailConfig = newTestEmail;
          $scope.buttonLoader = false;
        }, function(err) {
          $scope.buttonLoader = false;
        });
      };

      $scope.isEmailConfigTested = function() {
        var isEmailTested = false;
        if (!angular.isUndefinedOrNull($scope.testedEmailConfig)) {
          delete $scope.testedEmailConfig.receiverId;
          isEmailTested = angular.equals($scope.testedEmailConfig, $scope.project.emailConfig);
        }
        return isEmailTested;
      };

      $scope.isValidTestEmailConfig = function() {
        return !angular.isUndefinedOrNull($scope.project.emailConfig) && !angular.isUndefinedOrNull($scope.project.emailConfig.senderEmail) && !angular.isUndefinedOrNull($scope.project.emailConfig.host) && !angular.isUndefinedOrNull($scope.project.emailConfig.username) && !angular.isUndefinedOrNull($scope.project.emailConfig.password) && !angular.isUndefinedOrNull($scope.project.emailConfig.port) && !angular.isUndefinedOrNull($scope.project.emailConfig.secureProtocol);
      };

      $scope.toggleSelection = function toggleSelection(chanelName) {
        var idx = $scope.project.channels.indexOf(chanelName);

        // is currently selected
        if (idx > -1) {
          $scope.project.channels.splice(idx, 1);
        }

        // is newly selected
        else {
          $scope.project.channels.push(chanelName);
        }
      };

      $scope.disabled = undefined;
      $scope.searchEnabled = undefined;

      $scope.enable = function() {
        $scope.disabled = false;
      };

      $scope.disable = function() {
        $scope.disabled = true;
      };

      $scope.enableSearch = function() {
        $scope.searchEnabled = true;
      };

      $scope.disableSearch = function() {
        $scope.searchEnabled = false;
      };

      $scope.multipleBU = {};
      $scope.multipleBU.channels = [];
      $scope.multipleBU.selectedUsers = [];
      $scope.multipleBU.selectedAdmins = [];
      $scope.multipleBU.selectedTeams = [];
      $scope.multipleBU.selectedSupports = [];



      $scope.businessusers = businessUserDetails.results;

      $scope.$watchCollection('multipleBU', function(newValue, oldValue) {

        //Remove items from project leaders and add back to business users
        if (oldValue.selectedUsers.length > newValue.selectedUsers.length) {
          for (var a = 0; a < oldValue.selectedUsers.length; a++) {
            var int = 0;
            for (var b = 0; b < newValue.selectedUsers.length; b++) {
              //console.log(newValue.selectedUsers[b]);
              if (oldValue.selectedUsers[a].id == newValue.selectedUsers[b].id) {
                int = 1;
              }
            }
            if (int == 0) {
              $scope.businessusers.push(oldValue.selectedUsers[a])
            }
          }
        }

        //Add items from project leaders and remove from business users
        if (oldValue.selectedUsers.length < newValue.selectedUsers.length) {
          for (var i = 0; i < newValue.selectedUsers.length; i++) {
            for (var j = 0; j < $scope.businessusers.length; j++) {
              if (newValue.selectedUsers[i] === $scope.businessusers[j]) {
                $scope.businessusers.splice(j, 1);
              }
            }
          }
        }

        //Remove items from project admins and add back to business users
        if (oldValue.selectedAdmins.length > newValue.selectedAdmins.length) {
          for (var c = 0; c < oldValue.selectedAdmins.length; c++) {
            var int = 0;
            for (var d = 0; d < newValue.selectedAdmins.length; d++) {
              //console.log(newValue.selectedUsers[d]);
              if (oldValue.selectedAdmins[c].id == newValue.selectedAdmins[d].id) {
                int = 1;
              }
            }
            if (int == 0) {
              $scope.businessusers.push(oldValue.selectedAdmins[c])
            }
          }
        }

        //Add items from project admins and remove from business users
        if (oldValue.selectedAdmins.length < newValue.selectedAdmins.length) {
          for (var k = 0; k < newValue.selectedAdmins.length; k++) {
            for (var l = 0; l < $scope.businessusers.length; l++) {
              if (newValue.selectedAdmins[k] === $scope.businessusers[l]) {
                $scope.businessusers.splice(l, 1);
              }
            }
          }
        }

        //Remove items from project teams and add back to business users
        if (oldValue.selectedTeams.length > newValue.selectedTeams.length) {
          for (var a = 0; a < oldValue.selectedTeams.length; a++) {
            var int = 0;
            for (var b = 0; b < newValue.selectedTeams.length; b++) {
              //console.log(newValue.selectedUsers[b]);
              if (oldValue.selectedTeams[a].id == newValue.selectedTeams[b].id) {
                int = 1;
              }
            }
            if (int == 0) {
              $scope.businessusers.push(oldValue.selectedTeams[a])
            }
          }
        }

        //Add items from project teams and remove from business users
        if (oldValue.selectedTeams.length < newValue.selectedTeams.length) {
          for (var i = 0; i < newValue.selectedTeams.length; i++) {
            for (var j = 0; j < $scope.businessusers.length; j++) {
              if (newValue.selectedTeams[i] === $scope.businessusers[j]) {
                $scope.businessusers.splice(j, 1);
              }
            }
          }
        }

        //Remove items from project supports and add back to business users
        if (oldValue.selectedSupports.length > newValue.selectedSupports.length) {
          for (var a = 0; a < oldValue.selectedSupports.length; a++) {
            var int = 0;
            for (var b = 0; b < newValue.selectedSupports.length; b++) {
              //console.log(newValue.selectedUsers[b]);
              if (oldValue.selectedSupports[a].id == newValue.selectedSupports[b].id) {
                int = 1;
              }
            }
            if (int == 0) {
              $scope.businessusers.push(oldValue.selectedSupports[a])
            }
          }
        }

        //Add items from project supports and remove from business users
        if (oldValue.selectedSupports.length < newValue.selectedSupports.length) {
          for (var i = 0; i < newValue.selectedSupports.length; i++) {
            for (var j = 0; j < $scope.businessusers.length; j++) {
              if (newValue.selectedSupports[i] === $scope.businessusers[j]) {
                $scope.businessusers.splice(j, 1);
              }
            }
          }
        }

      });


      $scope.listChannels = ['Web', 'Mobile', 'Call Center', 'Human', 'Partner', 'In Person', 'Store', 'Kiosk', 'Catalog', 'Other'];
      $scope.addChannel = function() {
        var modalInstance = modalService.createChannel();
        modalInstance.result.then(function(result) {
          if ($scope.listChannels.indexOf(result.title) == -1) {
            $scope.listChannels.push(result.title);
            //pushing newly added channel to selelected channel list
            $scope.project.channels.push(result.title);
          } else {
            alertsService.addAlert({
              title: 'Error',
              message: 'Added Channel is already there ...',
              type: 'error',
              removeOnStateChange: 2
            });
          }
        });
      };

      $scope.today = function() {
        $scope.project.startDate = new Date();
        $scope.project.endDate = new Date();
      };

      $scope.today();

      $scope.clear = function() {
        $scope.project.startDate = null;
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

      $scope.getDayClass = function(date, mode) {
        if (mode === 'day') {
          var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

          for (var i = 0; i < $scope.events.length; i++) {
            var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

            if (dayToCheck === currentDay) {
              return $scope.events[i].status;
            }
          }
        }

        return '';
      };


      function addOneDayToEndDate(date) {
        var dt = new Date(date);
        dt.setDate(dt.getDate() + 1);
        return dt;
      }

      function addNintyDayToEndDate(date) {
        var dt = new Date(date);
        dt.setDate(dt.getDate() + 90);
        return dt;
      }

      //if end min date default null
      $scope.minEndDate = $scope.minEndDate ? null : addNintyDayToEndDate(new Date());

      $scope.onStartDateChange = function() {
        $scope.minEndDate = $scope.project.startDate;
        if (getDaysDifference($scope.project.endDate, $scope.project.startDate) < 0) {
          $scope.project.endDate = addOneDayToEndDate($scope.project.startDate);
        }
        $scope.minEndDate = addOneDayToEndDate($scope.minEndDate);
      }

      function getDaysDifference(date1, date2) {
        var d1 = new Date($filter('date')(date1, 'yyyy-MM-dd'));
        var d2 = new Date($filter('date')(date2, 'yyyy-MM-dd'));
        return ((d1 - d2) / (1000 * 3600 * 24)).toFixed(0);
      }

      $scope.submitProjectForm = function() {
        var selectedBUIds = [];

        if (angular.isDefined($scope.multipleBU.selectedUsers) && $scope.multipleBU.selectedUsers !== null) {
          for (i = 0; i < $scope.multipleBU.selectedUsers.length; i++) {
            if ($scope.multipleBU.selectedUsers[i].id !== null) {
              $scope.project.projectLeaderIds[i] = $scope.multipleBU.selectedUsers[i].id;
              selectedBUIds.push($scope.multipleBU.selectedUsers[i].id);
            }
          }
        }

        if (angular.isDefined($scope.multipleBU.selectedAdmins) && $scope.multipleBU.selectedAdmins != null) {
          for (i = 0; i < $scope.multipleBU.selectedAdmins.length; i++) {
            if ($scope.multipleBU.selectedAdmins[i].id != null) {
              $scope.project.projectAdminIds[i] = $scope.multipleBU.selectedAdmins[i].id;
              selectedBUIds.push($scope.multipleBU.selectedAdmins[i].id);
            }
          }
        }

        if (angular.isDefined($scope.multipleBU.selectedTeams) && $scope.multipleBU.selectedTeams !== null) {
          for (i = 0; i < $scope.multipleBU.selectedTeams.length; i++) {
            if ($scope.multipleBU.selectedTeams[i].id !== null) {
              $scope.project.projectTeamMemberIds[i] = $scope.multipleBU.selectedTeams[i].id;
              selectedBUIds.push($scope.multipleBU.selectedTeams[i].id);
            }
          }
        }


        if (angular.isDefined($scope.multipleBU.selectedSupports) && $scope.multipleBU.selectedSupports !== null) {
          for (i = 0; i < $scope.multipleBU.selectedSupports.length; i++) {
            if ($scope.multipleBU.selectedSupports[i].id !== null) {
              $scope.project.projectSupportMemberIds[i] = $scope.multipleBU.selectedSupports[i].id;
              selectedBUIds.push($scope.multipleBU.selectedSupports[i].id);
            }

          }
        }

        var isLoginUserIn = false;
        for (var i = 0; selectedBUIds.length > i; i++) {
          if (selectedBUIds[i] === $scope.project.creatorId) {
            isLoginUserIn = true;
          }
        }



        if ($scope.project.channels.length == 0) {
          alertsService.addAlert({
            title: 'Error',
            message: 'Channel is Required.',
            type: 'error',
            removeOnStateChange: 2
          });
        } else if ($scope.project.channels.length > 5) {
          alertsService.addAlert({
            title: 'Error',
            message: 'Please Select Maximum 5 channels',
            type: 'error',
            removeOnStateChange: 2
          });
        } else if (!isLoginUserIn) {
          alertsService.addAlert({
            title: 'Error',
            message: 'Logged In User should be selected as project leader or admin or team or support user',
            type: 'error',
            removeOnStateChange: 2
          });

        } else if ($scope.project.projectLeaderIds.length == 0) {
          alertsService.addAlert({
            title: 'Error',
            message: 'Project Leaders cannot be empty',
            type: 'error',
            removeOnStateChange: 2
          });

        } else if ($scope.project.projectAdminIds.length == 0) {
          alertsService.addAlert({
            title: 'Error',
            message: 'Project Admins cannot be empty',
            type: 'error',
            removeOnStateChange: 2
          });
        } else {
          $rootScope.loader = true;
          projectService.createProject($scope.project).then(function(data) {
            $rootScope.loader = false;
            alertsService.addAlert({
              title: 'Success',
              message: 'Project "' + $scope.project.title + '" successfully created',
              type: 'success',
              removeOnStateChange: 2
            });
            //updating newwly created project and redirect to edit map screen
            security.updateSecurityDetails();
            projectDetails.clear();
            localStorageService.set('projectId', data.id);
            var user = userDetails.getUser();

            if(_.any($scope.project.projectLeaderIds, function(id) {return user.id === id}) || _.any($scope.project.projectAdminIds, function(id) {return user.id === id})) {
              $state.go('index.secured.mapedit', {}, {
                reload: true
              });
            }
            else if(_.any($scope.project.projectTeamMemberIds, function(id) {return user.id === id}) || _.any($scope.project.projectSupportMemberIds, function(id) {return user.id === id})) {
              $state.go('index.secured.project.search', {}, {
                reload: true
              });
            }
          }, function(err) {
            $rootScope.loader = false;
            //console.error('Could not create project', err);
          });
        }
      }

      /*S3 Implementation*/

      $scope.downloadFile = function(uri) {
        s3Uploader.getDownloadSignature(uri).then(function(response) {
          window.open(response.data.downloadLink, '_blank');
        }, function(err) {
          $log.error("Could not save application", err);
        })
      };

      var uploadOptions = {
        destroyWithScope: $scope,
        bucket: s3config(),
        acl: 'public-read',
        folder: '/administration/' + clientDetails.getSelectedClient().id + '/project/',
        maxsize: '5',
        fileTypes: ['gif', 'jpg', 'jpeg', 'png', 'gif', 'ico', 'svg', 'psd', 'raw', 'tiff']
      };

      $scope.uploadManager = uploadManager.newS3UploadId(uploadOptions);

      $scope.getFileName = function(fileURL) {
        if (!fileURL) {
          return '';
        }
        var fileName = fileURL.split("/").pop();
        fileName = fileName.substring(fileName.indexOf("_") + 1);
        return fileName.substring(0, fileName.lastIndexOf('.'));
      };

      $('span.tooltip-hover').webuiPopover('destroy').webuiPopover({
			trigger:'hover',
			placement:'right',
			delay:{
				show:0,
				hide:500
			}
		});
    }
  ]);

})(angular.module('aet.screens.project'));
