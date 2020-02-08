(function(module) {
    
    module.service('genericTransformer', ['SearchResults',
        function(SearchResults) {

            this.objectToDTO = function(obj, objDTO) {
                var dto = new objDTO();

                for(var key in dto) {
                    if(dto.hasOwnProperty(key) && angular.isUndefined(dto[key]) && obj[key] !== null)
                        dto[key] = obj[key];
                }

                return dto;
            };

            this.DTOToObject = function(objDTO, obj) {
                var object = new obj();

                for(var key in object) {
                    if(object.hasOwnProperty(key) && objDTO[key] !== null)
                        object[key] = objDTO[key];
                }

                return object;
            };
			
			this.DTOToSearchResults = function(objDTO) {
                var sr = new SearchResults();
				
				sr.pagination.count = objDTO.pagination.count;
				sr.pagination.currentPage = objDTO.pagination.currentPage;
				sr.pagination.total = objDTO.pagination.total;
				sr.pagination.totalPages = objDTO.pagination.totalPages;
				
				return sr;
            };

        }
]);

})(angular.module('aet.domain.generic'));

