(function(global, factory) {
  if (typeof define === 'function' && define["amd"]) {
    define([], factory);
  } else if (typeof require === 'function' && typeof module === "object" && module && module["exports"]) {
    module["exports"] = factory();
  } else {
    (global["gojuno"] = global["gojuno"] || {})["nextUp"] = factory();
  }
})(this, function() {
           var EPSILON = Math.pow(2, -52);
           var MAX_VALUE = (2 - EPSILON) * Math.pow(2, 1023);
           var MIN_VALUE = Math.pow(2, -1022);

           function nextUp(x) {
             if (x !== x) {
               return x;
             }
             if (x === -1 / 0) {
               return -MAX_VALUE;
             }
             if (x === +1 / 0) {
               return +1 / 0;
             }
             if (x === +MAX_VALUE) {
               return +1 / 0;
             }
             var y = x * (x < 0 ? 1 - EPSILON / 2 : 1 + EPSILON);
             if (y === x) {
               y = MIN_VALUE * EPSILON > 0 ? x + MIN_VALUE * EPSILON : x + MIN_VALUE;
             }
             if (y === +1 / 0) {
               y = +MAX_VALUE;
             }
             var b = x + (y - x) / 2;
             if (x < b && b < y) {
               y = b;
             }
             var c = (y + x) / 2;
             if (x < c && c < y) {
               y = c;
             }
             return y === 0 ? -0 : y;
           };

           return nextUp;
         });
