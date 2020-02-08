(function(module) {

  module.service('questionEndpoint', ['$q', '$http', 'api', 'clientDetails', 'projectDetails',
    function($q, $http, api, clientDetails, projectDetails) {

      this.listQuestions = function(missionId) {
        console.log('hit');
        var listQuestionsURL = api('admin') + '/client/' + clientDetails.getSelectedClient().id + '/project/' + projectDetails.getSelectedProject().id + '/mission/' + missionId + '/preview';
        return $http.get(listQuestionsURL);
      };

    }
  ]);

})(angular.module('aet.endpoints'));
