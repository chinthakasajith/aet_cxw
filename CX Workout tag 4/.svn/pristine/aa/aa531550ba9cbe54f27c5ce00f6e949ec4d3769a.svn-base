(function (module) {

  module.config(['$stateProvider',
    function ($stateProvider) {

      $stateProvider
        .securedState('index.secured.mapview', {
          url: '/mapview',
          views: {
            'main@index': {
              templateUrl: 'src/screens/mapview/templates/mapview.html',
              controller: 'MapViewController'
            }
          },
          data: {
            screenName: "Map View",
            selectedTab: "View",
            feature: 'VIEW_MAP'
          },
          resolve: {
            mapData : ['HierarchyMapService','mapService','updatedUser', function (HierarchyMapService, mapService, updatedUser) {
              return HierarchyMapService.setMapData(mapService.getMapData);
            }]
          }
        })

    }
  ]);

})(angular.module('aet.screens.mapview'));