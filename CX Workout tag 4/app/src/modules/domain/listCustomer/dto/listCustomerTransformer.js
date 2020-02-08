(function(module) {

  module.service('listCustomerTransformer', ['ListCustomer','CSVDataObject', 'genericTransformer', '$log', 'CreatelistCustomerDTO', 'UpdatelistCustomerDTO',
    function(ListCustomer,CSVDataObject, genericTransformer, $log, CreatelistCustomerDTO, UpdatelistCustomerDTO) {

      this.DTOTolistCustomer = function(dto) {
        var listCustomer = genericTransformer.DTOToObject(dto, ListCustomer);

        angular.forEach(dto.externalUsers,function(externalUser,externalUserKey){
          externalUser.alreadySelectedRecord=true;
        });
        listCustomer.externalUsers = dto.externalUsers;
        return listCustomer;
      };

      this.searchDTOToSearchResults = function(dto) {
        var searchResults = genericTransformer.DTOToSearchResults(dto.data);
        for (var key in dto.data.externalLists) {
          var createdDate = new Date(dto.data.externalLists[key].createdDate);
          dto.data.externalLists[key].creatorName = dto.data.externalLists[key].creator.firstName + " " + dto.data.externalLists[key].creator.lastName;
          dto.data.externalLists[key].createdDate = createdDate.getMonth() + 1 + "/" + createdDate.getDate() + "/" + createdDate.getFullYear();
        }
        searchResults.results = dto.data.externalLists;
        return searchResults;
      };


      this.listCustomerToCreateDTO = function(listCustomer) {
        var dto = genericTransformer.objectToDTO(listCustomer, CreatelistCustomerDTO);
        dto.externalUsers = listCustomer.externalUsers;
        return dto;
      };

      this.listCustomerToUpdateDTO = function(listCustomer) {
        var dto = genericTransformer.objectToDTO(listCustomer, UpdatelistCustomerDTO);
        dto.externalUsers = listCustomer.externalUsers;
        return dto;
      }

      this.csvDataToDTO=function(csvDatas){
        var dto=genericTransformer.objectToDTO(csvDatas,CSVDataObject);
        //var dto=new CSVDataObject();
        dto.uniqueUsers = csvDatas.data.uniqueUsers;
        dto.duplicateUsers=csvDatas.data.duplicateUsers;
        dto.invalidUsers=csvDatas.data.invalidUsers;
        return dto;
      }
    }
  ]);

})(angular.module('aet.domain.listCustomer'));
