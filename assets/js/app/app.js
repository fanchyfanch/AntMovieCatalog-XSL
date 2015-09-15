"use strict";

var myApp = angular.module('myApp',[
    'ngRoute',
    'ngLocale',
    'ngSanitize',
    'AntMovieCatalog',
]);

myApp.config(function($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'assets/html/home.html',
            controller : 'homeController'
        })
        .when('/movies', {
            templateUrl: 'assets/html/movies.html',
            //controller : 'moviesController'
        })
        .when('/movies/edit/:id', {
            templateUrl: 'assets/html/edit.html',
            controller: 'editMovieController'
        })
        .otherwise({
            redirectTo: '/home'
        });
});

myApp.controller("homeController" ,function ($scope) {
    $scope.user = 'Fanchy Fanch';
});
