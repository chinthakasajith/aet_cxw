(function(module) {

  module.service('Answer', [function() {

    function Answer() {

      this.actionId = undefined;
      this.answers = [];

    }

    return Answer;

  }]);

})(angular.module('aet.domain.question'));
