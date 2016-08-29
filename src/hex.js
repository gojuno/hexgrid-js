(function(global, factory) {
  if (typeof define === 'function' && define["amd"]) {
    define([], factory);
  } else if (typeof require === 'function' && typeof module === "object" && module && module["exports"]) {
    module["exports"] = factory();
  } else {
    (global["gojuno"] = global["gojuno"] || {})["Hex"] = factory();
  }
})(this, function() {
           var Long = require("long");

           function Hex(q, r) {
             this.q = q;
             this.r = r;
           }

           Hex.prototype.getQ = function() {
             return this.q;
           }

           Hex.prototype.getR = function() {
             return this.r;
           }

           Hex.prototype.getS = function() {
             return this.q.add(this.r).negate();
           }

           return Hex;
         });
