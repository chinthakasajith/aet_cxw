(function(module) {

  module.config(['$stateProvider',
    function($stateProvider) {

      $stateProvider
        .state('index.error', {
          url: '/error?type=:errorType',
          templateUrl: 'src/screens/error/templates/error.html',
          controller: 'ErrorController',
          resolve:{
            errorType:['$stateParams', function($stateParams) {
              return ($stateParams.errorType);
            }]
          }
        })
    }
  ]);

})(angular.module('aet-screens-thank'));
