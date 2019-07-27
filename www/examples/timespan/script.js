var app = angular.module('app', []);
app.directive('timeSpan', function($compile) {
//    template: '<table style="background-color:lightgray" ng-click="onchange()"  ng-keypress="onchange()" border="0px" cellspacing=0 cellpadding=3><tr><td ng-click="changeSign()" title=sign>' + '<span ng-show="sign==\'plus\'">+</span><span style="font-size:x-large" ng-show="sign==\'minus\'"><b> - </b></span></td>' + '<td title=days><input locator=days ng-change="onchange()" type="number" ng-model="days" min="0"  step="1"' + 'style="width: 40px;text-align: right;"></td><td>.</td>' + '<td title=hours><input  locator=hours ng-change="onchange()" type="number" ng-model="hours" maxlength="2" min="0" max="23" step="1"' + 'style="width: 40px;text-align: right;"></td><td>:</td>' + '<td title=minutes><input  locator=minutes ng-change="onchange()" type="number" ng-model="minutes" maxlength="2" min="0" max="59" step="1"' + 'style="width: 40px;text-align: right;"></td><td>:</td>' + '<td title=seconds><input  locator=seconds pattern="[0-9][0-9]" ng-change="onchange()" type="number" ng-model="seconds" maxlength="2" min="0" max="59" step="1"' + 'style="width: 40px;text-align: right;"></td><td><button ng-show="timeSpanIsNull"  ng-click="setToNotNull()" >{{toNotNullMessage}}</button><button ng-show="!timeSpanIsNull" ng-click="setToNull()">{{toNullMessage}}</button></td></tr></table>',
//              <p>timeSpanIsNull: {{timeSpanIsNull}}</p>
  return {
    restrict: 'E',
    scope: {
      timeSpan: "=value"
    },
    template: '<table><tr><td><table  ng-show="!timeSpanIsNull" style="background-color:lightgray" ng-click="onchange()"  ng-keypress="onchange()" border="0px" cellspacing=0 cellpadding=3><tr><td ng-click="changeSign()" title=sign>' + '<span ng-show="sign==\'plus\'">+</span><span style="font-size:x-large" ng-show="sign==\'minus\'"><b> - </b></span></td>' + '<td title=days><input locator=days ng-change="onchange()" type="number" ng-model="daysX"  onchange="$(this).parent().click()" onkeyup="$(this).parent().click()"  min="0"  step="1"' + 'style="width: 40px;text-align: right;"></td><td>d</td>' + '<td title=hours><input  locator=hours ng-change="onchange()" type="number"  onchange="$(this).parent().click()" onkeyup="$(this).parent().click()"  ng-model="hoursX" maxlength="2" min="0" max="23" step="1"' + 'style="width: 40px;text-align: right;"></td><td>:</td>' + '<td title=minutes><input  locator=minutes ng-change="onchange()" type="number"  onchange="$(this).parent().click()" onkeyup="$(this).parent().click()"  ng-model="minutesX" maxlength="2" min="0" max="59" step="1"' + 'style="width: 40px;text-align: right;"></td><td>:</td>' + '<td title=seconds><input  locator=seconds ng-change="onchange()" type="number" onchange="$(this).parent().click()" onkeyup="$(this).parent().click()" ng-model="secondsX" maxlength="2" min="0" max="59" step="1"' + 'style="width: 40px;text-align: right;"></td></tr></table></td><td>&nbsp;&nbsp;<button ng-show="timeSpanIsNull"  ng-click="setToNotNull()" ><b>{{nullMessage}}</b>, {{toNotNullMessage}}</button><button ng-show="!timeSpanIsNull" ng-click="setToNull()">{{toNullMessage}}</button></td></tr></table>',
    controller: function($scope, $element, $timeout, $attrs) {
      $scope.myElement = $element
      var viewInputs = $scope.myElement.find("input")
      $scope.toNotNullMessage = $attrs.toNotNullMessage
      if(!$scope.toNotNullMessage){$scope.toNotNullMessage="set value"}
      $scope.toNullMessage = $attrs.toNullMessage
      if(!$scope.toNullMessage){$scope.toNullMessage="clear value"}
      $scope.nullMessage = $attrs.nullMessage
      if(!$scope.nullMessage){$scope.nullMessage="null value"}
      
      //debug
      window.d_attr = $attrs //d_   debug 
      window.d_viewInputs = viewInputs
      window.d_scope = $scope
      
      $scope.setToNull = function(){
        $scope.timeSpanIsNull = true
        $scope.timeSpanUndo = $scope.timeSpan           // updated 2014 05 07
        $scope.timeSpan = null
        $scope.timeSpanLastInternal = $scope.timeSpan   // updated 2014 05 07
      }      
      $scope.setToNotNull = function(){
        $scope.timeSpanIsNull = false
        $scope.timeSpan = $scope.timeSpanUndo           // updated 2014 05 07
          if(!$scope.timeSpan){
            $scope.timeSpan = "0.0:0:0"
          }
        $timeout(function() {$scope.externalChange(), 10})
      }
      
      $scope.externalChange = function () {
        if(!$scope.timeSpan){
          $scope.timeSpan = null
          $scope.timeSpanIsNull = true
          return
        }else{
          $scope.timeSpanIsNull = false
          if(!$scope.timeSpan){
            $scope.timeSpan = "0.0:0:0"
          }
        }
        //ini
        $scope.sign = "plus"
        $scope.daysPrevious = 0
        $scope.hoursPrevious = 0
        $scope.minutesPrevious = 0
        $scope.secondsPrevious = 0
        $scope.timeSpan = "" + $scope.timeSpan
        //parse values
        var parts
        //days?
        if ($scope.timeSpan.indexOf('.') === -1) {
          //no days
          $scope.days = 0
          parts = $scope.timeSpan.split(":")
        } else {
          //set days
          parts = $scope.timeSpan.split(".")
          $scope.days = parts[0]
          if (isNaN($scope.days)) {
            $scope.days = 0
          }
          if ($scope.days < 0) {
            $scope.sign = "minus"
            $scope.days = -$scope.days
          }
          parts = parts[1].split(":")
        }
        //hours, minutes, seconds
        if (parts.length != 3) {
          //error
          $scope.hours = 0
          $scope.minutes = 0
          $scope.seconds = 0
        } else {
          $scope.hours = parts[0]
          $scope.minutes = parts[1]
          $scope.seconds = parts[2]
          if (isNaN($scope.hours)) {
            $scope.hours = 0
          }
          if (isNaN($scope.minutes)) {
            $scope.minutes = 0
          }
          if (isNaN($scope.seconds)) {
            $scope.seconds = 0
          }
          if ($scope.hours < 0) {
            $scope.sign = "minus"
            $scope.hours = -$scope.hours
          }
        }
        $scope.verifyValues()
        viewInputs[0].value = $scope.days
        viewInputs[1].value = $scope.hours
        viewInputs[2].value = $scope.minutes
        viewInputs[3].value = $scope.seconds

      }

      $scope.onchange = function() {
        var signChar = $scope.sign == "plus" ? "" : "-"

        $scope.days = 1 * viewInputs[0].value
        $scope.hours = 1 * viewInputs[1].value
        $scope.minutes = 1 * viewInputs[2].value
        $scope.seconds = 1 * viewInputs[3].value


        if ($scope.days === null) {
          $scope.days = $scope.daysPrevious
        }
        if ($scope.hours === null) {
          $scope.hours = $scope.hoursPrevious
        }
        if ($scope.minutes === null) {
          $scope.minutes = $scope.minutesPrevious
        }
        if ($scope.seconds === null) {
          $scope.seconds = $scope.secondsPrevious
        }

        if ($scope.days === undefined) {
          $scope.days = 0
        }
        if ($scope.hours === undefined) {
          $scope.hours = 0
        }
        if ($scope.minutes === undefined) {
          $scope.minutes = 0
        }
        if ($scope.seconds === undefined) {
          $scope.seconds = 0
        }
        
        $scope.verifyValues()
        
        $scope.daysPrevious = $scope.days
        $scope.hoursPrevious = $scope.hours
        $scope.minutesPrevious = $scope.minutes
        $scope.secondsPrevious = $scope.seconds
        
        viewInputs[0].value = $scope.days
        viewInputs[1].value = $scope.hours
        viewInputs[2].value = $scope.minutes
        viewInputs[3].value = $scope.seconds

        $scope.timeSpan = "" + signChar + $scope.days + "." + $scope.hours + ":" + $scope.minutes + ":" + $scope.seconds
        $scope.timeSpanLastInternal = $scope.timeSpan
      }
      
      $scope.changeSign = function() {
        if ($scope.sign == "plus") {
          $scope.sign = "minus"
        } else {
          $scope.sign = "plus"
        }
      }

      $timeout(function() { $scope.externalChange()  })
      
      $scope.$watch("timeSpan",function(newValue, oldValue){
        if($scope.timeSpanLastInternal===newValue){
          //skip internal changes
        }else{
          //do external changes
          $timeout(function(){
                      $scope.externalChange()
                      $scope.onchange()                 // updated 2014 05 07
                   }
                   ,10)
        }
      })
      
      $scope.verifyValues = function(){
        if ($scope.days < 0 ) {         $scope.days = 0        }
        if ($scope.hours < 0 ) {        $scope.hours = 0        }
        if ($scope.minutes < 0 ) {      $scope.minutes = 0        }
        if ($scope.seconds < 0 ) {      $scope.seconds = 0        }
        if ($scope.hours > 23 ) {       $scope.hours = 23        }
        if ($scope.minutes > 59 ) {      $scope.minutes = 59        }
        if ($scope.seconds > 59 ) {      $scope.seconds = 59       }
      }
    }
  };
});

app.controller('ctrl', function($scope) {
  $scope.timeSpan = "1.2:3:4"
  $scope.timeSpanUpdate = "11.22:33:44"
  $scope.helloMessage = 'timeSpan picker';
});