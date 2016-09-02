#HexGrid
##Basics
Configurable hex grid on abstract surface.
##Examples
```js
var Morton64 = require("morton64"),
  Hexgrid = require("hexgrid"),
  Point = require("hexgrid/point"),
  Orientation = require("hexgrid/orientation");
  

var grid = new HexGrid(Orientation.FLAT, new Point(0, 0), new Point(20, 10), new Morton64(2, 32)),
  hex = grid.hexAt(new Point(50, 50)),
  code = grid.hexToCode(hex),
  restoredHex = grid.hexFromCode(code),
  neighbors = grid.hexNeighbors(hex, 2),
  region = grid.createRegion([new Point(0, 0), new Point(0, 10),
                              new Point(10, 10), new Point(10, 0)]),
  hexesInRegion = region.getHexes();
```