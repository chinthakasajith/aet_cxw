(function(module) {
    
    module.service('masterfieldEndpoint', ['$q', '$http', 'api', 'clientDetails', '$log',
        function($q, $http, api, clientDetails, $log) {

            this.createMasterfield = function (masterfieldRequestDTO) {
				$log.debug("masterField - Endpoint - createMasterfields", masterfieldRequestDTO);
				var clientUrl = '/client/' + clientDetails.getSelectedClient().id;
                var createMasterfieldURL = api('admin') + clientUrl + '/masterfield';
				
                return $http.post(createMasterfieldURL,masterfieldRequestDTO);
            };
            
            this.searchMasterfields = function (searchObject) {
            	$log.debug("masterField - Endpoint - searchMasterfields", searchObject);
				var clientUrl = '/client/' + clientDetails.getSelectedClient().id;
                var searchMasterfieldsURL = api('admin') + clientUrl + '/masterfield';
                return $http.get(searchMasterfieldsURL,{
					params: searchObject
                });
            };
			
			this.updateMasterfield = function (dto) {
				$log.debug("masterField - Endpoint - updateMasterfields", dto);
				var clientUrl = '/client/' + clientDetails.getSelectedClient().id;
                var editMasterfieldURL = api('admin') + clientUrl + '/masterfield/' + dto.id;
				
                return $http.put(editMasterfieldURL,dto);
            };
            
            this.deleteMasterfield = function (mFieldId) {
            	$log.debug("masterField - Endpoint - deleteMasterfields", mFieldId);
				var clientUrl = '/client/' + clientDetails.getSelectedClient().id;
                var deleteMasterfieldURL = api('admin') + clientUrl + '/masterfield/' + mFieldId;
				
                return $http.delete(deleteMasterfieldURL);
            };
            
            this.getMasterfield = function (mFieldId) {
            	$log.debug("masterField - Endpoint - getMasterfields", mFieldId);
				var clientUrl = '/client/' + clientDetails.getSelectedClient().id;
                var getMasterfieldURL = api('admin') + clientUrl + '/masterfield/' + mFieldId;
				
                return $http.get(getMasterfieldURL);
            };

        }
    ]);

})(angular.module('aet.endpoints'));