(function(module) {

  module.service('Action', [function() {

    function Action() {
    	this.id = undefined;
    	this.creatorId = undefined;
    	this.stageId = undefined;
    	this.touchpointId = undefined;
    	this.title = undefined;
    	this.channelId = undefined;
    	this.positionIndex = undefined;
    }

    return Action;

  }]);

})(angular.module('aet.domain.map'));
