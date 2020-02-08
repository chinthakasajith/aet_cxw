(function(module) {

  module.service('UpdateActionRequestDTO', [function() {

    function UpdateActionRequestDTO() {
    	this.actionId = undefined;
    	this.title = undefined;
    	this.positionIndex = undefined;
    	this.stageId = undefined;
    	this.touchpointId = undefined;
    	this.channelId = undefined;
    }

    return UpdateActionRequestDTO;

  }]);

})(angular.module('aet.domain.map'));
