(function(module) {
    /**
	 * @ngdoc filter
	 * @name aet.search.filter:searchFilter
	 *
	 * @description
	 * A filter used by the {@link aet.search.directive:aetSearch aetSearch} directive to filter results
	 * by the columns flagged as searchable in the {@link aet.search.directive:aetSearchColumn aetSearchColumn} directive.
	 *
	 *
	 */
	module.filter('searchFilter', ['$filter', function($filter) {
		
		return function(array, query, fields) {
			
			return _.filter(array, function(object) {
				return _.any(fields, function(field) {
					var fieldName = angular.isObject(field) ? field.name : field;
					var re = new RegExp(query, "i");
					return object.hasOwnProperty(fieldName) && angular.isString(object[fieldName]) && object[fieldName].match(re);
				});
			});
		}
	}]);
	
})(angular.module('aet.search'));