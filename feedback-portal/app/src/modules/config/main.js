(function() {

  /**
   * @ngdoc overview
   * @name aet.config
   *
   * @description
   * This module is responsible for providing all configuration for the applicaiton. This usually involves initialization of
   * providers used throughout the application. We also use the run block of this module to initialize some development
   * logging.
   *
   */

  var appConfig = angular.module('aet.config', []);

  appConfig.config(['$httpProvider', 'apiProvider', '$urlRouterProvider',
    function($httpProvider, apiProvider, $urlRouterProvider) {

      // initialize apis
      var apiBaseUrl = '/* @echo apiBaseUrl */' || 'http://localhost:8080'; //configure in /config/config-local.json
      apiProvider.addApi('admin', apiBaseUrl + '/admin-api');

      // default route
      $urlRouterProvider.otherwise('/');

      // Configure http errors to show in alert bar
      $httpProvider.interceptors.push(['$q', '$injector', function($q, $injector) {
        var alertsService = $injector.get('alertsService');
        return {
          'responseError': function(rejection) {
            if (rejection.status === 0) {
              if (rejection.config.url.match(/logout$/))
                return rejection;
              else {
                alertsService.addAlert({
                  title: 'No Response',
                  message: 'Server did not respond for ' + rejection.config.url,
                  type: 'error'
                });
              }
            } else if (rejection.status === 403) {
              alertsService.addAlert({
                title: 'Unauthorized Error',
                message: 'Server returned unauthorized for ' + rejection.config.url,
                type: 'error' 
              });
            } else {
              alertsService.addECSErrorMessage(rejection);
            }
            return $q.reject(rejection);
          }
        }
      }]);
    }
  ]);

  appConfig.run(['$rootScope', function($rootScope) {

    var pageTransitionStart;

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState) {
      pageTransitionStart = +new Date();
    });

    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, rejection) {
      console.error('State change error', rejection);
    });
  }]);
})();
