(function(module) {

  module.service('listEmployeeEndpoint', ['$q', '$http', 'api', 'clientDetails', 'userDetails', 'projectDetails',
    function($q, $http, api, clientDetails, userDetails, projectDetails) {

      var controller = '/client/';

      this.createList = function(listRequestDTO) {
        var urlExtension = '/employee/list'
        var createListURL = api('admin') + controller + clientDetails.getSelectedClient().id + '/project/' + projectDetails.getSelectedProject().id + urlExtension;
        return $http.post(createListURL, listRequestDTO);
      };

      this.editList = function(dto) {
        var urlExtension = '/employee/list/' + dto.id;
        var editListURL = api('admin') + controller + clientDetails.getSelectedClient().id + '/project/' + projectDetails.getSelectedProject().id + urlExtension;
        return $http.put(editListURL, dto);
      };

      this.getList = function(listEmployeeId) {
        var urlExtension = '/employee/list/' + listEmployeeId;
        var getListURL = api('admin') + controller + clientDetails.getSelectedClient().id + '/project/' + projectDetails.getSelectedProject().id + urlExtension;
        return $http.get(getListURL);
      };

      this.searchList = function(searchQueryDTO) {
        var urlExtension = '/employee/list';
        var searchClientsURL = api('admin') + controller + clientDetails.getSelectedClient().id + '/project/' + projectDetails.getSelectedProject().id + urlExtension;
        return $http.get(searchClientsURL, {
          params: searchQueryDTO
        });
      };

      this.deleteList = function(listEmployeeId) {
        var urlExtension = '/employee/list/' + listEmployeeId;
        var deleteListURL = api('admin') + controller + clientDetails.getSelectedClient().id + '/project/' + projectDetails.getSelectedProject().id + urlExtension;
        return $http.delete(deleteListURL);
      };

      this.sendCSVFile = function(sendCSVRequestDTO) {
        var urlExtension = '/validate/externalusers';
        var sendCSVFileURL = api('admin') + urlExtension;
        return $http.post(sendCSVFileURL, sendCSVRequestDTO);
      };
      
    }

  ]);

})(angular.module('aet.endpoints'));
