(function(module) {

  module.service('CreatelistEmployeeDTO', [function() {

    function CreatelistEmployeeDTO() {

      this.creatorId = undefined;
      this.title = undefined;
      this.externalUsers = [];

    }

    return CreatelistEmployeeDTO;

  }]);

})(angular.module('aet.domain.listEmployee'));
