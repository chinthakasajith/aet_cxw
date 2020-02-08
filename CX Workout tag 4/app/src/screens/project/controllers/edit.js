(function(module) {

  module.controller('EditProjectController', ['$scope', '$rootScope', '$q', '$filter', 'alertsService', 'security', 'ChangeChannelDTO', 'projectDetails', 'clientDetails', 'userDetails', 'localStorageService', 'modalService', 'changeDefaultChannelService', 'projectService', '$state', '$log', 'project', 'businessUserDetails', 'smeUserDetails', 'uploadManager', 's3Uploader', 's3config', '$stateParams', 'SendTestEmailDTO',
    function($scope, $rootScope, $q, $filter, alertsService, security, ChangeChannelDTO, projectDetails, clientDetails, userDetails, localStorageService, modalService, changeDefaultChannelService, projectService, $state, $log, project, businessUserDetails, smeUserDetails, uploadManager, s3Uploader, s3config, $stateParams, SendTestEmailDTO) {
	  
	  projectDetails.setSelectedProject(project.id);
      $scope.businessusers = angular.copy(businessUserDetails.results);
      //to gettting SME Users
      $scope.smeUserDetails = smeUserDetails.results;

      //getting logged user for check in BU
      $scope.logginId = userDetails.getUserId();

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
      $scope.multipleBU.selectedUsers = project.projectLeaders;
      $scope.multipleBU.selectedAdmins = project.projectAdmins;
      $scope.multipleBU.selectedTeams = project.projectTeamMembers;
      $scope.multipleBU.selectedSupports = project.projectSupportMembers;

      $scope.testedEmailConfig = angular.copy(project.emailConfig);
      $scope.buttonLoader = false;

      $scope.isValidProjectInfo = function() {
        var isEmailValid = $scope.isValidEmailConfig();
        if ($scope.isValidTestEmailConfig()) {
          isEmailValid = $scope.isEmailConfigTested();
        }
        return !$scope.editProjectForm.$invalid && isEmailValid && $scope.project.logoUrl;
      }

      $scope.isValidProjectLogo = function() {
        var isEmailValid = $scope.isValidEmailConfig();
        if ($scope.isValidTestEmailConfig()) {
          isEmailValid = $scope.isEmailConfigTested();
        }
        return !$scope.editProjectForm.$invalid && isEmailValid && !$scope.project.logoUrl;
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

      $scope.$watchCollection('project.projectSMEIds', function(newValue, oldValue) {

        angular.forEach($scope.multipleBU, function(list, buKey) {
          angular.forEach(list, function(user, lKey) {
            angular.forEach(newValue, function(uSME, smeKey) {
              if (angular.equals(user.id, uSME.id)) {
                list.splice(lKey, 1);
              };
            });
          });
        });
      });

      //Business User Filter
      $scope.$watchCollection('multipleBU', function(newValue, oldValue) {
        var tempBUserList = angular.copy(businessUserDetails.results);
        //this removes every added user from the full business user list
        angular.forEach($scope.multipleBU, function(list, buKey) {
          angular.forEach(list, function(user, lKey) {
            angular.forEach(tempBUserList, function(bUser, bKey) {
              if (angular.equals(user.id, bUser.id)) {
                tempBUserList.splice(bKey, 1);
              };
            });
          });
        });

        $scope.businessusers =  tempBUserList;
      });

      $scope.project = project;
      $scope.channelTitles = [];

      $scope.previouslySelectedChannels = [];
      //newly added channels keep here
      $scope.newlyAddedChannels = [];
      for (var key in $scope.project.channels) {
        //putting previously selected channels to disable when page loading
        $scope.previouslySelectedChannels[key] = $scope.project.channels[key].title;
      }


      $scope.$watch('project.channels', function() {
        $scope.listChannels = ['Web', 'Mobile', 'Call Center', 'Human', 'Partner', 'In Person', 'Store', 'Kiosk', 'Catalog', 'Other'];
        $scope.previouslySelectedChannels = [];
        for (var key in $scope.project.channels) {

          //refreshing previouslySelectedChannels
          if (angular.isObject($scope.project.channels[key])) {
            //already selected channels -> channelTitles
            $scope.channelTitles[key] = $scope.project.channels[key].title;
            $scope.previouslySelectedChannels[key] = $scope.project.channels[key].title;

            if ($scope.listChannels.indexOf($scope.project.channels[key].title) == -1) {
              $scope.listChannels.push($scope.project.channels[key].title);
            }
          }


        }
        //when default channel changed adding newly created channel to listChannels
        for (var key in $scope.newlyAddedChannels) {
          if ($scope.listChannels.indexOf($scope.newlyAddedChannels[key]) == -1) {
            $scope.listChannels.push($scope.newlyAddedChannels[key]);
          }
          if ($scope.project.channels.indexOf($scope.newlyAddedChannels[key]) == -1) {
            $scope.project.channels.push($scope.newlyAddedChannels[key]);
          }
        }

      });


      //create project check list added
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

      $scope.openChangeChannelModel = function(previousChannelName) {
        var previousChannelId;
        angular.forEach($scope.project.channels, function(channel, key) {
          if (channel.title == previousChannelName) {
            previousChannelId = channel.id;
          }
        });
        var modalInstance = changeDefaultChannelService.changeDefaultChannelModel();
        modalInstance.result.then(function(result) {
          if (previousChannelName == result.changedTitle) {
            alertsService.addAlert({
              title: 'Error',
              message: 'Updated Channel is already in the channel list ...',
              type: 'error',
              removeOnStateChange: 2
            });
          } else {
            var channel = new ChangeChannelDTO();
            channel.channelId = previousChannelId;
            channel.title = result.changedTitle;
            var thisTimeSelectedChannels = [];
            //this time selected channels
            angular.forEach($scope.project.channels, function(projectObj, key) {
              if (angular.isString(projectObj) && $scope.newlyAddedChannels.indexOf(projectObj) == -1) {
                thisTimeSelectedChannels.push(projectObj);
              }
            });
            projectService.changeSelectedChannel(channel, $stateParams.projectId).then(function(response) {
              $scope.project.channels = response.channels;
              //refreshing previouslySelectedChannels
              //$scope.previouslySelectedChannels=response.channels;
              angular.forEach(thisTimeSelectedChannels, function(thisTimeSelectedChannel, key) {
                $scope.project.channels.push(thisTimeSelectedChannel);
              });
            });
          }
        });
      }

      $scope.channelList = $scope.channelTitles.toString();

      $scope.addChannel = function() {
        var modalInstance = modalService.createChannel();
        modalInstance.result.then(function(result) {
          if ($scope.listChannels.indexOf(result.title) == -1) {
            //adding chaneel to check box list
            $scope.listChannels.push(result.title);
            //checked newwly added channel to seleted channel list
            $scope.project.channels.push(result.title);
            //selected channel checked and disabled
            $scope.channelTitles.push(result.title);
            //newly added project keeping temporary array
            $scope.newlyAddedChannels.push(result.title);
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


      $scope.clear = function() {
        $scope.project.startDate = null;
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


      $scope.minDate = $scope.minDate ? null : new Date();

      function addOneDayToEndDate(date) {
        var dt = new Date(date);
        dt.setDate(dt.getDate() + 1);
        return dt;
      }

      $scope.minEndDate = $scope.project.startDate;

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

      function isImage(src) {

        var deferred = $q.defer();
        var image = new Image();
        image.onerror = function() {
          deferred.resolve(false);
        };
        image.onload = function() {
          deferred.resolve(true);
        };
        image.src = src;
        return deferred.promise;
      }

      function removeInvalidUrl(url) {
        isImage(url).then(function(result) {
          if (!result) {
            url = "";
          }
        });
      };

      isImage(project.logoUrl).then(function(result) {
        if (!result) {
          project.logoUrl = "";
        }
      });

      $scope.submitProjectForm = function() {

        var selectedBUIds = [];
        $scope.project.projectLeaderIds = [];
        $scope.project.projectAdminIds = [];
        $scope.project.projectTeamMemberIds = [];
        $scope.project.projectSupportMemberIds = [];

        if (angular.isDefined($scope.multipleBU.selectedUsers) && $scope.multipleBU.selectedUsers !== null) {
          for (i = 0; i < $scope.multipleBU.selectedUsers.length; i++) {
            if ($scope.multipleBU.selectedUsers[i].id !== null) {
              $scope.project.projectLeaderIds[i] = $scope.multipleBU.selectedUsers[i].id;
              selectedBUIds.push($scope.multipleBU.selectedUsers[i].id);
            }
          }
        }


        if (angular.isDefined($scope.multipleBU.selectedAdmins) && $scope.multipleBU.selectedAdmins !== null) {
          for (i = 0; i < $scope.multipleBU.selectedAdmins.length; i++) {
            if ($scope.multipleBU.selectedAdmins[i].id !== null) {
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
          if (selectedBUIds[i] === $scope.logginId) {
            isLoginUserIn = true;
          }
        }


        if ($scope.project.channels.length > 5) {
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
          projectService.updateProject($scope.project).then(function(response) {
            $rootScope.loader = false;
            alertsService.addAlert({
              title: 'Success',
              message: 'Project "' + $scope.project.title + '" successfully updated',
              type: 'success',
              removeOnStateChange: 2
            });
            //updating changed project details
            var selectedProjectId = projectDetails.getSelectedProject().id;
            projectDetails.clear();
            localStorageService.set('projectId', selectedProjectId);
            $state.reload();

          }, function(err) {
            $rootScope.loader = false;
            console.error('Could not update project', err);
          });

        }
      };

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

})(angular.module('aet.screens.project'));
