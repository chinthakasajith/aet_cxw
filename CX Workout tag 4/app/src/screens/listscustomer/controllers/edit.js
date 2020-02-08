(function(module) {

  module.controller('EditListCustomerController', ['$scope', 'userDetails', 'listscustomer', 'listCustomerService', 'alertsService', '$modal', '$state', '$log', 'modalService',
    function($scope,  userDetails, listscustomer,  listCustomerService, alertsService, $modal, $state, $log, modalService) {

      $scope.listCustomer = listscustomer;

      $scope.manullayAddRow = function(manuallyAddedFirstName, manuallyAddedLastName, manuallyAddedEmailAddress) {
        var manuallyAddedObject = {
          'firstName': manuallyAddedFirstName,
          'lastName': manuallyAddedLastName,
          'email': manuallyAddedEmailAddress
        };
        angular.forEach($scope.listCustomer.externalUsers, function(externalUser, externalUserKey) {
          if (manuallyAddedEmailAddress == externalUser.email) {
            manuallyAddedObject.isDuplicated = true;
          }
        });
        $scope.listCustomer.externalUsers.push(manuallyAddedObject);

        $scope.manuallyAddedFirstName = undefined;
        $scope.manuallyAddedLastName = undefined;
        $scope.manuallyAddedEmailAddress = undefined;
        //sendManuallyAddedRow($scope.csvDatas);
      }

      $scope.uniqueDisplayed = 25;
      $('.infinite-scroll').on('scroll', function() {
        if ($(this).scrollTop() + $(this).innerHeight() >= this.scrollHeight) {
          $scope.uniqueDisplayed += 25;
          $scope.$apply();
        }
      })

      $scope.manuallyAddedRowValidation = function() {
        var isManuallyAddingRecordButtonValidated = false;
        if (angular.isDefined($scope.manuallyAddedFirstName) && angular.isDefined($scope.manuallyAddedEmailAddress)) {
          isManuallyAddingRecordButtonValidated = true;
        }
        return isManuallyAddingRecordButtonValidated;
      }



      $scope.deleteSelectedRow = function(csvData) {

        var idx = $scope.listCustomer.externalUsers.indexOf(csvData);

        // is currently selected
        if (idx > -1) {
          $scope.listCustomer.externalUsers.splice(idx, 1);
        }

      }

      $scope.isValidList=function(){
        var isValidList=false;
        if($scope.listCustomer.externalUsers.length>0 && angular.isDefined($scope.listCustomer.title)){
          isValidList=true;
          angular.forEach($scope.listCustomer.externalUsers,function(externalUser,externalUserKey){
            if (angular.isUndefined(externalUser.firstName)) {
              isValidList = false;
            }
          });
        }
        return isValidList;
      }

      $scope.submitListCustomer = function() {

    	  // if ($scope.listCustomer.externalUsers.length == 0) {
        //       alertsService.addAlert({
        //         title: 'Error',
        //         message: 'Customer List is Required.',
        //         type: 'error',
        //         removeOnStateChange: 2
        //       });
        //   }else{
		        listCustomerService.updatelistCustomer($scope.listCustomer).then(function(data) {
		          alertsService.addAlert({
		            title: 'Success',
		            message: 'List Customer "' + $scope.listCustomer.title + '" successfully updated',
		            type: 'success',
		            removeOnStateChange: 2
		          });
		          $state.go('index.secured.listscustomer.search');
		        }, function(err) {
		          //console.error('Could not create project', err);
		        });
        //  }

      }

    }
  ]);

})(angular.module('aet.screens.listsprojectteam'));
