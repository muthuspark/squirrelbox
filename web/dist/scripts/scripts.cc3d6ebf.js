"use strict";angular.module("webApp",["ngRoute","ngSanitize"]).config(["$routeProvider",function(a){a.when("/:userid",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).otherwise({redirectTo:"/"})}]),angular.module("webApp").controller("MainCtrl",["$scope","$http","$routeParams",function(a,b,c){var d=c.userid;a.records=[],b.get("/data/"+d).then(function(b){a.records=b.data}),a.removepost=function(c,e){b.delete("/data/"+d+"/"+c).then(function(b){200==b.status&&a.records.splice(e,1)})}}]),angular.module("webApp").run(["$templateCache",function(a){a.put("views/main.html",'<div class="header"> <div class="navbar navbar-default" role="navigation"> <div class="container"> <div class="row"> <div class="collapse navbar-collapse" id="js-navbar-collapse"> <div class="text-center logo"><img src="images/squirell.c199a6e4.png"> <p>Squirrel Box</p> </div> <div class="form-group"> <input type="text" ng-model="searchText" class="form-control" placeholder="Search"> </div> </div> </div> </div> </div> </div> <div class="container"> <div class="row"> <div class="col-sm-3" ng-repeat="rec in records | filter:searchText"> <h3><a href ng-click="removepost(rec.value.ts, $index)"><span class="glyphicon glyphicon-remove"></span></a><a href="{{rec.value.pg}}">{{rec.value.tt}}</a></h3> <p>{{rec.value.tx}}</p> </div> </div> </div>')}]);