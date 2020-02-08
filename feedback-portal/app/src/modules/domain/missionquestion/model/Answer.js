(function(module) {

  module.service('Answer', [function() {

    function Answer() {

      this.answerId = undefined;
      this.previousAnswer = undefined;
      this.answer = undefined;
    }

    return Answer;

  }]);

})(angular.module('aet.domain.missionquestion'));
