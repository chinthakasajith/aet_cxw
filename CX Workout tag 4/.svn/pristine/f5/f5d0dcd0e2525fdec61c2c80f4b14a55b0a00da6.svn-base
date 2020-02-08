(function(module) {

  module.service('listCustomerEndpoint', ['$q', '$http', 'api', 'clientDetails', 'userDetails', 'projectDetails',
    function($q, $http, api, clientDetails, userDetails, projectDetails) {

      var controller = '/client/';

      this.createlistCustomer = function(listCustomerRequestDTO) {
        var urlExtension = '/customer/list'
        var createlistCustomerURL = api('admin') + controller + clientDetails.getSelectedClient().id + '/project/' + projectDetails.getSelectedProject().id + urlExtension;
        return $http.post(createlistCustomerURL, listCustomerRequestDTO);
      };

      this.editlistCustomer = function(dto) {
        var urlExtension = '/customer/list/' + dto.id;
        var editlistCustomerURL = api('admin') + controller + clientDetails.getSelectedClient().id + '/project/' + projectDetails.getSelectedProject().id + urlExtension;
        return $http.put(editlistCustomerURL, dto);
      };

      this.getlistCustomer = function(listCustomerId) {
        var urlExtension = '/customer/list/' + listCustomerId;
        var getlistCustomerURL = api('admin') + controller + clientDetails.getSelectedClient().id + '/project/' + projectDetails.getSelectedProject().id + urlExtension;
        return $http.get(getlistCustomerURL);
      };

      this.searchlistCustomer = function(searchQueryDTO) {
        var urlExtension = '/customer/list';
        var searchClientsURL = api('admin') + controller + clientDetails.getSelectedClient().id + '/project/' + projectDetails.getSelectedProject().id + urlExtension;
        return $http.get(searchClientsURL, {
          params: searchQueryDTO
        });
      };

      this.deletelistCustomer = function(listCustomerId) {
        var urlExtension = '/customer/list/' + listCustomerId;
        var deletelistCustomerURL = api('admin') + controller + clientDetails.getSelectedClient().id + '/project/' + projectDetails.getSelectedProject().id + urlExtension;
        return $http.delete(deletelistCustomerURL);
      };

      this.sendCSVFile = function(sendCSVRequestDTO) {
        var urlExtension = '/validate/externalusers';
        var sendCSVFileURL = api('admin') + urlExtension;
        return $http.post(sendCSVFileURL, sendCSVRequestDTO);
      };

    }

  ]);

})(angular.module('aet.endpoints'));
