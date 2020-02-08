(function(module) {

  module.service('ListEmployee', [function() {

    function ListEmployee() {

      this.id = undefined;
      this.creator = undefined;
      this.title = undefined;
      this.externalUsers = [];
      this.participantType = undefined;
      this.client = undefined;

    }

    return ListEmployee;

  }]);

})(angular.module('aet.domain.listEmployee'));
