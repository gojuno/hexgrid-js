(function(global, factory) {
  if (typeof define === 'function' && define["amd"]) {
    define([], factory);
  } else if (typeof require === 'function' && typeof module === "object" && module && module["exports"]) {
    module["exports"] = factory();
  } else {
    (global["gojuno"] = global["gojuno"] || {})["FractionalHex"] = factory();
  }
})(this, function() {
           var Long = require("long");
           var Hex = require("./hex.js");

           function FractionalHex(q, r) {
             this.q = q;
             this.r = r;
           }

           FractionalHex.prototype.getQ = function() {
             return this.q;
           }

           FractionalHex.prototype.getR = function() {
             return this.r;
           }

           FractionalHex.prototype.getS = function() {
             return -(this.q + this.r);
           }

           FractionalHex.prototype.toHex = function() {
             var q = Math.round(this.getQ());
             var r = Math.round(this.getR());
             var s = Math.round(this.getS());
             var qDiff = Math.abs(q - this.getQ());
             var rDiff = Math.abs(r - this.getR());
             var sDiff = Math.abs(s - this.getS());

             if (qDiff > rDiff && qDiff > sDiff) {
               q = -(r + s);
             } else if (rDiff > sDiff) {
               r = -(q + s);
             }
             return new Hex(Long.fromNumber(q), Long.fromNumber(r));
           }

           return FractionalHex;
         });
