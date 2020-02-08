(function(module) {

  module.service('questionTransformer', ['MissionQuestion', 'Option', 'genericTransformer', 'clientRoleTransformer', '$log', 'CreateProjectDTO', 'UpdateProjectDTO',
    function(MissionQuestion, Option, genericTransformer, clientRoleTransformer, $log, CreateProjectDTO, UpdateProjectDTO) {

      this.DTOToMissionQuestion = function(dto) {
            var missionQuestion = genericTransformer.DTOToObject(dto, MissionQuestion);
            missionQuestion.client = dto.client;
            missionQuestion.actions = dto.actions;
            angular.forEach(missionQuestion.actions, function(action, akey) {
              var tempGroupName = '';
              angular.forEach(action.questions, function(question, qkey) {

                var sliderOption = new Option();
                sliderOption.scale[0] = "<img height='10' width='10' src='assets/images/right-arrow.png' />";
                for (var i = 1; i < 6; i++) {
                  var found = false;
                  angular.forEach(question.labels, function(label, keyLabel) {
                    if (keyLabel == i) {
                      found = true;
                      sliderOption.scale[i] = i + " <br><div>" + label+"</div>" ;
                    }
                  });
                  if (!found)
                    sliderOption.scale[i] = i;
                }
                question.option = sliderOption;

                if (angular.isDefined(action.questions[qkey - 1]) && ((question.groupName === tempGroupName))) {
                  //question.groupName = undefined;
                } else {
                  tempGroupName = question.groupName;
                  question.headerGroupName=question.groupName;
                }

                if (question.inputType === 'SLIDER' && (angular.isUndefined(question.previousAnswer) || question.previousAnswer === null)) {
                  question.answer = "0";
                } else {
                  question.answer = question.previousAnswer;
                }
              });

            });
            return missionQuestion;
          };
    }
  ]);

})(angular.module('aet.domain.question'));
