(function (module) {

  module.controller('ThankController', ['$scope', 'feedbackResponse', 'uploadManager', 's3Uploader', '$rootScope',
    function ($scope, feedbackResponse, uploadManager, s3Uploader, $rootScope) {

      $scope.feedbackResponse = feedbackResponse;

    }
  ]);

})(angular.module('aet-screens-thank'));
