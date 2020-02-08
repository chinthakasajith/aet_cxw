(function (module) {

  module.controller('BubbleChartController', ['$scope',
    function ($scope) {
      $scope.options = {
        chart: {
          type: 'scatterChart',
          color: [
            "#c6000a",
            "#9bce67",
            "#96a1a1"
          ],
          height: 450,
          scatter: {
            onlyCircles: false
          },
          showDistX: false,
          showDistY: false,
          tooltipContent: function(d) {
              return d.series && '<h3>' + d.series[0].key + 'sadadsad</h3>';
          },
          transitionDuration: 350,
          xAxis: {
            axisLabel: 'X Axis',
            tickFormat: function(d){
              return d3.format('.02f')(d);
            },
            axisLabelDistance: 30
          },
          yAxis: {
            axisLabel: 'Y Axis',
            tickFormat: function(d){
              return d3.format('.02f')(d);
            },
            axisLabelDistance: 30
          },
          sizeRange : [1, 10000]
        }
      };
      $scope.data = generateData(3, 40);

      /* Random Data Generator (took from nvd3.org) */
      function generateData(groups, points) {
        var data = [],
          random = d3.random.normal();
        var colors =  [
          "#c6000a",
          "#9bce67",
          "#96a1a1"
        ];

        for (var i = 0; i < groups; i++) {
          data.push({
            key: 'Group ' + i,
            values: []
          });

          for (var j = 0; j < points; j++) {
            data[i].values.push({
              x: random()
              , y: random()
              , size: 10* Math.random()
              , color : colors[i]
            });
          }
        }
        return data;
      }

    }

  ]);

})(angular.module('aet.screens.bubblechart'));
