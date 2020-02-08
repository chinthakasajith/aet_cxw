(function (module) {

  module.service('mapModalService', ['$modal', '$log', '$q', '$rootScope',
    function ($modal, $log, $q, $rootScope) {

      this.deleteMapModal = function (name) {
        var scope = $rootScope.$new(true);
        scope.name = name;
        return $modal.open({
          templateUrl: 'src/modules/directives/hierarchyMap/mapModal/templates/deleteMapModal.html',
          controller: 'MapModalInstanceController',
          scope: scope
        });
      };

      this.addMapModal = function (name) {
        var scope = $rootScope.$new(true);
        scope.name = name;
        scope.dataModal = [];
        return $modal.open({
          templateUrl: 'src/modules/directives/hierarchyMap/mapModal/templates/addMapModal.html',
          controller: 'MapModalInstanceController',
          scope: scope
        });
      };

      this.addActionMapModal = function (name, channels) {
        var scope = $rootScope.$new(true);
        scope.name = name;
        scope.channels = channels;
        scope.dataModal = [];
        return $modal.open({
          templateUrl: 'src/modules/directives/hierarchyMap/mapModal/templates/addActionMapModal.html',
          controller: 'MapModalInstanceController',
          scope: scope
        });
      };

      this.editActionMapModal = function (action, channels) {
        var scope = $rootScope.$new(true);
        scope.name = action.title;
        scope.title = action.title;
        scope.channels = channels;
        scope.channel = action.channel;
        scope.dataModal = [];
        return $modal.open({
          templateUrl: 'src/modules/directives/hierarchyMap/mapModal/templates/editActionMapModal.html',
          controller: 'MapModalInstanceController',
          scope: scope
        });
      };

      this.editMapModal = function (name, type) {
        var scope = $rootScope.$new(true);
        scope.type = type;
        scope.name = name.title;
        if(type == 'Stage'){
          scope.stageTitle = name.title;
          scope.touchpointTitle = undefined;
        }else{
          scope.stageTitle = undefined;
          scope.touchpointTitle = name.title;
        }

        scope.dataModal = [];
        return $modal.open({
          templateUrl: 'src/modules/directives/hierarchyMap/mapModal/templates/editMapModal.html',
          controller: 'MapModalInstanceController',
          scope: scope
        });
      };

      this.moreCommentTxt = function (commentTxt) {
        var scope = $rootScope.$new(true);
        scope.commentTxt = commentTxt;
        return $modal.open({
          templateUrl: 'src/modules/directives/hierarchyMap/mapModal/templates/moreCommentTxt.html',
          controller: 'MapModalInstanceController',
          scope: scope
        });
      };
    }
  ]);

})(angular.module('aet-directives-hierarchyMap'));
