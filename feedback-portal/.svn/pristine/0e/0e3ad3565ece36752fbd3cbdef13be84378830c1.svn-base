(function (module) {

  module.provider('s3config', [function () {

    var bucket = '/* @echo s3Bucket */';

    return {
      $get: [function () {

        return function () {
          return bucket;
        };

      }]
    };
  }]);

})(angular.module('aet.config'));
