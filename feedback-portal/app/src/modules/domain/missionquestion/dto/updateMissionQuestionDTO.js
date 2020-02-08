(function(module) {

  module.service('UpdateMissionQuestionDTO', [function() {

    function UpdateMissionQuestionDTO() {

      this.actionId = undefined;
      this.answers = [];
      this.isComplete=undefined;

    }

    return UpdateMissionQuestionDTO;

  }]);

})(angular.module('aet.domain.missionquestion'));
