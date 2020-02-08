(function(module) {

  module.service('BaseUpload', ['$q', '$log',
    function($q, $log) {

      // ******** ******** ********
      // ******** BaseUpload ********
      // ******** ******** ******** ********
      function BaseUpload(id, options) {

        this.id = id;
        this.selectedFile;
        this.uploadDeferred;
        this.uploadPromise;
        this.uploading = false;
        this.complete = false;
        this.$validators = {};
        this.$errors = [];
        this.$invalid = false;
        this.$reset = false;
      }

      BaseUpload.prototype.constructor = BaseUpload;

      BaseUpload.prototype.destroy = function() {
        this.cancel();
      };

      BaseUpload.prototype.reset = function() {
        this.cancel();
        this.$reset = true;
      };

      BaseUpload.prototype.cancel = function() {
        var self = this;

        this.stop().then(function(result) {
          self.uploading = false;
          self.complete = false;
          self.uploadPromise = undefined;
          self.selectedFile = undefined;
        }, function(err) {
          $log.error("Could not stop uplaod.");
          $log.error("Error: " + err);
        });

      };

      BaseUpload.prototype.start = function() {
        var self = this;

        //define new promise
        this.uploadDeferred = $q.defer();
        this.uploadPromise = this.uploadDeferred.promise;

        //validate
        if (!this.validate()) {
          this.$invalid = true;
          this.uploadDeferred.reject('Failed validation');
        } else {
          this.$invalid = false;
          this.uploading = true;
          // start uploading
          this.upload();
        }


        return this.uploadPromise;
      };

      BaseUpload.prototype.stop = function() {
        var deferred = $q.defer();
        deferred.reject("Abstract BaseUpload");
        return deferred.promise;
      };

      BaseUpload.prototype.upload = function() {
        this.uploadDeferred.reject("Abstract BaseUpload");
      };

      BaseUpload.prototype.validate = function() {
        var self = this;
        var valid = true;

        this.$errors = [];

        angular.forEach(this.$validators, function(val, key) {
          var result = val.call(self);

          if (result !== true) {
            valid = false;
            self.$errors.push(result);
          }
        });

        //Horrible code. Fix this.
				var isValidSize = true;
        if (angular.isDefined(this.s3Options.maxsize)) {
          var filesize = ((this.selectedFile.size / 1024) / 1024).toFixed(4);
          if (filesize > this.s3Options.maxsize) {
            isValidSize = false;
          }
        }
				//Horrible code. Fix this.
        var isValidType = true;
        if (angular.isDefined(this.s3Options.fileTypes)) {
          isValidType = false;
          var ext = this.selectedFile.name.split('.').pop();
          angular.forEach(this.s3Options.fileTypes, function(exType, key) {
            if (angular.equals(ext, exType)) {
              isValidType = true;
            }
          });
        }

				if (!isValidType){
					valid = false;
					self.$errors.push("Unsupported file type.");
				} else if (!isValidSize){
					valid = false;
					self.$errors.push("File size must be less than " + this.s3Options.maxsize + "mb");
				}

        return valid && isValidType && isValidSize;
      };

      BaseUpload.prototype.setValidators = function(validators) {
          angular.extend(this.$validators, validators);
        }
        // ******** ******** ******** ********
        // ******** end BaseUpload ********
        // ******** ******** ********

      return BaseUpload;

    }
  ]);

})(angular.module('ecs-upload'));
