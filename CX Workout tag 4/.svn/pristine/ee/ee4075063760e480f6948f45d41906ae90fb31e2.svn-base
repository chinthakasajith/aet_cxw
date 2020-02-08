(function(module) {
    
    module.config(['$stateProvider',
        function ($stateProvider) {

            $stateProvider
                .securedState('index.secured.bubblechart', {
                    url: '/bubblechart',
					views: {
						'main@index': {
							templateUrl: 'src/screens/bubblechart/templates/bubblechart.html',
							controller: 'BubbleChartController',
						}
					},
					data: {
						screenName: "Bubble Charts",
						selectedTab: "Reports",
					}
                })
            
        }
    ]);
    
})(angular.module('aet.screens.bubblechart'));