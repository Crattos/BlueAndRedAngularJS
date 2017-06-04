(function() {
'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', function() {
  this.currentPlayer = player;
  this.winner = "";
  this.myFields = JSON.parse(JSON.stringify(fields));

  this.isWinner = false;
    this.switchPlayer = function(){
       if(this.currentPlayer == 1)
          this.currentPlayer=2;
      else
          this.currentPlayer = 1;
      player=this.currentPlayer;
    };
    this.setField = function(index){
        this.myFields[index].player =this.currentPlayer;
        this.myFields[index].checked = true;
        this.setWinner();
        this.switchPlayer();
        console.log(this.myFields);
    };

    this.setWinner = function(){
       
        for (var i=0; i<9; i++) {
          if(this.myFields[i].player != -1 ){
            if(i<3)
              if(this.myFields[i].player == this.myFields[i+3].player && this.myFields[i].player == this.myFields[i+6].player){
                this.isWinner = true;
                this.winner = this.myFields[i].player;
              }
            if(i==0 || i==3 || i==6){
              if(this.myFields[i].player == this.myFields[i+1].player && this.myFields[i].player == this.myFields[i+2].player){
                this.isWinner = true;
                this.winner = this.myFields[i].player;
              }
            }
            if(i==0)
              if(this.myFields[i].player == this.myFields[i+4].player && this.myFields[i].player == this.myFields[i+8].player){
                this.isWinner = true;
                this.winner = this.myFields[i].player;
              }
            if(i==2)
               if(this.myFields[i].player == this.myFields[i+2].player && this.myFields[i].player == this.myFields[i+4].player){
                  this.isWinner = true;
                  this.winner = this.myFields[i].player;
               }
          }
        }
    };

    this.restartGame = function(){
      this.myFields.clear;
      this.myFields.length = 0;
      this.myFields = JSON.parse(JSON.stringify(fields));
      this.isWinner = false;
      this.currentPlayer = 1;
      console.log(this.myFields);
    };
})

.directive('gameTable', function(){
  return{
    restrict: 'E',
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl',
    controllerAs: 'battlefield'
  }
})

.directive('myCheckbox', function() {
    return {
        restrict : 'EA',
        template : '<div class="my-checkbox" ng-disabled="true"></div>',
        replace : true,
        require : 'ngModel',
        scope: {
          id: '@',
          ngModel: '='
          
    },
    link: function(scope, element, attrs){
      
      element.bind('click', function(){
          if(player ==1)
            element.toggleClass('red');
          if(player ==2)
            element.toggleClass('blue');
        
       });
    }
    };
});

var player = 1;


var fields = [
  {
    number:1,
    player:-1,
    checked:false
  },
  {
    number:2,
    player:-1,
    checked:false
  },
  {
    number:3,
    player:-1,
    checked:false
  },
  {
    number:4,
    player:-1,
    checked:false
  },
  {
    number:5,
    player:-1,
    checked:false
  },
  {
    number:6,
    player:-1,
    checked:false
  },
  {
    number:7,
    player:-1,
    checked:false
  },
   {
    number:8,
    player:-1,
    checked:false
  },
  {
    number:9,
    player:-1,
    checked:false
  }
];
})();