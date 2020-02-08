(function (module) {

  module.controller('MissionPreviewCtrl', ['$scope','$stateParams',  '$modalInstance','questionService',  '$log',
    function ($scope, $stateParams, $modalInstance,questionService,$log) {

      questionService.getQuestions($stateParams.id).then(function(response) {
        $scope.questions = response;
        $scope.item = 0;
        $scope.isNextDisabled = true;
        $scope.isPreviousDisabled = true;
        $scope.isFinishDisabled = true;

        var sizeOfMissionActions = $scope.questions.actions.length;
        if(sizeOfMissionActions > 0){
          $scope.isNextDisabled = false;
          $scope.isPreviousDisabled = true;
          $scope.isFinished = false;
        }

        if(sizeOfMissionActions === 1){
          $scope.isFinished = true;
        }

        $scope.select = function(index, first, last){
          $scope.item = index;
          if(first === true && last === false){
            $scope.isNextDisabled = false;
            $scope.isPreviousDisabled = true;
            $scope.isFinished = false;
          }
          if(first === false && last === false){
            $scope.isNextDisabled = false;
            $scope.isPreviousDisabled = false;
            $scope.isFinished = false;
          }
          if(last === true && first === false){
            $scope.isNextDisabled = true;
            $scope.isPreviousDisabled = false;
            $scope.isFinished = true;
          }
        };

        $scope.next = function() {
          if($scope.item < (sizeOfMissionActions - 1)){
            $scope.item = $scope.item + 1;
            $scope.isPreviousDisabled = false;
          }
          if($scope.item === (sizeOfMissionActions - 1)){
            $scope.isNextDisabled = true;
            $scope.isPreviousDisabled = false;
            $scope.isFinished = true;
          }
        };

        $scope.previous = function() {
          if(sizeOfMissionActions > $scope.item && $scope.item !== 0){
            $scope.item = $scope.item - 1;
            $scope.isNextDisabled = false;
            $scope.isFinished = false;
          }
          if($scope.item == 0){
            $scope.isPreviousDisabled = true;
          }
        };
      });


      $scope.ok = function () {
        $modalInstance.close();
      };

      $scope.cancel = function (){
        $modalInstance.dismiss('cancel');
      };


    }
  ]);

})(angular.module('aet.modals'));
