(function(module) {

  module.service('mapTransformer', ['genericTransformer', 'Stage', 'Touchpoint', 'Action', 
                                    'CreateStageRequestDTO', 'CreateTouchpointRequestDTO', 'CreateActionRequestDTO', 
                                    	'UpdateStageRequestDTO', 'UpdateTouchpointRequestDTO', 'UpdateActionRequestDTO',
    function(genericTransformer, Stage, Touchpoint, Action, 
    			CreateStageRequestDTO, CreateTouchpointRequestDTO, CreateActionRequestDTO, 
    				UpdateStageRequestDTO, UpdateTouchpointRequestDTO, UpdateActionRequestDTO) {

      this.stageToCreateDTO = function(stage) {
        console.log(stage);
    	  return genericTransformer.objectToDTO(stage, CreateStageRequestDTO);
      };

      this.stageToUpdateDTO = function(stage) {
    	  return genericTransformer.objectToDTO(stage, UpdateStageRequestDTO);
      };
      
      this.touchpointToCreateDTO = function(touchpoint) {
    	  return genericTransformer.objectToDTO(touchpoint, CreateTouchpointRequestDTO);
      };

      this.touchpointToUpdateDTO = function(touchpoint) {
    	  return genericTransformer.objectToDTO(touchpoint, UpdateTouchpointRequestDTO);
      };
      
      this.actionToCreateDTO = function(action) {
    	  return genericTransformer.objectToDTO(action, CreateActionRequestDTO);
      };

      this.actionToUpdateDTO = function(action) {
    	  return genericTransformer.objectToDTO(action, UpdateActionRequestDTO);
      };
    }
  ]);

})(angular.module('aet.domain.map'));
