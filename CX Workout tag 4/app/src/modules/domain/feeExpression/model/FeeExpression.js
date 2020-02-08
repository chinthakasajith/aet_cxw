(function(module) {
    
    module.service('FeeExpression', [function() {

        function FeeExpression() {

        	this.label = undefined;
        	this.description = undefined;
        	this.feeExpression = undefined;
        	this.type = undefined;
        	
        }

        return FeeExpression;

    }]);

})(angular.module('aet.domain.feeExpression'));