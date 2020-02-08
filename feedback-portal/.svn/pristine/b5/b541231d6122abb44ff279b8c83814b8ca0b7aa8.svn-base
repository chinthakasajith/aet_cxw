(function(module) {
  module.controller('MissionController', ['$scope', '$stateParams', 'missionQuestions', 'alertsService', 'missionQuestionService', '$state', 'uploadManager', 's3Uploader', 's3config', 'modalService',
    function($scope, $stateParams, missionQuestions, alertsService, missionQuestionService, $state, uploadManager, s3Uploader, s3config, modalService) {

      $scope.defaultSelectValue = true;

      if (missionQuestions.status === "COMPLETED") {
        $state.go('index.thank', {
          token: $stateParams.token
        });
      } else {

        $scope.tnc = '';

        if (missionQuestions.participant.type === 'CUSTOMERS' && missionQuestions.participant.status !== 'ACCEPTED_TNC') {
          var addModalInstance = modalService.TNC(missionQuestions.client);
          addModalInstance.result.then(function(result) {
            $scope.loader = true;
            if (result.status === 'accept') {
              missionQuestionService.missionAccept($stateParams.token).then(function(res) {
                $scope.questionStatus = 'show';
                $scope.loader = false;
              });
            } else {
              missionQuestionService.missionDecline($stateParams.token).then(function(res) {
                $state.go('index.thank', {
                  token: $stateParams.token
                });
                $scope.loader = false;
              });
            }
          });
        } else {
          $scope.questionStatus = 'show';
        }

        $scope.mission = missionQuestions;

        $scope.loader = false;

        $scope.item = 0;
        //$scope.isNextDisabled = false;
        $scope.isPreviousDisabled = true;
        //$scope.isFinishDisabled = true;
        var sizeOfMissionActions = $scope.mission.actions.length;

        if (sizeOfMissionActions > 1) {
          $scope.isFinished = false;
          $scope.isNextDisabled = true;
          $scope.isFinishDisabled = false;
        } else {
          $scope.isFinished = true;
          $scope.isNextDisabled = false;
          $scope.isFinishDisabled = true;
        }

        $scope.select = function(index, first, last) {
          $scope.item = index;
          if (first === true && last === false) {
            $scope.isNextDisabled = false;
            $scope.isPreviousDisabled = true;
            $scope.isFinished = false;
          }
          if (first === false && last === false) {
            $scope.isNextDisabled = false;
            $scope.isPreviousDisabled = false;
            $scope.isFinished = false;
          }
          if (last === true && first === false) {
            $scope.isNextDisabled = true;
            $scope.isPreviousDisabled = false;
            $scope.isFinished = true;
          }
        };

        $scope.next = function() {
          window.scrollTo(0, 0);
          submitAnswers($scope.mission.actions[$scope.item], false);
          if ($scope.item < (sizeOfMissionActions - 1)) {
            $scope.item = $scope.item + 1;
            $scope.isPreviousDisabled = false;
          }
          if ($scope.item === (sizeOfMissionActions - 1)) {
            $scope.isNextDisabled = true;
            $scope.isPreviousDisabled = false;
            $scope.isFinished = true;
          }
          transformQuestions();
        };

        $scope.previous = function() {
          submitAnswers($scope.mission.actions[$scope.item], false);
          if (sizeOfMissionActions > $scope.item && $scope.item !== 0) {
            $scope.item = $scope.item - 1;
            $scope.isNextDisabled = false;
            $scope.isFinished = false;
          }
          if ($scope.item == 0) {
            $scope.isPreviousDisabled = true;
          }
          transformQuestions();
        };

        $scope.finish = function() {
          submitAnswers($scope.mission.actions[$scope.item], true);
        };

        $scope.isAnswerComplete = function() {
          var isAnswerComplete = true;
          angular.forEach($scope.mission.actions[$scope.item].questions, function(question, key) {
            if (angular.equals(question.inputType, 'SLIDER') && angular.equals(question.answer, '0')) {
              isAnswerComplete = false;
            }
            if (angular.equals(question.inputType, 'TEXTBOX') && angular.isDefined(question.answer)) {
              var textAnswerCount = question.answer.length;
              if (textAnswerCount > 2000) {
                isAnswerComplete = false;
              }

            }
          });
          return isAnswerComplete;
        };

        function submitAnswers(actionAnswers, send) {
          if (send) {
            $scope.loader = true;
          }
          missionQuestionService.updateMissionQuestion(actionAnswers, send).then(function(response) {
            alertsService.addAlert({
              title: 'Success',
              message: 'Answers successfully updated',
              type: 'success',
              removeOnStateChange: 2
            });
            if (angular.equals(send, true)) {
              $state.go('index.thank', {
                token: $stateParams.token
              });
            }

            angular.forEach($scope.mission.actions, function(action, aKey) {
              if (angular.equals(action.actionId, response.actionId)) {
                $scope.mission.actions[aKey] = angular.copy(response);
              }
            });

            // check if $scope.mission.actions[$scope.item].questions all answers have ids if not retrieve questions again. might have to use the loader to stop users from entering new data while we retrieve the response with the IDs.
          }, function(err) {
            $scope.loader = false;
          });

        }

        /*S3 implementation*/
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
          folder: 'feedback/',
          maxsize: '50',
          fileTypes: ['gif', 'jpg', 'jpeg', 'png', 'gif', 'ico', 'svg', 'psd', 'raw', 'tiff', 'mp3', 'm4a', 'm4b', 'm4p', 'm4v', 'ogg', 'wav', 'mp4', 'm4v', 'mov', 'wmv', 'avi', 'mpg', 'mpeg', 'ogv', '3gp', '3g2', '3gpp', '3gp2', 'aiff', 'aif', 'aifc', 'cdda', 'amr', 'swa', 'flac', 'pdf', 'doc', 'docx', 'txt', 'rtf']
        };

        $scope.uploadManager = uploadManager.newS3UploadId(uploadOptions);
        $scope.uploadManager2 = uploadManager.newS3UploadId(uploadOptions);
        $scope.uploadManager3 = uploadManager.newS3UploadId(uploadOptions);

        $scope.getFileName = function(fileURL) {
          if (!fileURL) {
            return '';
          }
          var fileName = fileURL.split("/").pop();
          fileName = fileName.substring(fileName.indexOf("_") + 1);
          return fileName.substring(0, fileName.lastIndexOf('.'));
        };

        $scope.$watch('mission', function(newVal, oldVal) {
          transformQuestions();
        }, true);

        function transformQuestions() {
          angular.forEach($scope.mission.actions, function(action) {
            angular.forEach(action.questions, function(question, qkey) {
              if (angular.equals('FILEUPLOAD', question.inputType)) {

                if ((!angular.equals($scope.mission.actions[$scope.item].actionId, action.actionId))) {
                  angular.forEach(question.answerList, function(answer, aKey) {
                    answer.answer = angular.copy(answer.previousAnswer);
                  });
                } else {
                  angular.forEach(question.answerList, function(answer, aKey) {
                    answer.previousAnswer = angular.copy(answer.answer);
                  });

                  if (angular.isDefined(question.answerList)) {
                    if (!$scope.uploadManager.uploading && !$scope.uploadManager2.uploading && !$scope.uploadManager3.uploading) {
                      //moving the empty answers to bottom
                      question.answerList.sort(function(a, b) {
                        if (angular.isUndefined(a.answer))
                          a.answer = "";
                        if (angular.isUndefined(b.answer))
                          b.answer = "";
                        var va = (a.answer === null) ? "" : "" + a.answer,
                          vb = (b.answer === null) ? "" : "" + b.answer;

                        return va < vb ? 1 : (va === vb ? 0 : -1);
                      });

                      //Rearraging the list
                      var i = question.answerList.length;
                      while (i--) {
                        if (angular.isDefinedAndNotEmpty(question.answerList[i].answer)) {
                          question.answerList.move(0, i);
                        }
                      }
                    }
                    //question.previousAnswer = angular.copy(question.answer);
                    if ((angular.isDefinedAndNotEmpty(question.answerList[0]) && angular.isDefinedAndNotEmpty(question.answerList[0].answer)) || (angular.isDefinedAndNotEmpty(question.answerList[1]) && angular.isDefinedAndNotEmpty(question.answerList[1].answer))) {
                      $scope.uploadManager2.isVisible = true;
                    }

                    if ((angular.isDefinedAndNotEmpty(question.answerList[1]) && angular.isDefinedAndNotEmpty(question.answerList[1].answer)) || (angular.isDefinedAndNotEmpty(question.answerList[2]) && angular.isDefinedAndNotEmpty(question.answerList[2].answer))) {
                      $scope.uploadManager3.isVisible = true;
                    }

                    if ((angular.isUndefinedOrNull(question.answerList[0]) || angular.isUndefinedOrNull(question.answerList[0].answer)) && (angular.isUndefinedOrNull(question.answerList[1]) || angular.isUndefinedOrNull(question.answerList[1].answer))) {
                      $scope.uploadManager2.isVisible = false;
                    }

                    if ((angular.isUndefinedOrNull(question.answerList[1]) || angular.isUndefinedOrNull(question.answerList[1].answer)) && (angular.isUndefinedOrNull(question.answerList[2]) || angular.isUndefinedOrNull(question.answerList[2].answer))) {
                      $scope.uploadManager3.isVisible = false;
                    }
                  }
                }
              }
            });
          });
        }

        angular.isUndefinedOrNull = function(val) {
          return angular.isUndefined(val) || val === null || val === ""
        };

        angular.isDefinedAndNotEmpty = function(val) {
          return angular.isDefined(val) && !angular.equals(val, "") && !angular.equals(val, null);
        };

        Array.prototype.move = function(old_index, new_index) {
          if (new_index >= this.length) {
            var k = new_index - this.length;
            while ((k--) + 1) {
              this.push(undefined);
            }
          }
          this.splice(new_index, 0, this.splice(old_index, 1)[0]);
          return this;
        };
      }
    }
  ]);

})(angular.module('aet-screens-mission'));
