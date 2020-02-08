(function(module) {

  module.service('CreatelistCustomerDTO', [function() {

    function CreatelistCustomerDTO() {

      this.creatorId = undefined;
      this.title = undefined;
      this.externalUsers = [];

    }

    return CreatelistCustomerDTO;

  }]);

})(angular.module('aet.domain.listCustomer'));
