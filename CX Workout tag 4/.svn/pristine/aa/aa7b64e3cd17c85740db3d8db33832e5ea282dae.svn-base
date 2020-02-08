(function(module) {

  module.service('missionCustomerService', ['missionEndpoint', 'missionTransformer', '$q', '$log', 'clientDetails', 'userDetails',
    function(missionEndpoint, missionTransformer, $q, $log, clientDetails, userDetails) {

      var type = "customer";

      this.createMission = function(mission) {
        var dto = missionTransformer.missionToCreateDTO(mission);
        return missionEndpoint.createMission(dto, type).then(function(response) {
          return response.data;
        }, function(err) {
          $log.debug("Could not create mission", err);
          return $q.reject(err);
        });

      };

      this.deleteMission = function(missionId) {
        return missionEndpoint.deleteMission(missionId, type).then(function(response) {
          return response.data;
        }, function(err) {
          $log.debug("Could not delete mission", err);
          return $q.reject(err);
        });
      };

      this.updateMission = function(mission, sending) {
        var dto = missionTransformer.missionToUpdateDTO(mission);
        return missionEndpoint.editMission(dto, type, sending).then(function(response) {
          return response.data;
        }, function(err) {
          $log.debug("Could not update mission", err);
          return $q.reject(err);
        });
      };


      this.findMission = function(id) {

        return missionEndpoint.getMission(id, type).then(function(response) {
          return missionTransformer.DTOToMission(response.data);
        }, function(err) {
          console.error("Could not load mission");
          return $q.reject(err);
        });
      };

      this.searchMission = function(params) {
        return missionEndpoint.searchMission(params, type).then(function(dto) {
          return missionTransformer.searchDTOToSearchResults(dto);
        }, function(err) {
          console.error("Could not search mission", err);
          return $q.reject(err);
        });

      };

      this.setMissionToDraft = function(missionId) {
        return missionEndpoint.setMissionToDraft(missionId, type).then(function(response) {
          return response.data;
        }, function(err) {
          $log.debug("Could not set mission to draft", err);
          return $q.reject(err);
        });
      };
      
      this.copyMission = function(id) {

          return missionEndpoint.copyMission(id).then(function(response) {
            return missionTransformer.DTOToMission(response.data);
          }, function(err) {
            console.error("Could not copy mission");
            return $q.reject(err);
          });
        };
    }
  ]);

})(angular.module('aet.domain.mission'));
