(function(module) {

  module.service('listCustomerService', ['listCustomerEndpoint', 'listCustomerTransformer', '$q', '$log', 'clientDetails', 'userDetails',
    function(listCustomerEndpoint, listCustomerTransformer, $q, $log, clientDetails, userDetails) {

      this.createlistCustomer = function(listCustomer) {
        var dto = listCustomerTransformer.listCustomerToCreateDTO(listCustomer);
        return listCustomerEndpoint.createlistCustomer(dto).then(function(response) {
          return response.data;
        }, function(err) {
          $log.debug("Could not create customer list", err);
          return $q.reject(err);
        });

      };

      this.deletelistCustomer = function(listCustomerId) {
        return listCustomerEndpoint.deletelistCustomer(listCustomerId).then(function(response) {
          return response.data;
        }, function(err) {
          $log.debug("Could not delete customer list", err);
          return $q.reject(err);
        });
      };

      this.updatelistCustomer = function(listCustomer) {
        var dto = listCustomerTransformer.listCustomerToUpdateDTO(listCustomer);
        return listCustomerEndpoint.editlistCustomer(dto).then(function(response) {
          return response.data;
        }, function(err) {
          $log.debug("Could not update customer list", err);
          return $q.reject(err);
        });
      };


      this.findlistCustomer = function(id) {

        return listCustomerEndpoint.getlistCustomer(id).then(function(response) {
          return listCustomerTransformer.DTOTolistCustomer(response.data);
        }, function(err) {
          console.error("Could not load customer list");
          return $q.reject(err);
        });
      };

      this.searchlistCustomer = function(params) {
        return listCustomerEndpoint.searchlistCustomer(params).then(function(dto) {
          return listCustomerTransformer.searchDTOToSearchResults(dto);
        }, function(err) {
          console.error("Could not search customer list", err);
          return $q.reject(err);
        });

      };

      this.uploadExternalUsers=function(params){
        return listCustomerEndpoint.sendCSVFile(params).then(function(dto){
          return listCustomerTransformer.csvDataToDTO(dto);
        },function(err){
          console.error("Could not get filtered csv datas",err);
          return $q.reject(err);
        });
      }


    }
  ]);

})(angular.module('aet.domain.listCustomer'));
