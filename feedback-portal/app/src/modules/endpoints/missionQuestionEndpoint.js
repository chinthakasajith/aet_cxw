(function(module) {

  module.service('missionQuestionEndpoint', ['$q', '$http','api','$stateParams',
    function($q, $http, api,$stateParams) {
      this.findMissionQuestion = function(token) {
        var url = api('admin') + '/feedback/mission?token=' + token;
        return $http.get(url);
        /*
        return $q(function(resolve, reject){
  //var json = {"client":{"termsCond":"<b>Hello World!</b>","logoUrl":"https://cxworkoutdev.s3.amazonaws.com/administration/1442989423869_logo.png","thankYouMsg":"Thank you for agreeing to provide feedback. We would like you to think about your experience with our company as it relates to the support you received in comparing your options so you were prepared to make the best purchase decision to meet your needs"},"participant":{"type":"PROJECT_TEAM","status":null},"status":"ACCEPTED_INCOMPLETE","actions":[{"actionId":191,"actionTitle":"Get help comparing their options before they buy something 01","actionHeader":"Thank you for agreeing to provide feedback. We would like you to think about your experience with our company as it relates to the support you received in comparing your options so you were prepared to make the best purchase decision to meet your needs","questions":[{"questionId":8,"groupName":"About Your Experience","positionIndex":0,"questionText":"Media Upload","instructionsText":"This is where the text will go that speaks to what the Participant should do, focus, know about shooting a video, audio or uploading an image. The user will explain how that works, what they want and also tell the Participant to shoot that, come back and continue on with the questions.","inputType":"FILEUPLOAD","previousAnswerId":2367,"previousAnswer":"https://cxworkoutdev.s3.amazonaws.com/feedback/1447324886361_cxtest.jpg"},{"questionId":8,"groupName":"About Your Experience","positionIndex":0,"questionText":"Media Upload","instructionsText":"This is where the text will go that speaks to what the Participant should do, focus, know about shooting a video, audio or uploading an image. The user will explain how that works, what they want and also tell the Participant to shoot that, come back and continue on with the questions.","inputType":"FILEUPLOAD","previousAnswerId":2374,"previousAnswer":"https://cxworkoutdev.s3.amazonaws.com/feedback/1447319387648_cxtest.jpg"},{"questionId":8,"groupName":"About Your Experience","positionIndex":0,"questionText":"Media Upload","instructionsText":"This is where the text will go that speaks to what the Participant should do, focus, know about shooting a video, audio or uploading an image. The user will explain how that works, what they want and also tell the Participant to shoot that, come back and continue on with the questions.","inputType":"FILEUPLOAD","previousAnswerId":2407},{"questionId":9,"groupName":"Questions","positionIndex":1,"questionText":"How would you rate how well we meet customer expectations on this experience?","inputType":"SLIDER","previousAnswerId":2368,"previousAnswer":"1","labels":{"1":"Does not meet","3":"Meets","5":"Exceeds"}},{"questionId":10,"groupName":"Questions","positionIndex":2,"questionText":"How frequently would customers typically complete this experience?","inputType":"SLIDER","previousAnswerId":2369,"previousAnswer":"2","labels":{"1":"Never","3":"Occasionally","5":"Frequently"}},{"questionId":11,"groupName":"Questions","positionIndex":3,"questionText":"How does this experience make your customers' feel?","inputType":"SLIDER","previousAnswerId":2370,"previousAnswer":"3","labels":{"1":"Very Negative","3":"Neutral","5":"Very Positive"}},{"questionId":12,"groupName":"Questions","positionIndex":4,"questionText":"Based on this specific experience, how likely would customers be to continue purchasing products or services from our company?","inputType":"SLIDER","previousAnswerId":2371,"previousAnswer":"4","labels":{"1":"Very Unlikely","3":"Neutral","5":"Very Likely"}},{"questionId":13,"groupName":"Comments","positionIndex":5,"questionText":"Please tell us why you gave the ratings you did in the space below.","inputType":"TEXTBOX","previousAnswerId":2372,"previousAnswer":"test"},{"questionId":14,"groupName":"Big Ideas","positionIndex":6,"questionText":"What big ideas do you have for us that would improve your experiences with our company? The bigger the better.","inputType":"TEXTBOX","previousAnswerId":2373,"previousAnswer":"test"}]},{"actionId":194,"actionTitle":"Get help comparing their options before they buy something 04","actionHeader":"Thank you for agreeing to provide feedback. We would like you to think about your experience with our company as it relates to the support you received in comparing your options so you were prepared to make the best purchase decision to meet your needs","questions":[{"questionId":9,"groupName":"Questions","positionIndex":1,"questionText":"How would you rate how well we meet customer expectations on this experience?","inputType":"SLIDER","previousAnswerId":2322,"previousAnswer":"0","labels":{"1":"Does not meet","3":"Meets","5":"Exceeds"}},{"questionId":10,"groupName":"Questions","positionIndex":2,"questionText":"How frequently would customers typically complete this experience?","inputType":"SLIDER","previousAnswerId":2323,"previousAnswer":"0","labels":{"1":"Never","3":"Occasionally","5":"Frequently"}},{"questionId":11,"groupName":"Questions","positionIndex":3,"questionText":"How does this experience make your customers' feel?","inputType":"SLIDER","previousAnswerId":2324,"previousAnswer":"0","labels":{"1":"Very Negative","3":"Neutral","5":"Very Positive"}},{"questionId":12,"groupName":"Questions","positionIndex":4,"questionText":"Based on this specific experience, how likely would customers be to continue purchasing products or services from our company?","inputType":"SLIDER","previousAnswerId":2325,"previousAnswer":"0","labels":{"1":"Very Unlikely","3":"Neutral","5":"Very Likely"}},{"questionId":13,"groupName":"Comments","positionIndex":5,"questionText":"Please tell us why you gave the ratings you did in the space below.","inputType":"TEXTBOX","previousAnswerId":2326},{"questionId":14,"groupName":"Big Ideas","positionIndex":6,"questionText":"What big ideas do you have for us that would improve your experiences with our company? The bigger the better.","inputType":"TEXTBOX","previousAnswerId":2327}]},{"actionId":196,"actionTitle":"Get help comparing their options before they buy something 06","actionHeader":"Thank you for agreeing to provide feedback. We would like you to think about your experience with our company as it relates to the support you received in comparing your options so you were prepared to make the best purchase decision to meet your needs","questions":[{"questionId":8,"groupName":"About Your Experience","positionIndex":0,"questionText":"Media Upload","instructionsText":"This is where the text will go that speaks to what the Participant should do, focus, know about shooting a video, audio or uploading an image. The user will explain how that works, what they want and also tell the Participant to shoot that, come back and continue on with the questions.","inputType":"FILEUPLOAD"},{"questionId":9,"groupName":"Questions","positionIndex":1,"questionText":"How would you rate how well we meet customer expectations on this experience?","inputType":"SLIDER","labels":{"1":"Does not meet","3":"Meets","5":"Exceeds"}},{"questionId":10,"groupName":"Questions","positionIndex":2,"questionText":"How frequently would customers typically complete this experience?","inputType":"SLIDER","labels":{"1":"Never","3":"Occasionally","5":"Frequently"}},{"questionId":11,"groupName":"Questions","positionIndex":3,"questionText":"How does this experience make your customers' feel?","inputType":"SLIDER","labels":{"1":"Very Negative","3":"Neutral","5":"Very Positive"}},{"questionId":12,"groupName":"Questions","positionIndex":4,"questionText":"Based on this specific experience, how likely would customers be to continue purchasing products or services from our company?","inputType":"SLIDER","labels":{"1":"Very Unlikely","3":"Neutral","5":"Very Likely"}},{"questionId":13,"groupName":"Comments","positionIndex":5,"questionText":"Please tell us why you gave the ratings you did in the space below.","inputType":"TEXTBOX"},{"questionId":14,"groupName":"Big Ideas","positionIndex":6,"questionText":"What big ideas do you have for us that would improve your experiences with our company? The bigger the better.","inputType":"TEXTBOX"}]}]};
  //var json = {"client":{"termsCond":"<b>Hello World!</b>","logoUrl":"https://cxworkoutdev.s3.amazonaws.com/administration/1442989423869_logo.png","thankYouMsg":"Thank you for agreeing to provide feedback. We would like you to think about your experience with our company as it relates to the support you received in comparing your options so you were prepared to make the best purchase decision to meet your needs"},"participant":{"type":"PROJECT_TEAM","status":null},"status":"ACCEPTED_INCOMPLETE","actions":[{"actionId":191,"actionTitle":"Get help comparing their options before they buy something 01","actionHeader":"Thank you for agreeing to provide feedback. We would like you to think about your experience with our company as it relates to the support you received in comparing your options so you were prepared to make the best purchase decision to meet your needs","questions":[{"questionId":8,"groupName":"About Your Experience","positionIndex":0,"questionText":"Media Upload","instructionsText":"This is where the text will go that speaks to what the Participant should do, focus, know about shooting a video, audio or uploading an image. The user will explain how that works, what they want and also tell the Participant to shoot that, come back and continue on with the questions.","inputType":"FILEUPLOAD"},{"questionId":9,"groupName":"Questions","positionIndex":1,"questionText":"How would you rate how well we meet customer expectations on this experience?","inputType":"SLIDER","previousAnswerId":2368,"previousAnswer":"1","labels":{"1":"Does not meet","3":"Meets","5":"Exceeds"}},{"questionId":10,"groupName":"Questions","positionIndex":2,"questionText":"How frequently would customers typically complete this experience?","inputType":"SLIDER","previousAnswerId":2369,"previousAnswer":"2","labels":{"1":"Never","3":"Occasionally","5":"Frequently"}},{"questionId":11,"groupName":"Questions","positionIndex":3,"questionText":"How does this experience make your customers' feel?","inputType":"SLIDER","previousAnswerId":2370,"previousAnswer":"3","labels":{"1":"Very Negative","3":"Neutral","5":"Very Positive"}},{"questionId":12,"groupName":"Questions","positionIndex":4,"questionText":"Based on this specific experience, how likely would customers be to continue purchasing products or services from our company?","inputType":"SLIDER","previousAnswerId":2371,"previousAnswer":"4","labels":{"1":"Very Unlikely","3":"Neutral","5":"Very Likely"}},{"questionId":13,"groupName":"Comments","positionIndex":5,"questionText":"Please tell us why you gave the ratings you did in the space below.","inputType":"TEXTBOX","previousAnswerId":2372,"previousAnswer":"test"},{"questionId":14,"groupName":"Big Ideas","positionIndex":6,"questionText":"What big ideas do you have for us that would improve your experiences with our company? The bigger the better.","inputType":"TEXTBOX","previousAnswerId":2373,"previousAnswer":"test"}]},{"actionId":194,"actionTitle":"Get help comparing their options before they buy something 04","actionHeader":"Thank you for agreeing to provide feedback. We would like you to think about your experience with our company as it relates to the support you received in comparing your options so you were prepared to make the best purchase decision to meet your needs","questions":[{"questionId":9,"groupName":"Questions","positionIndex":1,"questionText":"How would you rate how well we meet customer expectations on this experience?","inputType":"SLIDER","previousAnswerId":2322,"previousAnswer":"0","labels":{"1":"Does not meet","3":"Meets","5":"Exceeds"}},{"questionId":10,"groupName":"Questions","positionIndex":2,"questionText":"How frequently would customers typically complete this experience?","inputType":"SLIDER","previousAnswerId":2323,"previousAnswer":"0","labels":{"1":"Never","3":"Occasionally","5":"Frequently"}},{"questionId":11,"groupName":"Questions","positionIndex":3,"questionText":"How does this experience make your customers' feel?","inputType":"SLIDER","previousAnswerId":2324,"previousAnswer":"0","labels":{"1":"Very Negative","3":"Neutral","5":"Very Positive"}},{"questionId":12,"groupName":"Questions","positionIndex":4,"questionText":"Based on this specific experience, how likely would customers be to continue purchasing products or services from our company?","inputType":"SLIDER","previousAnswerId":2325,"previousAnswer":"0","labels":{"1":"Very Unlikely","3":"Neutral","5":"Very Likely"}},{"questionId":13,"groupName":"Comments","positionIndex":5,"questionText":"Please tell us why you gave the ratings you did in the space below.","inputType":"TEXTBOX","previousAnswerId":2326},{"questionId":14,"groupName":"Big Ideas","positionIndex":6,"questionText":"What big ideas do you have for us that would improve your experiences with our company? The bigger the better.","inputType":"TEXTBOX","previousAnswerId":2327}]},{"actionId":196,"actionTitle":"Get help comparing their options before they buy something 06","actionHeader":"Thank you for agreeing to provide feedback. We would like you to think about your experience with our company as it relates to the support you received in comparing your options so you were prepared to make the best purchase decision to meet your needs","questions":[{"questionId":8,"groupName":"About Your Experience","positionIndex":0,"questionText":"Media Upload","instructionsText":"This is where the text will go that speaks to what the Participant should do, focus, know about shooting a video, audio or uploading an image. The user will explain how that works, what they want and also tell the Participant to shoot that, come back and continue on with the questions.","inputType":"FILEUPLOAD"},{"questionId":9,"groupName":"Questions","positionIndex":1,"questionText":"How would you rate how well we meet customer expectations on this experience?","inputType":"SLIDER","labels":{"1":"Does not meet","3":"Meets","5":"Exceeds"}},{"questionId":10,"groupName":"Questions","positionIndex":2,"questionText":"How frequently would customers typically complete this experience?","inputType":"SLIDER","labels":{"1":"Never","3":"Occasionally","5":"Frequently"}},{"questionId":11,"groupName":"Questions","positionIndex":3,"questionText":"How does this experience make your customers' feel?","inputType":"SLIDER","labels":{"1":"Very Negative","3":"Neutral","5":"Very Positive"}},{"questionId":12,"groupName":"Questions","positionIndex":4,"questionText":"Based on this specific experience, how likely would customers be to continue purchasing products or services from our company?","inputType":"SLIDER","labels":{"1":"Very Unlikely","3":"Neutral","5":"Very Likely"}},{"questionId":13,"groupName":"Comments","positionIndex":5,"questionText":"Please tell us why you gave the ratings you did in the space below.","inputType":"TEXTBOX"},{"questionId":14,"groupName":"Big Ideas","positionIndex":6,"questionText":"What big ideas do you have for us that would improve your experiences with our company? The bigger the better.","inputType":"TEXTBOX"}]}]};
 //var json = {"client":{"termsCond":"<b>Hello World!</b>","logoUrl":"https://cxworkoutdev.s3.amazonaws.com/administration/1442989423869_logo.png","thankYouMsg":"Thank you for agreeing to provide feedback. We would like you to think about your experience with our company as it relates to the support you received in comparing your options so you were prepared to make the best purchase decision to meet your needs"},"participant":{"type":"PROJECT_TEAM","status":null},"status":"ACCEPTED_INCOMPLETE","actions":[{"actionId":191,"actionTitle":"Get help comparing their options before they buy something 01","actionHeader":"Thank you for agreeing to provide feedback. We would like you to think about your experience with our company as it relates to the support you received in comparing your options so you were prepared to make the best purchase decision to meet your needs","questions":[{"questionId":8,"groupName":"About Your Experience","positionIndex":0,"questionText":"Media Upload","instructionsText":"This is where the text will go that speaks to what the Participant should do, focus, know about shooting a video, audio or uploading an image. The user will explain how that works, what they want and also tell the Participant to shoot that, come back and continue on with the questions.","inputType":"FILEUPLOAD","previousAnswerId":2367,"previousAnswer":"https://cxworkoutdev.s3.amazonaws.com/feedback/1447324886361_cxtest.jpg"},{"questionId":9,"groupName":"Questions","positionIndex":1,"questionText":"How would you rate how well we meet customer expectations on this experience?","inputType":"SLIDER","previousAnswerId":2368,"previousAnswer":"1","labels":{"1":"Does not meet","3":"Meets","5":"Exceeds"}},{"questionId":10,"groupName":"Questions","positionIndex":2,"questionText":"How frequently would customers typically complete this experience?","inputType":"SLIDER","previousAnswerId":2369,"previousAnswer":"2","labels":{"1":"Never","3":"Occasionally","5":"Frequently"}},{"questionId":11,"groupName":"Questions","positionIndex":3,"questionText":"How does this experience make your customers' feel?","inputType":"SLIDER","previousAnswerId":2370,"previousAnswer":"3","labels":{"1":"Very Negative","3":"Neutral","5":"Very Positive"}},{"questionId":12,"groupName":"Questions","positionIndex":4,"questionText":"Based on this specific experience, how likely would customers be to continue purchasing products or services from our company?","inputType":"SLIDER","previousAnswerId":2371,"previousAnswer":"4","labels":{"1":"Very Unlikely","3":"Neutral","5":"Very Likely"}},{"questionId":13,"groupName":"Comments","positionIndex":5,"questionText":"Please tell us why you gave the ratings you did in the space below.","inputType":"TEXTBOX","previousAnswerId":2372,"previousAnswer":"test"},{"questionId":14,"groupName":"Big Ideas","positionIndex":6,"questionText":"What big ideas do you have for us that would improve your experiences with our company? The bigger the better.","inputType":"TEXTBOX","previousAnswerId":2373,"previousAnswer":"test"}]},{"actionId":194,"actionTitle":"Get help comparing their options before they buy something 04","actionHeader":"Thank you for agreeing to provide feedback. We would like you to think about your experience with our company as it relates to the support you received in comparing your options so you were prepared to make the best purchase decision to meet your needs","questions":[{"questionId":9,"groupName":"Questions","positionIndex":1,"questionText":"How would you rate how well we meet customer expectations on this experience?","inputType":"SLIDER","previousAnswerId":2322,"previousAnswer":"0","labels":{"1":"Does not meet","3":"Meets","5":"Exceeds"}},{"questionId":10,"groupName":"Questions","positionIndex":2,"questionText":"How frequently would customers typically complete this experience?","inputType":"SLIDER","previousAnswerId":2323,"previousAnswer":"0","labels":{"1":"Never","3":"Occasionally","5":"Frequently"}},{"questionId":11,"groupName":"Questions","positionIndex":3,"questionText":"How does this experience make your customers' feel?","inputType":"SLIDER","previousAnswerId":2324,"previousAnswer":"0","labels":{"1":"Very Negative","3":"Neutral","5":"Very Positive"}},{"questionId":12,"groupName":"Questions","positionIndex":4,"questionText":"Based on this specific experience, how likely would customers be to continue purchasing products or services from our company?","inputType":"SLIDER","previousAnswerId":2325,"previousAnswer":"0","labels":{"1":"Very Unlikely","3":"Neutral","5":"Very Likely"}},{"questionId":13,"groupName":"Comments","positionIndex":5,"questionText":"Please tell us why you gave the ratings you did in the space below.","inputType":"TEXTBOX","previousAnswerId":2326},{"questionId":14,"groupName":"Big Ideas","positionIndex":6,"questionText":"What big ideas do you have for us that would improve your experiences with our company? The bigger the better.","inputType":"TEXTBOX","previousAnswerId":2327}]},{"actionId":196,"actionTitle":"Get help comparing their options before they buy something 06","actionHeader":"Thank you for agreeing to provide feedback. We would like you to think about your experience with our company as it relates to the support you received in comparing your options so you were prepared to make the best purchase decision to meet your needs","questions":[{"questionId":8,"groupName":"About Your Experience","positionIndex":0,"questionText":"Media Upload","instructionsText":"This is where the text will go that speaks to what the Participant should do, focus, know about shooting a video, audio or uploading an image. The user will explain how that works, what they want and also tell the Participant to shoot that, come back and continue on with the questions.","inputType":"FILEUPLOAD"},{"questionId":9,"groupName":"Questions","positionIndex":1,"questionText":"How would you rate how well we meet customer expectations on this experience?","inputType":"SLIDER","labels":{"1":"Does not meet","3":"Meets","5":"Exceeds"}},{"questionId":10,"groupName":"Questions","positionIndex":2,"questionText":"How frequently would customers typically complete this experience?","inputType":"SLIDER","labels":{"1":"Never","3":"Occasionally","5":"Frequently"}},{"questionId":11,"groupName":"Questions","positionIndex":3,"questionText":"How does this experience make your customers' feel?","inputType":"SLIDER","labels":{"1":"Very Negative","3":"Neutral","5":"Very Positive"}},{"questionId":12,"groupName":"Questions","positionIndex":4,"questionText":"Based on this specific experience, how likely would customers be to continue purchasing products or services from our company?","inputType":"SLIDER","labels":{"1":"Very Unlikely","3":"Neutral","5":"Very Likely"}},{"questionId":13,"groupName":"Comments","positionIndex":5,"questionText":"Please tell us why you gave the ratings you did in the space below.","inputType":"TEXTBOX"},{"questionId":14,"groupName":"Big Ideas","positionIndex":6,"questionText":"What big ideas do you have for us that would improve your experiences with our company? The bigger the better.","inputType":"TEXTBOX"}]}]};
  var response ={};
  response.data = json;
  resolve(response);
});*/
      };

      this.updateMissionQuestion = function(missionquestion) {
        var url = api('admin') + '/feedback/mission?token=' + $stateParams.token;
        return $http.put(url, missionquestion);
      };

      this.getFinalThankYouMessage = function(token) {
        var url = api('admin') + '/feedback/message?token=' + token;
        return $http.get(url);
      };

      this.customerMissionStatus = function(status, token) {
        var url;
        if(status === 'accept'){
          url = api('admin') + '/feedback/mission/accepttnc?token=' + token;
          return $http.get(url);
        }else{
          url = api('admin') + '/feedback/mission/declinetnc?token=' + token;
          return $http.get(url);
        }

      };

    }
  ]);

})(angular.module('aet.endpoint'));