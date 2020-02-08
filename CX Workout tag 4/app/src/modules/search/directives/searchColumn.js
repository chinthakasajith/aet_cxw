(function(module) {
    
	/**
	 * @ngdoc directive
	 * @name aet.search.directive:aetSearchColumn
	 *
	 * @restrict E
	 *
	 * @description
	 * Creates a column for the search results table
	 * This directive should be nested within an {@link aet.search.directive:aetSearch aetSearch}. See those docs for an example.
	 *
	 * @param {String} name The name of the field on the object in your {@link aet.search.object:SearchResults SearchResults}.
	 * @param {String} label The name that appears in the table head for this column.
	 * @param {Boolean} searchable Defines whether this column is searchable. If set to true, the search input will filter
	 * the results by this column.
	 *
	 */
	
	module.directive('aetSearchColumn', ['$log', function ($log) {
		return {
			require: '^aetSearch',
			transclude: true,
			replace: true,
			scope: {
				
			},
			link: function(scope, element, attrs, aetSearch) {
				
				aetSearch.addColumn({
					name: attrs.name,
					label: attrs.label,
					searchable: attrs.searchable,
					urlParam: attrs.urlParam
				});
				
			}
		}
	}]);
    
})(angular.module('aet.search'));