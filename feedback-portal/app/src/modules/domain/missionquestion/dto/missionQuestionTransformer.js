(function(module) {

  module.service('missionQuestionTransformer', ['MissionQuestion', 'genericTransformer', '$log', 'Option', 'Answer', 'UpdateMissionQuestionDTO',
    function(MissionQuestion, genericTransformer, $log, Option, Answer, UpdateMissionQuestionDTO) {

      this.DTOToMissionQuestion = function(dto) {
        var missionQuestion = genericTransformer.DTOToObject(dto, MissionQuestion);
        missionQuestion.client = dto.client;
        missionQuestion.participant = dto.participant;
        missionQuestion.actions = dto.actions;

        angular.forEach(missionQuestion.actions, function(action, akey) {
          var tempGroupName = '';
          var questionList = [];
          angular.forEach(action.questions, function(question, qkey) {
            if (angular.isDefined(action.questions[qkey - 1]) && ((question.groupName === tempGroupName))) {
              //question.groupName = undefined;
            } else {
              tempGroupName = question.groupName;
              question.headerGroupName = question.groupName;
            }

            question.answer = angular.copy(question.previousAnswer);

            if (question.inputType === 'SLIDER') {
              question = transformSliderQuestion(question);
            }

            if (question.inputType === 'FILEUPLOAD') {
              question.answerList = [];
              question.answerList.push(constructAnswer(question));
            }

            //questionList.push(question);
            questionList = findAndAppendElement(questionList, question);
            action.questions = questionList;
          });
        });
        return missionQuestion;
      };

      this.DTOToAction = function(dto) {
        var action = dto;
        var tempGroupName = '';
        var questionList = [];
        angular.forEach(action.questions, function(question, qkey) {
          if (angular.isDefined(action.questions[qkey - 1]) && ((question.groupName === tempGroupName))) {
            //question.groupName = undefined;
          } else {
            tempGroupName = question.groupName;
            question.headerGroupName = question.groupName;
          }

          question.answer = angular.copy(question.previousAnswer);

          if (question.inputType === 'SLIDER') {
            question = transformSliderQuestion(question);
          }

          if (question.inputType === 'FILEUPLOAD') {
            question.answerList = [];
            question.answerList.push(constructAnswer(question));
          }

          //questionList.push(question);
          questionList = findAndAppendElement(questionList, question);
          action.questions = questionList;
        });
        return action;
      };

      //This function checks if the response has repeated questions which signifies multiple answers and created a answerList in one question block
      function findAndAppendElement(list, mQuestion) {

        // if empty push the question
        if (list.length <= 0) {
          list.push(mQuestion);
        } else {
          var isDuplicate = false;
          // if not empty add question check if its already there
          angular.forEach(list, function(question, key) {
            // if it is a duplicate question aggregate the answers
            if (question.questionId === mQuestion.questionId) {

              if (angular.isUndefined(question.answerList)) {
                question.answerList = [];
                question.answerList.push(constructAnswer(question));
                delete question.previousAnswerId;
                delete question.previousAnswer;
                delete question.answer;
              }
              question.answerList.push(constructAnswer(mQuestion));
              isDuplicate = true;
            }
          });
          // if not empty add question if its note a duplicate add the question
          if (!isDuplicate) {
            list.push(mQuestion);
          }
        }
        return list;
      }

      function constructAnswer(question) {
        var answer = new Answer();
        answer.answerId = question.previousAnswerId;
        answer.previousAnswer = question.previousAnswer;
        answer.answer = question.previousAnswer;
        return answer;
      }

      function transformSliderQuestion(question) {
        var sliderOption = new Option();
        sliderOption.scale[0] = "<img height='10' width='10' src='assets/images/right-arrow.png' />";
        for (var i = 1; i < 6; i++) {
          var found = false;
          angular.forEach(question.labels, function(label, keyLabel) {
            if (keyLabel == i) {
              found = true;
              sliderOption.scale[i] = i + "<br><div class='ratingLabel'>" + label + "</div>";
            }
          });
          if (!found)
            sliderOption.scale[i] = i;
        }
        question.option = sliderOption;

        if (angular.isUndefined(question.previousAnswer) || question.previousAnswer === null) {
          question.answer = "0";
        } else {
          question.answer = angular.copy(question.previousAnswer);
        }
        return question;
      }

      this.missionQuestionToUpdateDTO = function(missionquestion, send) {
        var dto = genericTransformer.objectToDTO(missionquestion, UpdateMissionQuestionDTO);

        //var answersArray=[];
        //  angular.forEach(missionquestion.actions, function(action, key) {
        //dto.actionId = action.actionId;
        dto.isComplete = send;


        for (var key in missionquestion.questions) {
          if (angular.isDefined(missionquestion.questions[key].answerList) && missionquestion.questions[key].answerList.length > 0) {
            angular.forEach(missionquestion.questions[key].answerList, function(answer, akey) {
              if (!((missionquestion.questions[key].questionId == 8 || missionquestion.questions[key].questionId == 1) && answer.answer == "" && answer.answerId == undefined)){
            	  dto.answers.push({
                      questionId: missionquestion.questions[key].questionId,
                      answerId: answer.answerId,
                      answer: answer.answer,
                      isPositive: missionquestion.questions[key].isPositive
                    });
              }
              
            });
          } else {
        	  if (!((missionquestion.questions[key].questionId == 8 || missionquestion.questions[key].questionId == 1) && answer.answer == "" && missionquestion.questions[key].previousAnswerId == undefined)){
        		  dto.answers.push({
                      questionId: missionquestion.questions[key].questionId,
                      answerId: missionquestion.questions[key].previousAnswerId,
                      answer: missionquestion.questions[key].answer,
                      isPositive: missionquestion.questions[key].isPositive
                    });
        	  }
            
          }
        }
        //});
        //answersArray.push(dto);
        return dto;
      }


    }
  ]);

})(angular.module('aet.domain.missionquestion'));
