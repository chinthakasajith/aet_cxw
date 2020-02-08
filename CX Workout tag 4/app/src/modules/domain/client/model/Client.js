(function(module) {

  module.service('Client', [function() {

    function Client() {

      this.id = undefined;
      this.name = undefined;
      this.streetAddress1 = undefined;
      this.streetAddress2 = undefined;
      this.city = undefined;
      this.state = undefined;
      this.zipCode = undefined;
      this.termsCond = undefined;
    }

    return Client;

  }]);

})(angular.module('aet.domain.client'));
