(function(module) {

  module.config(['$stateProvider',
    function($stateProvider) {

      $stateProvider
        .state('index', {
          abstract: true,
          url: '',
          views: {
            'body': {
              template: '<ui-view></ui-view>'
            }
          }
        })
        .state('index.mission', {
          url: '/mission?token=:tokenId',
          templateUrl: 'src/screens/mission/templates/mission.html',
          controller: 'MissionController',
          data: {
            selectedTab: "Mission"
          },
          resolve: {
            missionQuestions: ['missionQuestionService', '$stateParams', '$state', function(missionQuestionService, $stateParams, $state) {
              return missionQuestionService.findMissionQuestion($stateParams.token);
            }]
          }
        })
    }
  ]);

})(angular.module('aet-screens-mission'));
