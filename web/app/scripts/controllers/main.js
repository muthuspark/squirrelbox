//     Copyright (c) 2016-2017 Muthukrishnan muthu.com
//     MIT License - http://opensource.org/licenses/mit-license.php
'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webApp
 */
angular.module('webApp')
    .controller('MainCtrl', function($scope, $http, $routeParams) {
        var userid = $routeParams.userid;
        $scope.records = [];
        $http.get('http://localhost:8070/data/' + userid).then(function(response) {
            $scope.records = response.data;
        });

        $scope.removepost = function(postid, index) {
            $http.delete('http://localhost:8070/data/' + userid + '/' + postid).then(function(response) {
                if (response.status == 200) {
                    $scope.records.splice(index, 1);
                }
            });
        }
    });
