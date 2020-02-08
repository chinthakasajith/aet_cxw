(function(module) {

  module.service('listEmployeeService', ['listEmployeeEndpoint', 'listEmployeeTransformer', '$q', '$log', 'clientDetails', 'userDetails',
    function(listEmployeeEndpoint, listEmployeeTransformer, $q, $log, clientDetails, userDetails) {

      this.createlistEmployee = function(listEmployee) {
        var dto = listEmployeeTransformer.listEmployeeToCreateDTO(listEmployee);
        return listEmployeeEndpoint.createList(dto).then(function(response) {
          return response.data;
        }, function(err) {
          $log.debug("Could not create employee list", err);
          return $q.reject(err);
        });

      };

      this.deletelistEmployee = function(listEmployeeId) {
        return listEmployeeEndpoint.deleteList(listEmployeeId).then(function(response) {
          return response.data;
        }, function(err) {
          $log.debug("Could not delete employee list", err);
          return $q.reject(err);
        });
      };

      this.updatelistEmployee = function(listEmployee) {
        var dto = listEmployeeTransformer.listEmployeeToUpdateDTO(listEmployee);
        return listEmployeeEndpoint.editList(dto).then(function(response) {
          return response.data;
        }, function(err) {
          $log.debug("Could not update employee list", err);
          return $q.reject(err);
        });
      };


      this.findlistEmployee = function(id) {

        return listEmployeeEndpoint.getList(id).then(function(response) {
          return listEmployeeTransformer.DTOTolistEmployee(response.data);
        }, function(err) {
          console.error("Could not load employee list");
          return $q.reject(err);
        });
      };

      this.searchlistEmployee = function(params) {
        return listEmployeeEndpoint.searchList(params).then(function(dto) {
          return listEmployeeTransformer.searchDTOToSearchResults(dto);
        }, function(err) {
          console.error("Could not search employee list", err);
          return $q.reject(err);
        });

      };

      this.uploadExternalUsers=function(params){
        return listEmployeeEndpoint.sendCSVFile(params).then(function(dto){
          return listEmployeeTransformer.csvDataToDTO(dto);
        },function(err){
          console.error("Could not get filtered csv datas",err);
          return $q.reject(err);
        });
      }


    }
  ]);

})(angular.module('aet.domain.listEmployee'));
