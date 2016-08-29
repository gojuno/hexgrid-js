(function(global, factory) {
  if (typeof define === 'function' && define["amd"]) {
    define([], factory);
  } else if (typeof require === 'function' && typeof module === "object" && module && module["exports"]) {
    module["exports"] = factory();
  } else {
    (global["gojuno"] = global["gojuno"] || {})["HexGrid"] = factory();
  }
})(this, function() {
           var Long = require("long");
           var Point = require("./point.js");
           var Hex = require("./hex.js");
           var FractionalHex = require("./fractional_hex.js");

           function HexGrid(orientation, origin, size, mort) {
             this.orientation = orientation;
             this.origin = origin;
             this.size = size;
             this.mort = mort;
           }

           HexGrid.prototype.hexToCode = function(hex) {
             return this.mort.spack([hex.getQ(), hex.getR()]).toString();
           }

           HexGrid.prototype.hexFromCode = function(code) {
             var qr = this.mort.sunpack(Long.fromString(code));
             return new Hex(qr[0], qr[1]);
           }

           HexGrid.prototype.hexAt = function(point) {
             var x = (point.getX() - this.origin.getX()) / this.size.getX();
             var y = (point.getY() - this.origin.getY()) / this.size.getY();
             var q = this.orientation.getB()[0] * x + this.orientation.getB()[1] * y;
             var r = this.orientation.getB()[2] * x + this.orientation.getB()[3] * y;
             return (new FractionalHex(q, r)).toHex();
           }

           HexGrid.prototype.hexCenter = function(hex) {
             var x = (this.orientation.getF()[0] * hex.getQ() + this.orientation.getF()[1] * hex.getR()) * this.size.getX() + this.origin.getX();
             var y = (this.orientation.getF()[2] * hex.getQ() + this.orientation.getF()[3] * hex.getR()) * this.size.getY() + this.origin.getY();
             return new Point(x, y);
           }

           HexGrid.prototype.hexCorners = function(hex) {
             var corners = [];
             var center = this.hexCenter(hex);
             for (var i = 0; i < 6; i++) {
               var x = this.size.getX() * this.orientation.getCosinuses()[i] + center.getX();
               var y = this.size.getY() * this.orientation.getSinuses()[i] + center.getY();
               corners[i] = new Point(x, y);
             }
             return corners;
           }

           HexGrid.prototype.hexNeighbors = function(hex, layers) {
             var neighbors = [];
             for (var q = -layers; q <= layers; q++) {
               var r1 = Math.max(-layers, -q - layers);
               var r2 = Math.min(layers, -q + layers);
               for (var r = r1; r <= r2; r++) {
                 if (q == 0 && r == 0) {
                   continue;
                 }
                 neighbors.push(new Hex(hex.getQ().add(q), hex.getR().add(r)));
               }
             }
             return neighbors;
           }

           return HexGrid;
         });
