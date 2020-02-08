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

  var appConfig = angular.module('aet.config', [
    'aet.directives.navTab',
    'aet.security'
  ]);

  appConfig.config(['$httpProvider', 'apiProvider', 'securityProvider', 'navTabServiceProvider', '$urlRouterProvider', 'localStorageServiceProvider',
    function($httpProvider, apiProvider, securityProvider, navTabServiceProvider, $urlRouterProvider, localStorageServiceProvider) {

      // initialize apis
      var apiBaseUrl = '/* @echo apiBaseUrl */' || 'http://localhost:8080'; //configure in /config/config-local.json
      apiProvider.addApi('admin', apiBaseUrl + '/admin-api');

      // initialize security settings
      securityProvider.setAuthenticationEnabled(true);
      securityProvider.setAuthorizationEnabled(true);
      securityProvider.setAuthCookieName('com.cxworkout.authcookie');
      securityProvider.setLoginState('login');
      securityProvider.setDefaultState('index.secured.dashboard');
      securityProvider.setUnauthorizedState('index.secured.unauthorized');
      securityProvider.setLoginUrl("/login");
      securityProvider.setLogoutUrl("/logout");

      // nav tab class
      navTabServiceProvider.setTabClass('active');

      // default route
      $urlRouterProvider.otherwise('/dashboard');

      // local storage config
      localStorageServiceProvider.setPrefix('aet.adminportal');

      $httpProvider.defaults.withCredentials = true;

      //            if(navigator.appName == 'Microsoft Internet Explorer' || navigator.appName == 'Netscape') {
      //
      //                $httpProvider.defaults.headers.common['Cache-Control'] = 'no-cache, no-store, must-revalidate';
      //                $httpProvider.defaults.headers.common['Pragma'] = 'no-cache';
      //                $httpProvider.defaults.headers.common['Expires'] = '0';
      //
      //            }

    }
  ]);

  appConfig.run(['$rootScope', function($rootScope) {

    var pageTransitionStart;

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState) {
      pageTransitionStart = +new Date();
    });

    //		$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams, rejection) {
    //
    //            //console.log('State change to: ', toState, " - from: ", fromState);
    //
    //
    //			setTimeout(function () {
    //				(function () {
    //					var watchers, elementsWithScope, scope, i, _len;
    //					watchers = 0;
    //					elementsWithScope = document.querySelectorAll('.ng-scope');
    //					for (i = 0, _len = elementsWithScope.length; i < _len; i++) {
    //						scope = angular.element(elementsWithScope[i]).scope();
    //						if (scope.$$watchers != null) {
    //							watchers += scope.$$watchers.length;
    //						}
    //					}
    //
    //					var severity = 'info';
    //					if (watchers > 1000) {
    //						severity = 'warn';
    //					}
    //					if (watchers > 1500) {
    //						severity = 'error';
    //					}
    //					var transitionTime = (new Date()) - pageTransitionStart;
    //					console[severity]('transitionTime:', transitionTime, 'Watchers ', watchers);
    //				})();
    //			}, 1);
    //
    //
    //        });

    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, rejection) {

      console.error('State change error', rejection);

    });

    $rootScope.showLoader =function(label){
      $rootScope.loaderText = label;
      $rootScope.loader = true;
    };
    $rootScope.hideLoader =function(){
      $rootScope.loaderText = undefined;
      $rootScope.loader = false;
    };
  }]);

})();
