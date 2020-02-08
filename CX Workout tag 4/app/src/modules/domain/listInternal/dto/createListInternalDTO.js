(function(module) {

  module.service('CreateListInternalDTO', [function() {

    function CreateListInternalDTO() {

      this.creatorId = undefined;
      this.title = undefined;
      this.memberIds = [];

    }

    return CreateListInternalDTO;

  }]);

})(angular.module('aet.domain.listInternal'));
