(function(module) {

  module.service('ListCustomer', [function() {

    function ListCustomer() {

      this.id = undefined;
      this.creator = undefined;
      this.title = undefined;
      this.externalUsers = [];
      this.participantType = undefined;
      this.project = undefined;
      this.client = undefined;


    }

    return ListCustomer;

  }]);

})(angular.module('aet.domain.listCustomer'));
