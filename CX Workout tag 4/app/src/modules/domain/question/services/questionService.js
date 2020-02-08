(function(module) {

  module.service('questionService', ['questionEndpoint', 'questionTransformer', '$q', '$log', 'clientDetails', 'ClientRole', 'userDetails',
    function(questionEndpoint, questionTransformer, $q, $log, clientDetails, ClientRole, userDetails) {

      this.getQuestions = function (missionId) {

        return questionEndpoint.listQuestions(missionId).then(function (response) {
          return questionTransformer.DTOToMissionQuestion(response.data);;
        }, function (err) {
          console.error("Could not load questions");
          return $q.reject(err);
        });
      };

    }
  ]);

})(angular.module('aet.domain.question'));
