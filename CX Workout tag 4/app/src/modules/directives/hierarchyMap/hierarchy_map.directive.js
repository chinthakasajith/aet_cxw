/**
 * Created by supun.s on 06/08/2015.
 */
(function (module) {

  module.directive("editHierarchyMap", ['$log',
    function ($log) {
      return {
        restrict: 'E',
        scope: {
          addStageFn: "=",
          editStageFn: "=",
          addTouchpointFn: "=",
          editTouchpointFn: "=",
          addActionFn: "=",
          editActionFn: "=",
          deleteFn: "=",
          mapType: "@"
        },
        templateUrl: 'src/modules/directives/hierarchyMap/templates/edit_hierarchy_map.html',
        bindController: true,
        controller: "EditHierarchyMapCtrl as EditHierarchyMap",
        link: function (scope, element, attr) {

        }
      };
    }
  ])
    .directive("viewHierarchyMap", ['$log',
      function ($log) {
        return {
          restrict: 'E',
          scope: {
            mapType: "@",
            curveType: "@",
            export: "=",
            actionCtrl: "=",
            mapDataType: "="
          },
          templateUrl: 'src/modules/directives/hierarchyMap/templates/view_hierarchy_map.html',
          bindController: true,
          controller: "ViewHierarchyMapCtrl as ViewHierarchyMap",
          link: function (scope, element, attr) {
            scope.$watch('export', function (newVal, oldValue) {
              console.log(newVal)
            });
          }
        };
      }
    ])
    .directive('setPosition', function () {
      return {
        restrict: 'A',
        scope: {},
        link: function (scope, element, attr) {

        }
      }
    })
    .directive('pop', function () {
      return {
        restrict: 'A',
        scope: {},
        link: function (scope, element, attr) {
          element.bind('mouseenter', function () {
            if (attr.popLength < 15) {
              //element.next('.popover').hide();
            }
          });
        }
      }
    })
    .directive('actionChart', function () {
      return {
        restrict: 'A',
        scope: {},
        link: function (scope, element, attr) {

        }
      }
    })
    .directive('comment', ['HierarchyMapService', function (HierarchyMapService) {
      return {
        restrict: 'E',
        scope: {
          commentText: '=',
          type: '@'
        },
        link: function (scope, element, attr) {
          scope.comment = '';
          scope.more = false;
          var text = scope.commentText;

          scope.showMoreTxt = function () {
            HierarchyMapService.moreCommentTxt(text);
            console.log('test')
          };

          if (text.length > attr.limit) {
            scope.comment = text.slice(0, attr.limit) + '...';
            scope.more = true
          } else {
            scope.comment = text;
            scope.more = false
          }


        },
        templateUrl: 'src/modules/directives/hierarchyMap/templates/assets/comment.html'
      }
    }])
    .directive('actionSummary', function () {
      return {
        restrict: 'E',
        scope: {
          actionData: '=',
          stageData: '=',
          touchpointData: '=',
          averageColorFn: '=',
          closeActionDetailsFn: '=',
          curveType: '@',
        },
        controller : 'MapActionSummaryCtrl as MapActionSummary',
        link: function (scope, element, attr) {
          scope.options = {
            colours: [
              {
                fillColor: ["#c6000a", "#de6a70", "#96a1a1", "#bbe88e", "#9bce67"]
              }
            ],
            listOfLocations: ['1', '2', '3', '4', '5'],
            options: {
              barShowStroke: false,
              scaleOverlay: true,
              scaleOverride: false,
              scaleShowLabels: true,
              scaleLineColor: 'rgba(0,0,0,0.5)',
              scaleGridLineColor: "rgba(0,0,0,.05)",
              scaleShowHorizontalLines: true,
              scaleShowVerticalLines: false,
              scaleGridLineWidth: 5,
              barValueSpacing: 6,
              //maintainAspectRatio: false
            }
          };
        },
        templateUrl: 'src/modules/directives/hierarchyMap/templates/assets/action-summary.html'

      }

    })
    .directive('mapLabel', function () {
      return {
        restrict: 'A',
        scope: {
          label : '@'
        },
        link: function (scope, element, attr) {
          var label = scope.label;
          var c = element[0];
          var context = c.getContext("2d");
          context.translate( c.width / 2, c.height / 2 );
          context.rotate( Math.PI / -2 );
          context.font = "12px Arial";
          context.fillStyle = "#ffffff"; // green
          context.textAlign = "center";
          context.fillText( label, 0, 0 );
        }
      }
    })
    .directive('imgType', function(){
      return {
        restrict: 'E',
        scope: {
          image : '=',
          time : '='
        },
        link: function (scope, element, attr) {

          var date = new Date();
          var timeNow = date.getTime();
          var millisecondsForHour = 86400000;
          var uploadTime = scope.time;

          function isNew (time){
            if((timeNow - time) <= millisecondsForHour) {
              return 'new';
            }
          }

          var fileName = scope.image;
          var ext = fileName.split('.').pop();
          ext.toLowerCase();
          var type;

          switch (ext){
            case 'jpg' :
            case 'gif' :
            case 'jpeg' :
            case 'png' :
            case 'ico' :
            case 'svg' :
            case 'tiff' :
              type = 'image';
              break;

            case 'aaf' :
            case '3gp' :
            case 'avi' :
            case 'mp4' :
            case 'wmv' :
            case 'mov' :
              type = 'video';
              break;

            case 'mp3' :
            case 'wma' :
            case 'cda' :
            case 'wav' :
            case 'amr' :
            case 'ima4' :
              type = 'audio';
              break;

            default :
              type = 'file';
              break
          }

          element.append('<div class="type ' + type +' ' + isNew(uploadTime) + '"></div>')
        }
      }
    })
})(angular.module('aet-directives-hierarchyMap'));
