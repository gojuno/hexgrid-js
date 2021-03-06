var test = require("tape"),
  Long = require("long"),
  Morton64 = require("morton64"),
  HexGrid = require("./src/hexgrid"),
  Point = require("./src/point"),
  Orientation = require("./src/orientation"),
  Hex = require("./src/hex");

function validateHex(t, e, r) {
  if (e.getQ().equals(r.getQ()) && e.getR().equals(r.getR())) {
    t.ok(true);
    return;
  }
  t.fail();
}

test('flat', function(t) {
  var grid = new HexGrid(Orientation.FLAT, new Point(10, 20), new Point(20, 10), new Morton64(2, 32));
  validateHex(t, new Hex(Long.fromInt(0), Long.fromInt(37)), grid.hexAt(new Point(13, 666)));
  validateHex(t, new Hex(Long.fromInt(22), Long.fromInt(-11)), grid.hexAt(new Point(666, 13)));
  validateHex(t, new Hex(Long.fromInt(-1), Long.fromInt(-39)), grid.hexAt(new Point(-13, -666)));
  validateHex(t, new Hex(Long.fromInt(-22), Long.fromInt(9)), grid.hexAt(new Point(-666, -13)));

  t.end();
});

test('pointy', function(t) {
  var grid = new HexGrid(Orientation.POINTY, new Point(10, 20), new Point(20, 10), new Morton64(2, 32));
  validateHex(t, new Hex(Long.fromInt(-21), Long.fromInt(43)), grid.hexAt(new Point(13, 666)));
  validateHex(t, new Hex(Long.fromInt(19), Long.fromInt(0)), grid.hexAt(new Point(666, 13)));
  validateHex(t, new Hex(Long.fromInt(22), Long.fromInt(-46)), grid.hexAt(new Point(-13, -666)));
  validateHex(t, new Hex(Long.fromInt(-19), Long.fromInt(-2)), grid.hexAt(new Point(-666, -13)));

  t.end();
});

function validatePoint(t, e, r, precision) {
  if (Math.abs(e.getX() - r.getX()) <= precision && Math.abs(e.getY() - r.getY()) <= precision) {
    t.ok(true);
    return;
  }
  t.fail();
}

test('coordinatesFlat', function(t) {
  var grid = new HexGrid(Orientation.FLAT, new Point(10, 20), new Point(20, 10), new Morton64(2, 32));
  var hex = grid.hexAt(new Point(666, 666));
  validatePoint(t, new Point(670.00000, 660.85880), grid.hexCenter(hex), 0.00001);
  var expectedCorners = [
    new Point(690.00000, 660.85880),
    new Point(680.00000, 669.51905),
    new Point(660.00000, 669.51905),
    new Point(650.00000, 660.85880),
    new Point(660.00000, 652.19854),
    new Point(680.00000, 652.19854)];
  var corners = grid.hexCorners(hex);
  for (var i = 0; i < 6; i++) {
    validatePoint(t, expectedCorners[i], corners[i], 0.00001);
  }

  t.end();
});

test('coordinatesPointy', function(t) {
  var grid = new HexGrid(Orientation.POINTY, new Point(10, 20), new Point(20, 10), new Morton64(2, 32));
  var hex = grid.hexAt(new Point(666, 666));
  validatePoint(t, new Point(650.85880, 665.00000), grid.hexCenter(hex), 0.00001);
  var expectedCorners = [
    new Point(668.17930, 670.00000),
    new Point(650.85880, 675.00000),
    new Point(633.53829, 670.00000),
    new Point(633.53829, 660.00000),
    new Point(650.85880, 655.00000),
    new Point(668.17930, 660.00000)];
  var corners = grid.hexCorners(hex);
  for (var i = 0; i < 6; i++) {
    validatePoint(t, expectedCorners[i], corners[i], 0.00001);
  }

  t.end();
});

test('neighbors', function(t) {
  var grid = new HexGrid(Orientation.FLAT, new Point(10, 20), new Point(20, 10), new Morton64(2, 32));
  var hex = grid.hexAt(new Point(666, 666));
  var expectedNeighbors = [
    "920", "922", "944", "915", "921", "923", "945", "916", "918",
    "926", "948", "917", "919", "925", "927", "960", "962", "968"];
  var neighbors = grid.hexNeighbors(hex, 2);
  for (var i = 0; i < neighbors.length; i++) {
    t.equals(grid.hexToCode(neighbors[i]), expectedNeighbors[i]);
  }

  t.end();
});

test('region', function(t) {
  var grid = new HexGrid(Orientation.FLAT, new Point(10, 20), new Point(20, 10), new Morton64(2, 32));
  var geometry = [new Point(20, 19.99999), new Point(20, 40), new Point(40, 60),
                  new Point(60, 40), new Point(50, 30), new Point(40, 40)];
  var region = grid.createRegion(geometry);
  var hexes = region.getHexes();
  var expectedHexCodes = ["0", "2", "1", "3", "9", "4"];
  for (var i = 0; i < hexes.length; i++) {
    t.equals(grid.hexToCode(hexes[i]), expectedHexCodes[i]);
  }

  t.end();
});