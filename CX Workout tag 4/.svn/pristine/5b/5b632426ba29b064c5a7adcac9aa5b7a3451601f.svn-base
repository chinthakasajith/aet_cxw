(function(module) {

  module.service('businessUserEndpoint', ['$q', '$http', 'api', 'clientDetails',
    function($q, $http, api, clientDetails) {

      this.createBusinessUser = function(businessuser) {

        var createBusinessUserUrl = api('admin') + '/businessuser'
        return $http.post(createBusinessUserUrl, businessuser);
      };

      this.updateBusinessUser = function(businessuser) {

        var url = api('admin') + '/businessuser/' + businessuser.id;
        return $http.put(url, businessuser);
      };

      this.findSelfBusinessUser = function(userId) {

        var findBusinessUserURL = api('admin') + '/businessuser/' + userId + '/profile';
        return $http.get(findBusinessUserURL);
      };

      this.findBusinessUser = function(id) {

        var url = api('admin') + '/businessuser/' + id;
        return $http.get(url);
      };

      this.listBusinessUser = function(params) {
        var listBusinessUserURL = api('admin') + '/businessuser';
        return $http.get(listBusinessUserURL, {
          params: params
        });
      };
      
      this.searchBusinessUserByClientId  = function(params) {
          var listBusinessUserByClientIdURL = api('admin') + '/client/'+clientDetails.getSelectedClient().id+'/businessuser';
          return $http.get(listBusinessUserByClientIdURL, {
            params: params
          });
        };

      this.deleteBusinessUser = function(id) {
        var url = api('admin') + '/businessuser/' + id;
        return $http.delete(url);
      };

      this.forgotPassword = function(dto) {
        var url = api('admin') + '/businessuser/forgotpassword';
        return $http.put(url, dto);
      };

      this.passwordReset = function(dto) {
        var url = api('admin') + '/businessuser/resetpassword';
        return $http.put(url, dto);
      };

    }
  ]);

})(angular.module('aet.endpoints'));
