(function(module) {

  module.service('listInternalEndpoint', ['$q', '$http', 'api', 'clientDetails', 'userDetails', 'projectDetails',
    function($q, $http, api, clientDetails, userDetails, projectDetails) {

      var controller = '/client/';

      this.createListInternal = function(listInternalRequestDTO) {
        var urlExtension = '/projectteam/list'
        var createListInternalURL = api('admin') + controller + clientDetails.getSelectedClient().id + '/project/' + projectDetails.getSelectedProject().id + urlExtension;
        return $http.post(createListInternalURL, listInternalRequestDTO);
      };

      this.editListInternal = function(dto) {
        var urlExtension = '/projectteam/list/' + dto.id;
        var editListInternalURL = api('admin') + controller + clientDetails.getSelectedClient().id + '/project/' + projectDetails.getSelectedProject().id + urlExtension;
        return $http.put(editListInternalURL, dto);
      };

      this.getListInternal = function(listInternalId) {
        var urlExtension = '/projectteam/list/' + listInternalId;
        var getListInternalURL = api('admin') + controller + clientDetails.getSelectedClient().id + '/project/' + projectDetails.getSelectedProject().id + urlExtension;
        return $http.get(getListInternalURL);
      };

      this.searchListInternal = function(searchQueryDTO) {
        var urlExtension = '/projectteam/list';
        var searchClientsURL = api('admin') + controller + clientDetails.getSelectedClient().id + '/project/' + projectDetails.getSelectedProject().id + urlExtension;
        return $http.get(searchClientsURL, {
          params: searchQueryDTO
        });
      };

      this.deleteListInternal = function(ListInternalId) {
        var urlExtension = '/projectteam/list/' + ListInternalId;
        var deleteListInternalURL = api('admin') + controller + clientDetails.getSelectedClient().id + '/project/' + projectDetails.getSelectedProject().id + urlExtension;
        return $http.delete(deleteListInternalURL);
      };
    }

  ]);

})(angular.module('aet.endpoints'));
