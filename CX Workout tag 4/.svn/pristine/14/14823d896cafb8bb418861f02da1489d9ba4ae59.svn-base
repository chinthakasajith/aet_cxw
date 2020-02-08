(function(module) {

  module.service('ScreenshotService', ['$q',
    function($q) {

      var pxTomm = function(px) {
        $("body").append("<div id='my_mm' style='height:1mm;display:none'></div>");
        return Math.floor(px / $('#my_mm').height()); //JQuery returns sizes in PX
      };

      this.capture = function() {

        return new Promise(function(resolve, reject) {
          html2canvas($("body"), {
            onrendered: function(canvas) {
              canvas.getContext('2d');
              var imgData = canvas.toDataURL('image/jpeg');

              var height = (pxTomm(canvas.height) * (110 / 100));
              var width =(pxTomm(canvas.width) * (110 / 100));
              var orientation = 'landscape';
              if(height > width){
                orientation = 'portrait';
              }

              var pdf = new jsPDF(orientation, 'mm', [ height , width]);
              pdf.addImage(imgData, 'JPEG', 0, 0);
              //pdf.save(projectData.title + " map.pdf");
              resolve(pdf);
            }
          });
        });
      };

    }
  ]);

})(angular.module('aet.screenshot'));
