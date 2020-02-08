(function(module) {

  module.service('missionQuestionService', ['missionQuestionEndpoint', 'missionQuestionTransformer', '$q', '$log', '$state',
    function(missionQuestionEndpoint, missionQuestionTransformer, $q, $log, $state) {
	  
      this.findMissionQuestion = function(token) {
        return missionQuestionEndpoint.findMissionQuestion(token).then(function(response) {
          return missionQuestionTransformer.DTOToMissionQuestion(response.data);
        }, function(err) {
        	$log.debug("Could not find mission question", err);
        	var error = 500;
        	if(angular.isDefinedAndNotEmpty(err.headers('cxw-code')) && err.headers('cxw-code').indexOf('NOT_FOUND') > -1){
        		error = 404;
        	}
        	
        	$state.go('index.error', {
    			errorType: error
    	    });
        	
          return $q.reject(err);
        });
      };

      this.missionAccept = function(token) {
        return missionQuestionEndpoint.customerMissionStatus('accept', token).then(function(result){
          return result;
        }, function(err){
          console.log(err);
        })
      };
      this.missionDecline = function(token) {
        return missionQuestionEndpoint.customerMissionStatus('decline', token).then(function(result){
          return result;
        }, function(err){
          console.log(err);
        })
      };

      this.updateMissionQuestion = function(missionquestion, send) {
        var dto = missionQuestionTransformer.missionQuestionToUpdateDTO(missionquestion, send);
        return missionQuestionEndpoint.updateMissionQuestion(dto).then(function(response) {
          return missionQuestionTransformer.DTOToAction(response.data);
        }, function(err) {
          $log.debug("Could not update mission question", err);
          var error = 500;
	      	if(angular.isDefinedAndNotEmpty(err.headers('cxw-code')) && err.headers('cxw-code').indexOf('NOT_FOUND') > -1){
	      		error = 404;
	      	}
	      	
	      	$state.go('index.error', {
	  			errorType: error
	  	    });
      	
          return $q.reject(err);
        });
      };

      this.getFinalThankYouMessage=function(token){
        return missionQuestionEndpoint.getFinalThankYouMessage(token).then(function(response) {
          return response.data;
        }, function(err) {
          $log.debug("Could not get last thank you message", err);
          return $q.reject(err);
        });
      }
      
      angular.isDefinedAndNotEmpty = function(val) {
          return angular.isDefined(val) && !angular.equals(val, "") && !angular.equals(val, null);
        }
    }
  ]);

})(angular.module('aet.domain.missionquestion'));
