(function(module) {
    
    module.config(['$provide', function ($provide) {

        $provide.decorator('ngModelDirective', ['$delegate', function($delegate) {
			
			var ngModel = $delegate[0];
			var compile = ngModel.compile;
			
			ngModel.compile = function() {
				var link = compile.apply(this, arguments);
				
				// postLink function
				return {
					pre: function(scope, element, attrs, ctrls) {
						link.pre.apply(this, arguments);
					},
					post: function(scope, element, attrs, ctrls) {
						var ngModelController = ctrls[0];
						
						scope.ngModelController = ngModelController;
						
						var showSuccessAndError = _.debounce(function() {
							scope.$apply(function() {
								ngModelController.$validate();
								ngModelController.$showError = true;
							})
						}, 3000);
						
						ngModelController.$showError = false;
						ngModelController.$hasError = function() {
							//console.log(_.keys(ngModelController.$error));
							return _.keys(ngModelController.$error).length > 0;
						}
						
						element.on('keypress', function(event) {
							scope.$apply(function() {
								ngModelController.$commitViewValue();
								ngModelController.$validate();
								showSuccessAndError();
								ngModelController.$showError = false;
							});
						});
						
						element.on('blur', function(event) {
							scope.$apply(function() {
								ngModelController.$showError = true;
								ngModelController.$showSuccess = true;
							});
						});
						
						link.post.apply(this, arguments);
					}
				}
				
			}
			
			return $delegate;
			
		}])

    }]);
    
})(angular.module('aet.forms'));