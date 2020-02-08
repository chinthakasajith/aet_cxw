(function (module) {

  module.config(['$stateProvider',
    function ($stateProvider) {

      $stateProvider
        .securedState('index.secured.help', {
          url: '/help',
          views: {
            'main@index': {
              templateUrl: 'src/screens/help/templates/help.html',
              controller: 'HelpController',
            }
          },
          data: {
            screenName: "Helps",
            selectedTab: "Help",
          }
        })

    }
  ]);

})(angular.module('aet.screens.help'));
