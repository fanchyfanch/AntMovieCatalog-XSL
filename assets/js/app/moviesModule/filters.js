"use strict";


AntMovieCatalog.filter('sanitize', function(){
    return function(string){
        return string.replace(/_/g, '');
    }
});

AntMovieCatalog.filter('poster', function () {
    return function(posterUrl) {
        if(!posterUrl){
            return "assets/img/no-poster.jpg";
        } else {
            return posterUrl.replace(/\\/g, '/');
        }
    };
});

AntMovieCatalog.filter('comments', function(){
    return function(string){
        return string.replace(/(\|)/g, "<br/>\n");
    }
});

AntMovieCatalog.filter('bytes', function(){
    return function(input) {
          var out = "";
          var size = parseInt(input);
          if (isNaN(size)) return "0";
          var unit = ["o","Ko","Mo","Go","To"];
          var i = 0;
          while (size >= 1024) {
              i++;
              size = size/1024;
          }
          out = size.toFixed(2) + ' ' + unit[i];
          return out;
        }
});

AntMovieCatalog.filter('minutesToDateTime', function() {
    return function(seconds) {
        return new Date(1970, 0, 1).setMinutes(seconds);
    };
});

AntMovieCatalog.filter('country', function(){
    return function(countries, countriesList){
        var output  = '';
        var asArray = countries.split(','); // convert input as array (even of a single element)

        // loop through all elements
        for (var i = 0; i < asArray.length; i++){
            asArray[i] = asArray[i].trim();
            var countryCode = countriesList.hasOwnValue(asArray[i].toLowerCase());
            /*
            console.log(countriesList);
            console.log(countryCode);
            console.log(asArray[i]);
            console.log("\n");
            */
            output += '<li class="flag ';
            if(countryCode) output += countryCode.toLowerCase();

            output += '" title="' + asArray[i] + '"><span>' + asArray[i] + '</span></li>';
        }

        return output;
    }
});

AntMovieCatalog.filter('resolution', function(){
    return function(resolution){
        if(resolution == undefined) return false;
        var width  = resolution.substring(0, resolution.lastIndexOf('x'));
        var height = resolution.substring(resolution.lastIndexOf('x') + 1, resolution.length);

        resolution += ' (' + ratio(width, height) + ')';
        return resolution;
    }
});

AntMovieCatalog.filter('highlight', function(){
    return function (text, search, caseSensitive) {
        if (text && (search || angular.isNumber(search))) {
            text = text.toString();
            search = search.toString();
            if (caseSensitive) {
                return text.split(search).join('<span class="ui-match">' + search + '</span>');
            } else {
                return text.replace(new RegExp(search, 'gi'), '<span class="ui-match">$&</span>');
            }
        } else {
            return text;
        }
    }
});








AntMovieCatalog.filter('dynamicFilter', function (){
    return function (products, filterCategories, scope) {
        var filtered = [];

        var productFilters = _.filter(filterCategories, function(fc) {
            return  _.any(fc.values, { 'IsIncluded': true });
        });

        _.each(products, function(prod) {
            var includeProduct = true;
            _.each(productFilters, function(filter) {
                var props = _.filter(prod.properties, { 'name': filter.name });
                if (!_.any(props, function(prop) { return _.any(filter.values, { 'value': prop.value, 'IsIncluded': true }); })){
                    includeProduct = false;
                }
            });

            if (includeProduct) {
                filtered.push(prod);
            }
        });
        return filtered;
    };
});
