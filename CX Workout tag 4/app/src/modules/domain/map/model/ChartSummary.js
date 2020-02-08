(function(module) {

  module.service('ChartSummary', [function() {

    function ChartSummary() {
    	this.chartSummary = undefined;
    	this.commentSummaries = undefined;
    	this.mediaSummaries = undefined;
    	this.bigIdeaSummaries = undefined;
    }

    return ChartSummary;

  }]);

})(angular.module('aet.domain.map'));
