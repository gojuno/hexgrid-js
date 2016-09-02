var Hex = require("./hex"),
  Point = require("./point"),
  nextUp = require("./nextup");

function Region(grid, geometry) {
  this.grid = grid;

  var len = geometry.length;
  if (geometry[0].getX() == geometry[len - 1].getX() && geometry[0].getY() == geometry[len - 1].getY()) {
    len -= 1;
  }

  var hex = grid.hexAt(geometry[0]);
  var q1 = hex.getQ();
  var q2 = hex.getQ();
  var r1 = hex.getR();
  var r2 = hex.getR();

  for (var i = 1; i < len; i++) {
    hex = grid.hexAt(geometry[i]);
    if (q1.greaterThan(hex.getQ())) {
      q1 = hex.getQ();
    }
    if (q2.lessThan(hex.getQ())) {
      q2 = hex.getQ();
    }
    if (r1.greaterThan(hex.getR())) {
      r1 = hex.getR();
    }
    if (r2.lessThan(hex.getR())) {
      r2 = hex.getR();
    }
  }

  q1 = q1.sub(1);
  q2 = q2.add(1);
  r1 = r1.sub(1);
  r2 = r2.add(1);

  this.hexes = [];

  var q = q1;
  while (q.lessThanOrEqual(q2)) {
    var r = r1;
    while (r.lessThanOrEqual(r2)) {
      hex = new Hex(q, r);
      var corners = grid.hexCorners(hex);
      var add = false;

      for (var c = 0; c < 6; c++) {
        if (this.pointInGeometry(geometry, len, corners[c])) {
          add = true;
          break;
        }
      }

      if (!add) {
        for (i = 0; i < len; i++) {
          if (this.pointInGeometry(corners, 6, geometry[i])) {
            add = true;
            break;
          }
        }
      }

      if (add) {
        this.hexes.push(hex);
      }

      r = r.add(1);
    }
    q = q.add(1);
  }

  this.lookup = {};
  for (i = 0; i < this.hexes.length; i++) {
    this.lookup[grid.hexToCode(this.hexes[i])] = i;
  }
}

Region.prototype.getHexes = function () {
  return this.hexes;
}

Region.prototype.contains = function (hex) {
  return this.lookup[this.grid.hexToCode(hex)] !== undefined;
}

Region.prototype.pointInGeometry = function (geometry, len, point) {
  var contains = this.intersectsWithRaycast(point, geometry[len - 1], geometry[0]);
  for (var i = 1; i < len; i++) {
    if (this.intersectsWithRaycast(point, geometry[i - 1], geometry[i])) {
      contains = !contains;
    }
  }
  return contains;
}

Region.prototype.intersectsWithRaycast = function (point, start, end) {
  if (start.getY() > end.getY()) {
    return this.intersectsWithRaycast(point, end, start);
  }

  while (point.getY() == start.getY() || point.getY() == end.getY()) {
    var newY = nextUp(point.getY());
    point = new Point(point.getX(), newY);
  }

  if (point.getY() < start.getY() || point.getY() > end.getY()) {
    return false;
  }

  if (start.getX() > end.getX()) {
    if (point.getX() > start.getX()) {
      return false;
    }
    if (point.getX() < end.getX()) {
      return true;
    }
  } else {
    if (point.getX() > end.getX()) {
      return false;
    }
    if (point.getX() < start.getX()) {
      return true;
    }
  }

  var raySlope = (point.getY() - start.getY()) / (point.getX() - start.getX());
  var diagSlope = (end.getY() - start.getY()) / (end.getX() - start.getX());

  return raySlope >= diagSlope;
}

module.exports = Region;
