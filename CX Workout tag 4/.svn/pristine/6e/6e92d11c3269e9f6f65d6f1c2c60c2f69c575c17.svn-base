(function(module) {
    
    module.service('screenTransformer', ['genericTransformer', 'fieldTransformer', 'ScreenDTO', 'Screen', 'fieldEntryTransformer', '$log', '$filter',
        function(genericTransformer, fieldTransformer, ScreenDTO, Screen, fieldEntryTransformer, $log, $filter) {

            this.screenToScreenDTO = function(screen) { //screen = Screen obj
                
            	var screenDto = new ScreenDTO();
            	
            	screenDto.label = screen.label;
            	screenDto.order = screen.order;
            	
            	var noOfFields = screen.fields.length;
            	var fieldModelObj;
            	var fieldDtoObj;
            	
            	for (var i=0; i<noOfFields ; i++){
            		fieldModelObj = screen.fields[i];
            		fieldName = screen.fields[i].name;
            		fieldDtoObj = fieldTransformer.fieldToFieldDTO(fieldModelObj);
            		//screenDto.fields.set(fieldName, fieldDtoObj);
            		screenDto.fields[fieldName]=fieldDtoObj;
            	}
            	
            	return screenDto;
            };
            
            this.screenToScreenEntryDTO = function(screen) { //screen = Screen obj
                
            	var screenEntryDto = new ScreenDTO();
            	
            	screenEntryDto.label = screen.label;
            	screenEntryDto.order = screen.order;
            	
            	var noOfFields = screen.fields.length;
            	var fieldModelObj;
            	var fieldDtoObj;
            	
            	for (var i=0; i<noOfFields ; i++){
            		fieldModelObj = screen.fields[i];
            		fieldName = screen.fields[i].name;
            		fieldDtoObj = fieldEntryTransformer.fieldEntryToFieldEntryDTO(fieldModelObj);
            		//screenDto.fields.set(fieldName, fieldDtoObj);
            		screenEntryDto.fields[fieldName]=fieldDtoObj;
            	}
            	
            	return screenEntryDto;
            };
			
			this.getDTOToScreen = function(dto, name) {
				
				var screen = genericTransformer.DTOToObject(dto, Screen);
				screen.name = name;
				
				screen.fields = _.map(dto.fields, function(field, key) {
					return fieldTransformer.getDTOToField(field, key);
				});
				
				screen.fields = $filter('orderBy')(screen.fields, 'order');
				
				return screen;
			};
			
			this.getDTOToScreenEntry = function(dto, name) {
				
				var screen = genericTransformer.DTOToObject(dto, Screen);
				screen.name = name;
				
				screen.fields = _.map(dto.fields, function(field, key) {
					return fieldEntryTransformer.getDTOToFieldEntry(field, key);
				});
				
				screen.fields = $filter('orderBy')(screen.fields, 'order');
				
				return screen;
			};
           
        }
]);

})(angular.module('aet.domain.screen'));

