(function(module) {
    
    module.config(['$stateProvider',
        function ($stateProvider) {

            $stateProvider
                .securedState('index.secured.mapedit', {
                    url: '/mapedit',
					views: {
						'main@index': {
							templateUrl: 'src/screens/mapedit/templates/mapedit.html',
							controller: 'MapEditController',
						}
					},
					data: {
						screenName: "Map Edit",
						selectedTab: "Edit",
                        feature: 'EDIT_MAP'
					},
			        resolve: {
			              mapData : ['HierarchyMapService','mapService','updatedUser', function (HierarchyMapService, mapService, updatedUser) {
			                return HierarchyMapService.setMapData(mapService.getMapData);
			              }]
			        }
                })
            
        }
    ]);
    
})(angular.module('aet.screens.mapedit'));