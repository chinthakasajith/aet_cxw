/**
 * Created by supun.s on 06/08/2015.
 */
(function (module) {

  module.service("HierarchyMapService", ['$log', 'mapModalService', '$rootScope', '$state', '$timeout','localStorageService',
    /**
     * Hierarchy Map Service
     * @param $log
     * @param mapModalService
     * @param $rootScope
     * @param $state
     * @param $timeout
     */
      function ($log, mapModalService, $rootScope, $state, $timeout, localStorageService) {

      var mapData = undefined;
      var self = this;
      var mapTypeKey = 'mapType';
      var _mapType = undefined;
      var _defaultMapType = 'CUSTOMERS';

      this.getMapData = function () {
        return mapData;
      };

      /**
       * Set Map Data
       * @param searchFn
       * @returns {*}
       */
      this.setMapData = function (searchFn) {
        return searchFn().then(function (dto) {
          mapData = dto.data;
          $rootScope.loader = false;
        }, function (err) {
          console.error("Load map data unsuccessful", err);
          $rootScope.loader = false;
        });
      };

      /**
       *
       * @returns {*}
       */
      this.addStage = function (addFn, searchFn) {
        var addModalInstance = mapModalService.addMapModal('Stage');
        addModalInstance.result.then(function (result) {
          $rootScope.loader = true;
          addFn(result.title).then(function (addResult) {
            self.setMapData(searchFn);
          }, function (err) {
            $rootScope.loader = false;
            console.error(err);
          });
        });
      };

      /**
       * Edit Stage
       * @param stage
       * @param editFn
       * @param searchFn
       */
      this.editStage = function (stage, editFn, searchFn) {
        var addModalInstance = mapModalService.editMapModal(stage, "Stage");
        addModalInstance.result.then(function (modalResult) {
          $rootScope.loader = true;
          var dto = {
            "stageId": stage.id,
            "title": modalResult.title,
            "positionIndex": stage.positionIndex
          };
          editFn(dto).then(function (editResult) {
            self.setMapData(searchFn);
          }, function (editErr) {
            $rootScope.loader = false;
          });
        });
      };

      this.updateStagePositionIndex = function (stage, editFn, searchFn) {
        $rootScope.loader = true;
        var dto = {
          "stageId": stage.id,
          "title": stage.title,
          "positionIndex": stage.positionIndex
        };
        editFn(dto).then(function (editResult) {
          self.setMapData(searchFn);
        }, function (editErr) {
          $rootScope.loader = false;
        });
      };

      /**
       * Add TouchPoint
       * @param stage
       * @param addFn
       * @param searchFn
       */
      this.addTouchpoint = function (stage, addFn, searchFn) {
        var addModalInstance = mapModalService.addMapModal('Touchpoint');
        addModalInstance.result.then(function (modalResult) {
          $rootScope.loader = true;
          var dto = {
            "stageId": stage.id,
            "title": modalResult.title,
            "positionIndex": stage.positionIndex
          };
          addFn(dto).then(function (addResult) {
            self.setMapData(searchFn);
          }, function (err) {
            $rootScope.loader = false;
            console.error(err);
          });

        });
      };

      this.editTouchpoint = function (stage, touchpoint, editFn, searchFn) {
        var addModalInstance = mapModalService.editMapModal(touchpoint, "Touchpoint");
        addModalInstance.result.then(function (modalResult) {
          $rootScope.loader = true;
          var dto = {
            "stageId": stage.id,
            "title": modalResult.title,
            "positionIndex": touchpoint.positionIndex,
            "touchpointId": touchpoint.id
          };
          editFn(dto).then(function (editResult) {
            self.setMapData(searchFn);
          }, function (editErr) {
            console.error(editErr);
            $rootScope.loader = false;
          });
        });
      };

      this.updateTouchpointPositionIndex = function (touchpoint, editFn, searchFn) {
        $rootScope.loader = true;
        var dto = {
          "touchpointId" : touchpoint.id,
          "stageId": touchpoint.stageId,
          "title": touchpoint.title,
          "positionIndex": touchpoint.positionIndex
        };
        editFn(dto).then(function (editResult) {
          self.setMapData(searchFn);
        }, function (editErr) {
          $rootScope.loader = false;
        });
      };

      /**
       *
       * @param stage
       * @param touchpoint
       * @param addFn
       * @param searchFn
       * @param channels
       */
      this.addAction = function (stage, touchpoint, channels, addFn, searchFn) {
        var addModalInstance = mapModalService.addActionMapModal('Action', channels);
        addModalInstance.result.then(function (modalResult) {
          $rootScope.loader = true;
          var dto = {
            "stageId": stage.id,
            "title": modalResult.title,
            "touchpointId": touchpoint.id,
            "channelId": modalResult.channel.id
          };
          addFn(dto).then(function (addResult) {
            self.setMapData(searchFn);
          }, function (editErr) {
            console.error(editErr);
            $rootScope.loader = false;
          });
        });
      };

      this.editAction = function (stage, touchpoint, action, channels, editFn, searchFn) {
        var addModalInstance = mapModalService.editActionMapModal(action, channels);
        addModalInstance.result.then(function (modalResult) {
          $rootScope.loader = true;
          var dto = {
            "title": modalResult.title,
            "positionIndex": action.positionIndex,
            "stageId": stage.id,
            "touchpointId": touchpoint.id,
            "actionId": action.id,
            "channelId": modalResult.channel.id
          };
          editFn(dto).then(function (editResult) {
            self.setMapData(searchFn);
          }, function (editErr) {
            console.error(editErr);
            $rootScope.loader = false;
          });
        });
      };

      this.updateActionPositionIndex = function (action, editFn, searchFn) {
        $rootScope.loader = true;
        var dto = {
          "channelId" : action.channel.id,
          "actionId" : action.id,
          "touchpointId" : action.touchpointId,
          "stageId": action.stageId,
          "title": action.title,
          "positionIndex": action.positionIndex
        };
        editFn(dto).then(function (editResult) {
          self.setMapData(searchFn);
        }, function (editErr) {
          $rootScope.loader = false;
        });
      };

      /**
       *
       * @param stageId
       * @param touchPointId
       * @param actionId
       * @param deleteStageFn
       * @param deleteTouchpointFn
       * @param deleteActionFn
       * @param searchFn
       * @returns {*}
       */
      this.delete = function (stageId, touchPointId, actionId, deleteStageFn, deleteTouchpointFn, deleteActionFn, searchFn) {
        var addModalInstance;
        if (angular.isDefined(stageId) && touchPointId === undefined && actionId === undefined) {
          addModalInstance = mapModalService.deleteMapModal('Stage', mapData);
          addModalInstance.result.then(function () {
            $rootScope.loader = true;
            deleteStageFn(stageId).then(function (deleteRes) {
              self.setMapData(searchFn);
            }, function (editErr) {
              console.error(editErr);
              $rootScope.loader = false;
            });
          });
        } else if (angular.isDefined(stageId) && angular.isDefined(touchPointId) && actionId === undefined) {
          addModalInstance = mapModalService.deleteMapModal('Touchpoint');
          addModalInstance.result.then(function () {
            $rootScope.loader = true;
            deleteTouchpointFn(stageId, touchPointId).then(function (deleteRes) {
              self.setMapData(searchFn);
            }, function (editErr) {
              console.error(editErr);
              $rootScope.loader = false;
            });
          });
        } else if (angular.isDefined(stageId) && angular.isDefined(touchPointId) && angular.isDefined(actionId)) {
          addModalInstance = mapModalService.deleteMapModal('Action');
          addModalInstance.result.then(function () {
            $rootScope.loader = true;
            deleteActionFn(stageId, touchPointId, actionId).then(function (deleteRes) {
              self.setMapData(searchFn);
            }, function (editErr) {
              console.error(editErr);
              $rootScope.loader = false;
            });
          });
        }
      };

      this.setColor = function(expectationAverage, loyaltyAverage){
        if ((expectationAverage === 0 && loyaltyAverage === 0) || (expectationAverage === undefined && loyaltyAverage === undefined)) {
          return 'white';
        } else if (expectationAverage >= 1 && expectationAverage <= 2 && loyaltyAverage >= 4 && loyaltyAverage <= 5) {
          return 'solidRed';
        } else if (expectationAverage >= 4 && expectationAverage <= 5 && loyaltyAverage >= 4 && loyaltyAverage <= 5) {
          return 'solidGreen';
        } else {
          return 'solidGray';
        }
      };

      this.moreCommentTxt = function(commentTxt){
        var moreCommentModalInstance;
        moreCommentModalInstance = mapModalService.moreCommentTxt(commentTxt);
      };

      this.initMapType = function(feedbackSummary){
        if(localStorageService.get(mapTypeKey) === null ){
          localStorageService.set(mapTypeKey, _defaultMapType);
          _mapType = _defaultMapType;
          if(feedbackSummary !== undefined){
            return feedbackSummary[_mapType];
          }else{
            return _mapType;
          }
        }else {
          _mapType = localStorageService.get(mapTypeKey);
          if(feedbackSummary !== undefined){
            return feedbackSummary[_mapType];
          }
          else{
            return _mapType;
          }
        }
      };

      this.setMapType = function(mapType){
        localStorageService.set(mapTypeKey, mapType);
        _mapType = mapType;
        self.initMapType();
      };

      this.getMapType = function (feedbackSummary){
        return self.initMapType(feedbackSummary);
      };

    }
  ]);

})(angular.module('aet-directives-hierarchyMap'));
