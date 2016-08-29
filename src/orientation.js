(function(global, factory) {
  if (typeof define === 'function' && define["amd"]) {
    define([], factory);
  } else if (typeof require === 'function' && typeof module === "object" && module && module["exports"]) {
    module["exports"] = factory();
  } else {
    (global["gojuno"] = global["gojuno"] || {})["Orientation"] = factory();
  }
})(this, function() {
           function Orientation(name, f, b, startAngle) {
             this.name = name;
             this.f = f;
             this.b = b;
             this.startsAngle = startAngle;
             this.prehashAngles();
           }

           Orientation.prototype.getF = function() {
             return this.f;
           }

           Orientation.prototype.getB = function() {
             return this.b;
           }

           Orientation.prototype.getStartAngle = function() {
             return this.startsAngle;
           }

           Orientation.prototype.getSinuses = function() {
             return this.sinuses;
           }

           Orientation.prototype.getCosinuses = function() {
             return this.cosinuses;
           }

           Orientation.prototype.prehashAngles = function() {
             this.sinuses = [];
             this.cosinuses = [];
             for (var i = 0; i < 6; i++) {
               var angle = 2.0 * Math.PI * (i + this.getStartAngle()) / 6.0;
               this.sinuses[i] = Math.sin(angle);
               this.cosinuses[i] = Math.cos(angle);
             }
           }

           Orientation.POINTY = new Orientation(
             "pointy",
             [Math.sqrt(3.0), Math.sqrt(3.0) / 2.0, 0.0, 3.0 / 2.0],
             [Math.sqrt(3.0) / 3.0, -1.0 / 3.0, 0.0, 2.0 / 3.0],
             0.5);

           Orientation.FLAT = new Orientation(
            "flat",
            [3.0 / 2.0, 0.0, Math.sqrt(3.0) / 2.0, Math.sqrt(3.0)],
            [2.0 / 3.0, 0.0, -1.0 / 3.0, Math.sqrt(3.0) / 3.0],
            0.0);

           return Orientation;
         });
