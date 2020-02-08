(function(module) {

  module.service('UpdateTouchpointRequestDTO', [function() {

    function UpdateTouchpointRequestDTO() {
    	this.touchpointId = undefined;
    	this.title = undefined;
    	this.positionIndex = undefined;
    	this.stageId = undefined;
    }

    return UpdateTouchpointRequestDTO;

  }]);

})(angular.module('aet.domain.map'));
