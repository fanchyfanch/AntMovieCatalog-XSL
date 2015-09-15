"use strict";

AntMovieCatalog.controller("moviesController", function ($scope, $http, $filter, $modal, movieFactory) {
    var appConfig = [
        {id: '_OriginalTitle', sort: true, display: true, search: true},
        {id: '_TranslatedTitle', sort: true, display: true, search: true},
        {id: '_FormattedTitle', sort: false, display: false, search: false},
        {id: '_Picture', sort: false, display: true, search: true},
        {id: '_Year', sort: true, display: true, search: true},
        {id: '_Length', sort: true, display: true, search: true},
        {id: '_Country', sort: true, display: true, search: true},
        {id: '_Category', sort: true, display: true, search: true},
        {id: '_Director', sort: true, display: true, search: true},
        {id: '_Producer', sort: true, display: true, search: true},
        {id: '_Writer', sort: true, display: true, search: true},
        {id: '_Composer', sort: true, display: true, search: true},
        {id: '_Actors', sort: false, display: true, search: true},
        {id: '_Description', sort: false, display: true, search: true},
        {id: '_Comments', sort: false, display: true, search: true},
        {id: '_URL', sort: false, display: false, search: true},
        {id: '_Rating', sort: true, display: false, search: true},
        {id: '_UserRating', sort: true, display: true, search: true},
        {id: '_Number', sort: false, display: false, search: true},
        {id: '_Checked', sort: false, display: false, search: true},
        {id: '_ColorTag', sort: false, display: false, search: true},
        {id: '_Source', sort: false, display: false, search: true},
        {id: '_Date', sort: true, display: false, search: true},
        {id: '_DateWatched', sort: true, display: false, search: true},
        {id: '_VideoFormat', sort: true, display: true, search: true},
        {id: '_VideoBitrate', sort: true, display: true, search: true},
        {id: '_AudioFormat', sort: true, display: true, search: true},
        {id: '_AudioBitrate', sort: true, display: true, search: true},
        {id: '_Resolution', sort: true, display: true, search: true},
        {id: '_Framerate', sort: true, display: true, search: true},
        {id: '_Size', sort: true, display: true, search: true},
        {id: '_Disks', sort: false, display: false, search: false},
    ];

    /*
    Number
    Checked
    ColorTag
    Source
    Date
    DateWatched
    Rating
    UserRating
    OriginalTitle
    TranslatedTitle
    FormattedTitle
    Director
    Producer
    Writer
    Composer
    Actors
    Country
    Year
    Length
    Category
    URL
    Description
    Comments
    VideoFormat
    VideoBitrate
    AudioFormat
    AudioBitrate
    Resolution
    Framerate
    Size
    Disks
    Picture
    */

    var criteria = [
        '_OriginalTitle',
        '_TranslatedTitle',
//            '_FormattedTitle',
//            '_Picture',
        '_Year',
        '_Length',
//        '_Country',
        '_Category',
        '_Director',
        '_Producer',
        '_Writer',
        '_Composer',
//            '_Actors',
//            '_Description',
//            '_Comments',
//            '_URL',
//            '_Rating',
        '_UserRating',
//            '_Number',
//            '_Checked',
//            '_ColorTag',
//            '_Source',
//            '_Date',
//            '_DateWatched',
        '_VideoFormat',
        '_VideoBitrate',
        '_AudioFormat',
        '_AudioBitrate',
        '_Resolution',
        '_Framerate',
        '_Size',
//            '_Disks',
    ];

    //While this variable > 0, we display the loading spinner
    $scope.isSomethingLoading = 0;

    //When a request starts, isSomethingLoading is incremented
    $scope.isSomethingLoading++;

    // SET SORTING CRITERIA
    $scope.sortCriteria = [];
    $scope.sortCriteria.model = {id: '_TranslatedTitle'};
    $scope.sortCriteria.translateText = {buttonDefaultText: 'Select criteria'};
    $scope.sortCriteria.options = [];

    $scope.sortCriteria.settings = {
        showCheckAll: false,
        showUncheckAll: false,
        selectionLimit: 1,
        smartButtonMaxItems: 1,
        smartButtonTextConverter: function(itemText, originalItem) {
            return itemText;
        },
        scrollable: true,
    };

    for(var i = 0; i < criteria.length; i++){
        $scope.sortCriteria.options.push({id: criteria[i], label: $filter('translate')(criteria[i])});
    }

    //console.log($scope.sortCriteria);

    $scope.monoselect = [];
    $scope.monoselect.settings = {
        showCheckAll: false,
        showUncheckAll: false,
        selectionLimit: 1,
        smartButtonMaxItems: 1,
        smartButtonTextConverter: function(itemText, originalItem) {
            return itemText;
        },
        scrollable: true,
    };

    $scope.multiselect = [];
    $scope.multiselect.settings = {
        //displayProp: 'id',
        scrollable: true,
    };

    $scope.viewModel = [];
    $scope.viewModel.model = 'List';
    $scope.viewModel.options = [
        {id: 'List', label: 'List'},
        {id: 'Grid', label: 'Grid'},
        {id: 'Block', label: 'Block'}
    ];

   // console.log($scope.viewModel);

    $scope.uniqueLength = [];
    $scope.uniqueLength.model = [];
    $scope.uniqueLength.translateText = {buttonDefaultText: 'Select years'};
    $scope.uniqueLength.options = [];

    $scope.uniqueYears = [];
    $scope.uniqueYears.model = [];
    $scope.uniqueYears.translateText = {buttonDefaultText: 'Select years'};
    $scope.uniqueYears.options = [];

    $scope.uniqueCountry = [];
    $scope.uniqueCountry.model = [];
    $scope.uniqueCountry.translateText = {buttonDefaultText: 'Select country'};
    $scope.uniqueCountry.options = [];

    $scope.uniqueCategory = [];
    $scope.uniqueCategory.model = [];
    $scope.uniqueCategory.translateText = {buttonDefaultText: 'Select genre'};
    $scope.uniqueCategory.options = [];

    $scope.movies = [];
    $scope.filtered = [];

    movieFactory.fetch().success(function(data, status, headers, config){
        //When a request is done, isSomethingLoading is decremented
        $scope.isSomethingLoading--;
        var jsonedXML  = x2js.xml_str2json(data);
        $scope.movies = jsonedXML.AntMovieCatalog.Catalog.Contents.Movie;

        for(var i = 0; i < $scope.movies.length; i++){
            // set string value as numerical for decided field to insure compatibility
            $scope.movies[i]._Number        = parseFloat($scope.movies[i]._Number);         if(isNaN($scope.movies[i]._Number)) $scope.movies[i]._Number = '';
            $scope.movies[i]._UserRating    = parseFloat($scope.movies[i]._UserRating);     if(isNaN($scope.movies[i]._UserRating)) $scope.movies[i]._UserRating = '';
            $scope.movies[i]._Year          = parseFloat($scope.movies[i]._Year);           if(isNaN($scope.movies[i]._Year)) $scope.movies[i]._Year = '';
            $scope.movies[i]._Length        = parseFloat($scope.movies[i]._Length);         if(isNaN($scope.movies[i]._Length)) $scope.movies[i]._Length = '';
            $scope.movies[i]._VideoBitrate  = parseFloat($scope.movies[i]._VideoBitrate);   if(isNaN($scope.movies[i]._VideoBitrate)) $scope.movies[i]._VideoBitrate = '';
            $scope.movies[i]._AudioBitrate  = parseFloat($scope.movies[i]._AudioBitrate);   if(isNaN($scope.movies[i]._AudioBitrate)) $scope.movies[i]._AudioBitrate = '';
            $scope.movies[i]._Framerate     = parseFloat($scope.movies[i]._Framerate);      if(isNaN($scope.movies[i]._Framerate)) $scope.movies[i]._Framerate = '';
            $scope.movies[i]._Size          = parseFloat($scope.movies[i]._Size);           if(isNaN($scope.movies[i]._Size)) $scope.movies[i]._Size = '';

            /*
            // FORMAT SIZE field
            $scope.movies[i]._Size = $filter('bytes')($scope.movies[i]._Size * 1024 * 1024);

            // FORMAT FRAMERATE field
            $scope.movies[i]._Framerate = $filter('number')($scope.movies[i]._Framerate, 0);
             */

            // GET UNIQUE COUNTRIES
            if($scope.movies[i]._Country == undefined) $scope.movies[i]._Country = '';
            $scope.movies[i]._Country = $scope.movies[i]._Country.toLowerCase();
            var countriesArray = $scope.movies[i]._Country.split(','); // convert input as array (even of a single element)

            // loop through all elements
            for(var y = 0; y < countriesArray.length; y++){
                if(countriesArray[y].trim() != '') $scope.uniqueCountry.options.push({id: countriesArray[y].trim(), label: ucfirst(countriesArray[y].trim())});
            }

            // GET UNIQUE CATEGORIES
            if($scope.movies[i]._Category == undefined) $scope.movies[i]._Category = '';
            $scope.movies[i]._Category = $scope.movies[i]._Category.toLowerCase();
            var categoriesArray = $scope.movies[i]._Category.split(','); // convert input as array (even of a single element)

            // loop through all elements
            for(var x = 0; x < categoriesArray.length; x++){
                if(categoriesArray[x].trim() != '') $scope.uniqueCategory.options.push({id: categoriesArray[x].trim(), label: ucfirst(categoriesArray[x].trim())});
            }

            // GET UNIQUE YEARS
            $scope.uniqueYears.options.push({id: $scope.movies[i]._Year});

            // GET UNIQUE LENGTH
            $scope.uniqueLength.options.push({id: $scope.movies[i]._Length});
        }

        $scope.uniqueCountry.options    = $scope.uniqueCountry.options.uniqueObjects(['id']).sort(dynamicSort('id'));
        $scope.uniqueCategory.options   = $scope.uniqueCategory.options.uniqueObjects(['id']).sort(dynamicSort('id'));
        $scope.uniqueYears.options      = $scope.uniqueYears.options.uniqueObjects(['id']).sort(dynamicSort('id'));
        $scope.uniqueLength.options     = $scope.uniqueLength.options.uniqueObjects(['id']).sort(dynamicSort('id'));

        //console.log($scope.uniqueYears.options.uniqueObjects(['id']).sort(dynamicSort('id')));
        //console.log($scope.uniqueLength.options);
        //console.log($scope.sortCriteria);


        for(var key in $scope.uniqueCountry.options){
            if($scope.uniqueCountry.options[key].id != undefined){
                $scope.uniqueCountry.model.push({id: $scope.uniqueCountry.options[key].id});
            }
        }

        for(var key in $scope.uniqueCategory.options){
            if($scope.uniqueCategory.options[key].id != undefined){
                $scope.uniqueCategory.model.push({id: $scope.uniqueCategory.options[key].id});
            }
        }

        $scope.filtered = $scope.movies;



        $scope.uniqueCategorysearch = function(value, index){
            var categories = [];
            var inputs     = value._Category.split(',');
            for(var key in $scope.uniqueCategory.model){
                if($scope.uniqueCategory.model[key].id) categories.push($scope.uniqueCategory.model[key].id);
            }

            var output = -1;
            for(var i = 0; i < inputs.length; i++){
                inputs[i] = inputs[i].trim();
                if(categories.indexOf(inputs[i]) !== -1) output++;
            }

            /*
            console.log(inputs);
            console.log(categories);
            console.log(output);
            console.log(output !== -1);
            console.log("\n");
            */
            return output !== -1;
        };

        $scope.uniqueCountrysearch = function(value, index){
            var countries = [];
            var inputs     = value._Country.split(',');
            for(var key in $scope.uniqueCountry.model){
                if($scope.uniqueCountry.model[key].id) countries.push($scope.uniqueCountry.model[key].id);
            }

            var output = -1;
            for(var i = 0; i < inputs.length; i++){
                inputs[i] = inputs[i].trim();
                if(countries.indexOf(inputs[i]) !== -1) output++;
            }

            return output !== -1;
        };


        $scope.perPage = [];
        $scope.perPage.model = {id: 50};
        $scope.perPage.translateText = {buttonDefaultText: 'Select per page'};
        $scope.perPage.settings = {
            showCheckAll: false,
            showUncheckAll: false,
            selectionLimit: 1,
            smartButtonMaxItems: 1,
            smartButtonTextConverter: function(itemText, originalItem) {
                return itemText;
            },
            scrollable: true,
        };
        $scope.perPage.options = [
            {id: $scope.filtered.length, label: 'All'},
            {id: 1, label: 1},
            {id: 2, label: 2},
            {id: 5, label: 5},
            {id: 10, label: 10},
            {id: 25, label: 25},
            {id: 50, label: 50},
            {id: 100, label: 100}
        ];





        $scope.uniqueYears.model = [];

        if($scope.uniqueYears.options[0].id == '') $scope.uniqueYears.options.shift();
        $scope.uniqueYears.options = {
            min: parseInt($scope.uniqueYears.options[0].id),
            max: parseInt($scope.uniqueYears.options[$scope.uniqueYears.options.length - 1].id),
        };

        $scope.uniqueYearsearch = function(value, index){
            if(value._Year < $scope.uniqueYears.model[0] || value._Year > $scope.uniqueYears.model[1]) return false;
            return true;
        };

        $scope.uniqueLength.model = [];
        $scope.uniqueLength.options = {
            min: parseInt($scope.uniqueLength.options[0].id),
            max: parseInt($scope.uniqueLength.options[$scope.uniqueLength.options.length - 1].id),
        };

        $scope.uniqueLengthsearch = function(value, index){
            if(value._Length < $scope.uniqueLength.model[0] || value._Length > $scope.uniqueLength.model[1]) return false;
            return true;
        };




        //console.log($scope.filtered);



        //console.log($scope.uniqueYears);
        //console.log($scope.uniqueYears);
        //console.log(data, status, headers, config);
        //console.log($scope.movies);
        //console.log($scope.uniqueCategory.model);
        //console.log($scope.filtered);
    }).error(function(data, status, headers, config) {
        console.log("No data found..");
    });

    // A function to do some act on paging click
    // In reality this could be calling a service which
    // returns the items of interest from the server
    // based on the page parameter
    $scope.DoCtrlPagingAct = function(text, page, pageSize, total){
        console.log({text, page, pageSize, total});
    };

    $scope.countriesList = [];
    $http.get('./assets/json/country.json').success(function(data){
        angular.forEach(data, function(item, field, data){
            data[field] = item.toLowerCase();
            //console.log(field);
            //console.log(item);
            //console.log("\n");
        });
        $scope.countriesList = data;
        //console.log($scope.countriesList);
    });






    // Modal system
    $scope.animationsEnabled = true;

    $scope.open = function (selectedMovie) {
        //console.log(selectedMovie);
      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'myModalContent.html',
        controller: 'ModalInstanceCtrl',//['$scope', 'ModalInstanceCtrl', 'selectedMovie'],
        size: 'lg',
        resolve: {
            movie: function () {
                return selectedMovie;
            }
        }
      });
    };

    $scope.toggleAnimation = function () {
      $scope.animationsEnabled = !$scope.animationsEnabled;
    };
});



