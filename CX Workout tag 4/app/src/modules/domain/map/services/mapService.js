(function (module) {

  module.service('mapService', ['mapEndpoint', 'mapTransformer', '$q', '$log','userDetails', 'projectTransformer',

    function (mapEndpoint, mapTransformer, $q, $log, userDetails, projectTransformer) {

      this.createStage = function (title) {
        var stageObj = {
          creatorId: userDetails.getUserId(),
          title: title
        };
        var dto = mapTransformer.stageToCreateDTO(stageObj);
        console.log(dto);
        return mapEndpoint.createStage(dto).then(function (response) {
          return response.data;
        }, function (err) {
          $log.debug("Could not create stage", err);
          return $q.reject(err);
        });
      };

      this.deleteStage = function (stageId) {
        return mapEndpoint.deleteStage(stageId).then(function (response) {
          return response.data;
        }, function (err) {
          $log.debug("Could not delete stage", err);
          return $q.reject(err);
        });
      };

      this.updateStage = function (stage) {
        var dto = mapTransformer.stageToUpdateDTO(stage);
        return mapEndpoint.editStage(dto).then(function (response) {
          return response.data;
        }, function (err) {
          $log.debug("Could not update stage", err);
          return $q.reject(err);
        });
      };

      this.createTouchpoint = function (dto) {
        var stageObj = {
          stageId : dto.stageId,
          creatorId: userDetails.getUserId(),
          title: dto.title
        };


        var dto = mapTransformer.touchpointToCreateDTO(stageObj);
        console.log(dto);
        return mapEndpoint.createTouchpoint(dto).then(function (response) {
          return response.data;
        }, function (err) {
          $log.debug("Could not create touchpoint", err);
          return $q.reject(err);
        });

      };

      this.deleteTouchpoint = function (stageId, touchpointId) {
        return mapEndpoint.deleteTouchpoint(stageId, touchpointId).then(function (response) {
          return response.data;
        }, function (err) {
          $log.debug("Could not delete touchpoint", err);
          return $q.reject(err);
        });
      };

      this.updateTouchpoint = function (touchpoint) {

        var dto = mapTransformer.touchpointToUpdateDTO(touchpoint);
        console.log(touchpoint);
        return mapEndpoint.editTouchpoint(dto).then(function (response) {
          return response.data;
        }, function (err) {
          $log.debug("Could not update touchpoint", err);
          return $q.reject(err);
        });
      };

      this.createAction = function (action) {
        action.creatorId =  userDetails.getUserId();

        var dto = mapTransformer.actionToCreateDTO(action);
        console.log(dto)
        return mapEndpoint.createAction(dto).then(function (response) {
          return response.data;
        }, function (err) {
          $log.debug("Could not create action", err);
          return $q.reject(err);
        });

      };

      this.deleteAction = function (stageId, touchpointId, actionId) {
        return mapEndpoint.deleteAction(stageId, touchpointId, actionId).then(function (response) {
          return response.data;
        }, function (err) {
          $log.debug("Could not delete action", err);
          return $q.reject(err);
        });
      };

      this.updateAction = function (action) {
        var dto = mapTransformer.actionToUpdateDTO(action);
        return mapEndpoint.editAction(dto).then(function (response) {
          return response.data;
        }, function (err) {
          $log.debug("Could not update action", err);
          return $q.reject(err);
        });
      };


      this.getMapData = function () {

        return mapEndpoint.getMapData().then(function (response) {

          return response;
        }, function (err) {
          console.error("Could not load map data");
          return $q.reject(err);
        });
      };
      
      this.copyMap = function(id) {

         return mapEndpoint.copyMap(id).then(function(response) {
        	return projectTransformer.DTOToProject(response.data);
         }, function(err) {
           console.error("Could not copy map");
           return $q.reject(err);
         });
       };

    }
  ]);

})(angular.module('aet.domain.map'));
