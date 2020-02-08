(function(module) {
    
    module.service('formEndpoint', ['$q', '$http', 'api', 'clientDetails',
        function($q, $http, api, clientDetails) {

            var controller = '/client/';
            
            this.createForm = function (createFormDTO) {
            	var urlExtension = clientDetails.getSelectedClient().id + '/permit'; // 1000000000 is for clientId
                var createFormURL = api('admin') + controller + urlExtension;
                
                /*return $http({
                    method: 'POST',
                    url: createFormURL,
                    data: createFormDTO,
                    headers: {'Content-Type': 'application/json;charset=utf-8'}
                });*/
				
                return $http.post(createFormURL,createFormDTO);
            };
			
			this.updateForm = function (dto, id) {
            	var urlExtension = clientDetails.getSelectedClient().id + '/permit/' + id; // 1000000000 is for clientId
                var url = api('admin') + controller + urlExtension;
				
                return $http.put(url,dto);
            };
            
            this.searchForms = function (searchObject) {
            	//console.log(clientDetails)
            	var urlExtension = clientDetails.getSelectedClient().id + '/permit'; // 1 is for clientId
                var searchFormsURL = api('admin') + controller + urlExtension;
                //console.log("URL" + searchFormsURL);
                //console.log("DATA" + searchObject);
                return $http.get(searchFormsURL,{
					params: searchObject
                });
            };
            
            this.deleteForm = function (id) {
            	////console.log("masterField - Endpoint - searchMasterfields");
            	var urlExtension = clientDetails.getSelectedClient().id + '/permit/' + id; // 1 is for clientId
                var deleteFormURL = api('admin') + controller + urlExtension;
                //console.log("URL " + deleteFormURL);
                return $http.delete(deleteFormURL);
            };
			
            this.getForm = function (permitId,searchObject) {
                var getFormURL = api('admin') + '/client/' + clientDetails.getSelectedClient().id + '/permit/' + permitId;
                return $http.get(getFormURL,{
					params: searchObject});
            };

        }
    ]);

})(angular.module('aet.endpoints'));