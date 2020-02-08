(function(module) {

  module.config(['$stateProvider',
    function($stateProvider) {

      $stateProvider
        .state('index.thank', {
          url: '/thankyou?token=:tokenId',
          templateUrl: 'src/screens/thankyou/templates/thank.html',
          controller: 'ThankController',
          resolve:{
            feedbackResponse:['missionQuestionService', '$stateParams', function(missionQuestionService, $stateParams) {
              return missionQuestionService.getFinalThankYouMessage($stateParams.token);
            }]
          }
        })
    }
  ]);

})(angular.module('aet-screens-thank'));
