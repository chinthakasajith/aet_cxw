(function(module) {

  module.service('genericTransformer', ['$log',
    function($log) {

      this.objectToDTO = function(obj, objDTO) {
        var dto = new objDTO();
        for (var key in dto) {
          if (dto.hasOwnProperty(key) && angular.isUndefined(dto[key]) && obj[key] !== null)
            dto[key] = obj[key];
        }
        return dto;
      };

      this.DTOToObject = function(objDTO, obj) {
        var object = new obj();
        for (var key in object) {
          if (object.hasOwnProperty(key) && objDTO[key] !== null)
            object[key] = objDTO[key];
        }
        return object;
      };
    }
  ]);

})(angular.module('aet.domain.generic'));
