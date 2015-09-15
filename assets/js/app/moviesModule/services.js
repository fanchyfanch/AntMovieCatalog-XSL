"use strict";

AntMovieCatalog.factory("movieFactory", function ($http) {
    //var API_URI = './out.xml';
    var API_URI = './AntMovieCatalog.xml';

    return {
        fetch : function() {
            return $http.get(API_URI);
        },

        create : function(movie) {
            return  $http.post(API_URI, movie);
        },

        remove  : function(id) {
            return $http.delete(API_URI + '/' + id);
        },

        fetchOne : function(id) {
            return $http.get(API_URI + '/' + id);
        },

        update : function(movie) {
             return $http.put(API_URI, movie);
        }
    };
});