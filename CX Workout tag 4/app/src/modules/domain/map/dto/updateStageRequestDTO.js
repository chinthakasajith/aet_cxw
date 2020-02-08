(function(module) {

  module.service('UpdateStageRequestDTO', [function() {

    function UpdateStageRequestDTO() {
    	this.stageId = undefined;
    	this.title = undefined;
    	this.positionIndex = undefined;
    }

    return UpdateStageRequestDTO;

  }]);

})(angular.module('aet.domain.map'));
