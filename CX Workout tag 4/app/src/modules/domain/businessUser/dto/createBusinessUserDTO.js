(function(module) {

  module.service('CreateBusinessUserDTO', [function() {

    function CreateBusinessUserDTO() {

      this.title = undefined;
      this.firstName = undefined;
      this.lastName = undefined;
      this.email = undefined; 
      this.isSuperAdmin = undefined;
      this.pictureUrl = undefined;    
      this.clientRoles = [];

    }

    return CreateBusinessUserDTO;

  }]);

})(angular.module('aet.domain.businessUser'));
