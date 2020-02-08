(function(module) {

  module.service('Project', [function() {

    function Project() {

      this.id = undefined;
      this.creatorId = undefined;
      this.title = undefined;
      this.description = undefined;
      this.curveType = undefined;
      this.stageTemplate = undefined;
      this.startDate = undefined;
      this.endDate = undefined;
      this.projectLeaderIds = [];
      this.projectAdminIds = [];
      this.projectTeamMemberIds = [];
      this.projectSupportMemberIds = [];
      this.projectSMEIds=[];
      this.logoUrl = undefined;
      this.channels = [];
      this.emailConfig = undefined;

    }

    return Project;

  }]);

})(angular.module('aet.domain.project'));
