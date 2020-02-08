(function(module) {

  module.service('CreateActionRequestDTO', [function() {

    function CreateActionRequestDTO() {
    	this.creatorId = undefined;
    	this.stageId = undefined;
    	this.touchpointId = undefined;
    	this.title = undefined;
    	this.channelId = undefined;
    }

    return CreateActionRequestDTO;

  }]);

})(angular.module('aet.domain.map'));
