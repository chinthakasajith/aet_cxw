(function(module) {

  module.service('listInternalTransformer', ['ListInternal', 'genericTransformer', '$log', 'CreateListInternalDTO', 'UpdateListInternalDTO',
    function(ListInternal, genericTransformer, $log, CreateListInternalDTO, UpdateListInternalDTO) {

      this.DTOToListInternal = function(dto) {
        var listinternal = genericTransformer.DTOToObject(dto, ListInternal);
        listinternal.members = dto.members;
        return listinternal;
      };

      this.searchDTOToSearchResults = function(dto) {
        var searchResults = genericTransformer.DTOToSearchResults(dto.data);
        for (var key in dto.data.internalLists) {
          var createdDate = new Date(dto.data.internalLists[key].createdDate);
          dto.data.internalLists[key].creatorName = dto.data.internalLists[key].creator.firstName + " " + dto.data.internalLists[key].creator.lastName;
          dto.data.internalLists[key].createdDate = createdDate.getMonth() + 1 + "/" + createdDate.getDate() + "/" + createdDate.getFullYear();

        }
        searchResults.results = dto.data.internalLists;
        return searchResults;
      };


      this.listInternalToCreateDTO = function(listInternal) {
        var dto = genericTransformer.objectToDTO(listInternal, CreateListInternalDTO);
        dto.memberIds = listInternal.memberIds;
        return dto;
      };

      this.listInternalToUpdateDTO = function(listInternal) {
        var dto = genericTransformer.objectToDTO(listInternal, UpdateListInternalDTO);
        dto.memberIds = listInternal.members;
        return dto;
      }
    }
  ]);

})(angular.module('aet.domain.listInternal'));
