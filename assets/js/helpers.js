/*
    Analog method as the hasOwnProperty of the Object method
    This one can find an element by it's value
*/
Object.prototype.hasOwnValue = function(val) {
    for(var prop in this) {
        if(this.hasOwnProperty(prop) && this[prop] === val) {
            return prop;
        }
    }
    return false;
};

/*
    var uniqueName = list.uniqueObjects(["name"]);
    var uniqueAge = list.uniqueObjects(["age"]);
    var uniqueObject = list.uniqueObjects(["name", "age"]);
*/
Array.prototype.uniqueObjects = function (props) {
    function compare(a, b) {
      var prop;
        if (props) {
            for (var j = 0; j < props.length; j++) {
              prop = props[j];
                if (a[prop] != b[prop]) {
                    return false;
                }
            }
        } else {
            for (prop in a) {
                if (a[prop] != b[prop]) {
                    return false;
                }
            }

        }
        return true;
    }
    return this.filter(function (item, index, list) {
        for (var i = 0; i < index; i++) {
            if (compare(item, list[i])) {
                return false;
            }
        }
        return true;
    });
};

/*
    Sort object
 */
function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }

    return function(a, b){
        if(typeof a == 'string' && typeof b == 'string'){
            var result = a[property].localeCompare(b[property]);    // Allow to compare string with accent
        }else{
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        }
        return result * sortOrder;
    }
}

/* euclidean GCD (feel free to use any other) */
function gcd(a, b){
    if(b > a){
        temp = a;
        a = b;
        b = temp;
    }

    while(b != 0){
        m = a % b;
        a = b;
        b = m;
    }

    return a;
}

/* ratio is to get the gcd and divide each component by the gcd, then return a string with the typical colon-separated value */
function ratio(x, y){
    c = gcd(x, y);

    return "" + (x / c) + ":" + (y / c)
}

//  discuss at: http://phpjs.org/functions/ucfirst/
// original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
// bugfixed by: Onno Marsman
// improved by: Brett Zamir (http://brett-zamir.me)
//   example 1: ucfirst('kevin van zonneveld');
//   returns 1: 'Kevin van zonneveld'
function ucfirst(str){
    str += '';
    var f = str.charAt(0).toUpperCase();
    return f + str.substr(1);
}

/**
 * Remove Accents to a string
 */
String.prototype.removeAccents = function(){
  return this
  .toLowerCase()
  .replace(/[באדגה]/gi,"a")
  .replace(/[יטכך]/gi,"e")
  .replace(/[םלןמ]/gi,"i")
  .replace(/[ףעצפץר]/gi,"o")
  .replace(/[תשüû]/gi, "u")
  .replace(/[ח]/gi, "c")
  .replace(/[ס]/gi, "n")
  .replace(/[^a-zA-Z0-9]/g," ");
};


function frsort(a,b) {
 // We're comparing each a & b pair using the localeCompare string method,
 // which takes into account the accents and their sort order in most accented
 // latin-based languages by default. You can actually specify regional
 // language rules with another parameter, but I leave that as a research
 // task for the reader.
 return a.localeCompare(b);
 // When we hand this information back to the sort routine, it can properly
 // order our list.
 }