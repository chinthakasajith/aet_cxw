(function(module) {

  module.service('MissionQuestion', [function() {

    function MissionQuestion() {

      this.id = undefined;
      this.logoUrl = undefined;
      this.thankYouMsg = undefined;
      this.actions = [];

    }

    return MissionQuestion;

  }]);

})(angular.module('aet.domain.question'));
