#HexGrid
##Basics
Configurable hex grid on abstract surface.
##ES5
```js
var Morton64 = require("morton64"),
  Hexgrid = require("hexgrid-abstract"),
  Point = require("hexgrid-abstract/point"),
  Orientation = require("hexgrid-abstract/orientation");
  
// OR

var Morton64 = require("morton64"),
  hg = require("hexgrid-abstract"),
  HexGrid = hg.HexGrid,
  Point = hg.Point,
  Orientation = hg.Orientation;
  

var grid = new HexGrid(Orientation.FLAT, new Point(0, 0), new Point(20, 10), new Morton64(2, 32)),
  hex = grid.hexAt(new Point(50, 50)),
  code = grid.hexToCode(hex),
  restoredHex = grid.hexFromCode(code),
  neighbors = grid.hexNeighbors(hex, 2),
  region = grid.createRegion([new Point(0, 0), new Point(0, 10),
                              new Point(10, 10), new Point(10, 0)]),
  hexesInRegion = region.getHexes();
```

##ES2016
```js
import Morton64 from 'morton64';
import { HexGrid, Point, Orientation } from 'hexgrid-abstract'
  

let grid = new HexGrid(Orientation.FLAT, new Point(0, 0), new Point(20, 10), new Morton64(2, 32)),
  hex = grid.hexAt(new Point(50, 50)),
  code = grid.hexToCode(hex),
  restoredHex = grid.hexFromCode(code),
  neighbors = grid.hexNeighbors(hex, 2),
  region = grid.createRegion([new Point(0, 0), new Point(0, 10),
                              new Point(10, 10), new Point(10, 0)]),
  hexesInRegion = region.getHexes();
```