(function(module) {

  module.service('listInternalService', ['listInternalEndpoint', 'listInternalTransformer', '$q', '$log', 'clientDetails', 'userDetails',
    function(listInternalEndpoint, listInternalTransformer, $q, $log, clientDetails, userDetails) {

      this.createListInternal = function(listInternal) {
        var dto = listInternalTransformer.listInternalToCreateDTO(listInternal);
        return listInternalEndpoint.createListInternal(dto).then(function(response) {
          return response.data;
        }, function(err) {
          $log.debug("Could not create list internal", err);
          return $q.reject(err);
        });

      };

      this.deleteListInternal = function(ListInternalId) {
        return listInternalEndpoint.deleteListInternal(ListInternalId).then(function(response) {
          return response.data;
        }, function(err) {
          $log.debug("Could not delete list internal", err);
          return $q.reject(err);
        });
      };

      this.updateListInternal = function(listInternal) {
        var dto = listInternalTransformer.listInternalToUpdateDTO(listInternal);
        return listInternalEndpoint.editListInternal(dto).then(function(response) {
          return response.data;
        }, function(err) {
          $log.debug("Could not update list internal", err);
          return $q.reject(err);
        });
      };


      this.findListInternal = function(id) {

        return listInternalEndpoint.getListInternal(id).then(function(response) {
          return listInternalTransformer.DTOToListInternal(response.data);
        }, function(err) {
          console.error("Could not load internal mission");
          return $q.reject(err);
        });
      };

      this.searchListInternal = function(params) {
        return listInternalEndpoint.searchListInternal(params).then(function(dto) {
          return listInternalTransformer.searchDTOToSearchResults(dto);
        }, function(err) {
          console.error("Could not search mission internal", err);
          return $q.reject(err);
        });

      };


    }
  ]);

})(angular.module('aet.domain.listInternal'));
