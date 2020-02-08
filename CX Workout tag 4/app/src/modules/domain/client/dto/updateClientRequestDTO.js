(function(module) {

  module.service('UpdateClientRequestDTO', [function() {

    function UpdateClientRequestDTO() {

      this.id = undefined;
      this.name = undefined;
      this.streetAddress1 = undefined;
      this.streetAddress2 = undefined;
      this.city = undefined;
      this.state = undefined;
      this.zipCode = undefined;
      this.termsCond = undefined;

    }

    return UpdateClientRequestDTO;

  }]);

})(angular.module('aet.domain.client'));
