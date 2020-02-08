(function(module) {

  module.service('BusinessUser', [function() {

    function BusinessUser() {

      this.id = undefined;
      this.title = undefined;
      this.firstName = undefined;
      this.lastName = undefined;
      this.email = undefined;
      this.clientId = undefined;
      this.roleId = undefined;
      this.pictureUrl = undefined;
      this.isSuperAdmin = undefined;
      

      this.clientRoles = [];

    }

    return BusinessUser;

  }]);

})(angular.module('aet.domain.businessUser'));
