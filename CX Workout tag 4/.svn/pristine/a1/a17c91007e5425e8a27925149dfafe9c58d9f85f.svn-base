(function(module) {

  module.service('missionTransformer', ['Mission', 'genericTransformer', '$log', 'CreateMissionDTO', 'UpdateMissionDTO',
    function(Mission, genericTransformer, $log, CreateMissionDTO, UpdateMissionDTO) {

      this.DTOToMission = function(dto) {
        var missionObj = genericTransformer.DTOToObject(dto, Mission);
        missionObj.missionActions = dto.missionActions;
        missionObj.list = dto.list;
        return missionObj;
      };

      this.searchDTOToSearchResults = function(dto) {
        var searchResults = genericTransformer.DTOToSearchResults(dto.data);
        for (var key in dto.data.missions) {
          var startDate = new Date(dto.data.missions[key].startDate);
          var endDate = new Date(dto.data.missions[key].endDate);
          dto.data.missions[key].startDate = startDate.getMonth() + 1 + "/" + startDate.getDate() + "/" + startDate.getFullYear();
          dto.data.missions[key].endDate = endDate.getMonth() + 1 + "/" + endDate.getDate() + "/" + endDate.getFullYear();
          dto.data.missions[key].creatorName = dto.data.missions[key].creator.firstName + " " + dto.data.missions[key].creator.lastName;
        }
        searchResults.results = dto.data.missions;
        return searchResults;
      };

      this.missionToCreateDTO = function(missionObj) {
        var dto = genericTransformer.objectToDTO(missionObj, CreateMissionDTO);
        dto.startDate = new Date(missionObj.startDate);
        dto.endDate = new Date(missionObj.endDate);
        return dto;
      };


      this.missionToUpdateDTO = function(missionObj) {
        var dto = genericTransformer.objectToDTO(missionObj, UpdateMissionDTO);
        dto.startDate = new Date(missionObj.startDate);
        dto.endDate = new Date(missionObj.endDate);
        if (angular.isDefined(missionObj.list)) {
          dto.listId = missionObj.list.id;
        }
        angular.forEach(missionObj.missionActions, function(missionAction, key) {
          dto.missionActions.push({
            "actionId": missionAction.action.id,
            "actionHeader": missionAction.actionHeader,
            "isMediaIncluded": missionAction.isMediaIncluded,
            "mediaIncludedMessage": missionAction.mediaIncludedMessage
          });
        });
        
        // if the mission is in draft, update the time to current time in start and end date.
        if(dto.status === 'Draft'){
        	var now = new Date();
        	dto.startDate.setHours(now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
        	dto.endDate.setHours(now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
        }

        return dto;
      }
    }
  ]);

})(angular.module('aet.domain.mission'));
