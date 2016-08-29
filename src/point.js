(function(global, factory) {
  if (typeof define === 'function' && define["amd"]) {
    define([], factory);
  } else if (typeof require === 'function' && typeof module === "object" && module && module["exports"]) {
    module["exports"] = factory();
  } else {
    (global["gojuno"] = global["gojuno"] || {})["Point"] = factory();
  }
})(this, function() {
           function Point(x, y) {
             this.x = x;
             this.y = y;
           }

           Point.prototype.getX = function() {
             return this.x;
           }

           Point.prototype.getY = function() {
             return this.y;
           }

           return Point;
         });
