(function(module) {

  module.controller('EditListEmployeeController', ['$scope', 'userDetails', 'listsemployee', 'listEmployeeService', 'alertsService', '$modal', '$state', '$log', 'modalService',
    function($scope,  userDetails, listsemployee,  listEmployeeService, alertsService, $modal, $state, $log, modalService) {

      $scope.listEmployee = listsemployee;

      $scope.manullayAddRow = function(manuallyAddedFirstName, manuallyAddedLastName, manuallyAddedEmailAddress) {
        var manuallyAddedObject = {
          'firstName': manuallyAddedFirstName,
          'lastName': manuallyAddedLastName,
          'email': manuallyAddedEmailAddress
        };
        angular.forEach($scope.listEmployee.externalUsers, function(externalUser, externalUserKey) {
          if (manuallyAddedEmailAddress == externalUser.email) {
            manuallyAddedObject.isDuplicated = true;
          }
        });
        $scope.listEmployee.externalUsers.push(manuallyAddedObject);

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

        var idx = $scope.listEmployee.externalUsers.indexOf(csvData);

        // is currently selected
        if (idx > -1) {
          $scope.listEmployee.externalUsers.splice(idx, 1);
        }

      }

      $scope.isValidList=function(){
        var isValidList=false;
        if($scope.listEmployee.externalUsers.length>0 && angular.isDefined($scope.listEmployee.title)){
          isValidList=true;
          angular.forEach($scope.listEmployee.externalUsers,function(externalUser,externalUserKey){
            if (angular.isUndefined(externalUser.firstName)) {
              isValidList = false;
            }
          });
        }
        return isValidList;
      }

      $scope.submitListEmployee = function() {

    	  // if ($scope.listEmployee.externalUsers.length == 0) {
        //       alertsService.addAlert({
        //         title: 'Error',
        //         message: 'Customer List is Required.',
        //         type: 'error',
        //         removeOnStateChange: 2
        //       });
        //   }else{
		        listEmployeeService.updatelistEmployee($scope.listEmployee).then(function(data) {
		          alertsService.addAlert({
		            title: 'Success',
		            message: 'List Employee "' + $scope.listEmployee.title + '" successfully updated',
		            type: 'success',
		            removeOnStateChange: 2
		          });
		          $state.go('index.secured.listsemployee.search');
		        }, function(err) {
		          //console.error('Could not create project', err);
		        });
        //  }

      }


    }
  ]);

})(angular.module('aet.screens.listsprojectteam'));