// UI.Boostrap - Star Rating
AntMovieCatalog.controller('MovieRatingController', function ($scope) {
  $scope.rate = $scope.movie._UserRating;
  $scope.max = 10;
  $scope.isReadonly = true;

  $scope.hoveringOver = function(value) {
    $scope.overStar = value;
    $scope.percent = 100 * (value / $scope.max);
  };
});


// UI.Bootstrap - Toggle box
AntMovieCatalog.controller('MovieCollapseController', function ($scope) {
  $scope.isCollapsed = true;
});

/*

movieApp.controller('editMovieController', function($scope, Movie, $routeParams, $location){

    var movieId = $routeParams.id;

    Movie.fetchOne(movieId).success(function(movie){
        $scope.movie = movie;
    });

    $scope.updateMovie = function(movie){
        Movie.update(movie)
            .success(function(){
                $location.path('/movies');
            })
            .error(function(resp){
                console.log(resp);
            });
    };
});

*/
AntMovieCatalog.controller("movieFormController" ,function ($scope) {
    /*
    $scope.showAlert = false;

    $scope.addMovie = function(movie){
        Movie.create(movie)
            .success(function(){
                var newMovie = {};
                angular.copy(movie, newMovie);
                $scope.movies.push(newMovie);
                $scope.movie = {};
            })
    };
    */
});


// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

AntMovieCatalog.controller('ModalInstanceCtrl', function ($scope, $modalInstance, movie) {

    $scope.movie = movie;

  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});






/*
var filterMod = angular.module('angularDemo', []).controller('angularController', function($scope) {
  //sample data
  var products = [];
  var product1 = {
    name:'apple',
    properties: [
      {name:'type',value:'fruit'},{name:'color', value:'red'},
      {name:'size',value:'medium'},{name:'shape',value:'weird'}
    ]
  };
  var product2 = {
    name:'orange',
    properties:[
      {name:'type',value:'fruit'},{name:'color',value:'orange'},
      {name:'size',value:'medium'},{name:'shape',value:'sphere'}
    ]
  };
  var product3 = {
    name:'grapefruit',
    properties: [
      {name:'type',value:'fruit'},{name:'color',value:'yellow'},
      {name:'size',value:'large'},{name:'shape',value:'sphere'}
    ]
  };
  var product4 = {
    name:'lemon',
    properties: [
      {name:'type',value:'fruit'},{name:'color',value:'yellow'},
      {name:'size',value:'small'},{name:'shape',value:'lemon'}
    ]
  };
  var product5 = {
    name:'lime',
    properties: [
      {name:'type',value:'fruit'},{name:'color',value:'green'},
      {name:'size',value:'small'},{name:'shape',value:'lemon'}
    ]
  };

  var product6 = {
    name:'pepper',
    properties: [
      {name:'type',value:'vegetable'},{name:'color',value:'red'},
      {name:'size',value:'medium'},{name:'shape',value:'weird'}
    ]
  };
  products.push(product1);
  products.push(product2);
  products.push(product3);
  products.push(product4);
  products.push(product5);
  products.push(product6);

  $scope.Fruits = products;

  //create checkbox filters on the fly
  var filters = [];
  _.each(products, function(product){
    _.each(product.properties,function(property){
      var existingfilter = _.findWhere(filters, { name: property.name });
        if(!existingfilter){
        var filter = {};
        filter.name = property.name;
        filter.values = [];
        filter.values.push({value: property.value});
        filters.push(filter);
      }else{
        var existingoption = _.findWhere(existingfilter.values, { value: property.value });
        if(!existingoption){
           existingfilter.values.push({value: property.value});
        }
      }
    });
  });
  $scope.Filters = filters;

});

filterMod.filter('dynamicFilter', function () {
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
*/