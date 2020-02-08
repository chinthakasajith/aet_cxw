(function(module) {
    
    module.service('ScreenDTO', [function() {

        function ScreenDTO() {

            this.label = undefined;
            this.order = undefined;
            //this.fields = new Map();
            this.fields = {};
            
        }

        return ScreenDTO;

    }]);

})(angular.module('aet.domain.screen'));

