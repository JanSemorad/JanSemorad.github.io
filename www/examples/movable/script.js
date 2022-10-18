(function(angular) {
  'use strict';
angular.module('dragModule', [])
  .directive('appMovable', ['$document', function($document) {
    var zIndex = 100
    var newDrag = false
    return {
      link: function(scope, element, attr) {
        var startX = 0, startY = 0, x = 0, y = 0;
        var phase = null

        element.css({
         position: 'relative',
         border: '1px solid red',
         backgroundColor: 'lightgrey',
         cursor: 'pointer',
         "zIndex":100
        });

        element.on('mousedown', function(event) {
          // Prevent default dragging of selected content
          //phase="down"
          newDrag = true
          element.css({
         border: '1px solid blue',
         backgroundColor: 'lightyellow'
        });
          
          event.preventDefault();
          startX = event.pageX - x;
          startY = event.pageY - y;
          $document.on('mousemove', mousemove);
          $document.on('mouseup', mouseup);
        });

        function mousemove(event) {
          //phase="drag"
          y = event.pageY - startY;
          x = event.pageX - startX;
          element.css({
            top: y + 'px',
            left:  x + 'px'
          });
          if(newDrag){
            newDrag = false
            element.css({
               zIndex: ++zIndex  // max 2147483647
            });
          }
        }

        function mouseup() {
          //phase="drop"
          $document.off('mousemove', mousemove);
          $document.off('mouseup', mouseup);
        }
      }
    };
  }]);
})(window.angular);

/*
Copyright 2019 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/









































