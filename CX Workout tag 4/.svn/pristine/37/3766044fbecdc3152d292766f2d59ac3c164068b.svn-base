(function(module) {

  module.service('listEmployeeTransformer', ['ListEmployee', 'genericTransformer', '$log', 'CreatelistEmployeeDTO', 'UpdatelistEmployeeDTO','CSVDataObject',
    function(ListEmployee, genericTransformer, $log, CreatelistEmployeeDTO, UpdatelistEmployeeDTO,CSVDataObject) {

      this.DTOTolistEmployee = function(dto) {
        var listEmployee = genericTransformer.DTOToObject(dto, ListEmployee);
        angular.forEach(dto.externalUsers,function(externalUser,externalUserKey){
          externalUser.alreadySelectedRecord=true;
        });
        listEmployee.externalUsers = dto.externalUsers;
        return listEmployee;
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


      this.listEmployeeToCreateDTO = function(listEmployee) {
        var dto = genericTransformer.objectToDTO(listEmployee, CreatelistEmployeeDTO);
        dto.externalUsers = listEmployee.externalUsers;
        return dto;
      };

      this.listEmployeeToUpdateDTO = function(listEmployee) {
        var dto = genericTransformer.objectToDTO(listEmployee, UpdatelistEmployeeDTO);
        dto.externalUsers = listEmployee.externalUsers;
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

})(angular.module('aet.domain.listEmployee'));
