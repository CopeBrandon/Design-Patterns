var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Coordinate = /** @class */ (function () {
    function Coordinate(x, y, desc) {
        this._x = x;
        this._y = y;
        this._desc = desc;
    }
    Coordinate.prototype.x = function () { return this._x; };
    Coordinate.prototype.y = function () { return this._y; };
    Coordinate.prototype.set = function (x, y) { this._x = x; this._y = y; };
    Coordinate.prototype.isRight = function (cord) {
        return this.x() >= cord.x();
    };
    Coordinate.prototype.isBelow = function (cord) {
        return this.y() >= cord.y();
    };
    return Coordinate;
}());
var CoordinatePlane = /** @class */ (function () {
    function CoordinatePlane(coordinates) {
        this.isBuilt = false;
        if (typeof coordinates === 'undefined') {
            this.coordinates = new Array;
        }
        else {
            this.coordinates = coordinates;
        }
    }
    CoordinatePlane.prototype.build = function () {
        this.coordinates.sort(function (a, b) {
            var y = a.y() - b.y();
            var x = a.x() - b.x();
            return y !== 0 ? y : x;
        });
        this.isBuilt = true;
    };
    CoordinatePlane.construct = function (coords) {
        return coords.sort(function (a, b) {
            var y = a.y() - b.y();
            var x = a.x() - b.x();
            return y !== 0 ? y : x;
        });
    };
    CoordinatePlane.buildSubplane = function (coords, start, end) {
        //i need to pull out the index of the first time that coordinate shows up?
        //TODO: This probably doesn't work, because I think indexof relies on reference.
        //we'll figure it out
        return coords.slice(coords.indexOf(start), coords.indexOf(end));
    };
    CoordinatePlane.prototype.add = function (coordinate) {
        if (this.coordinates.length === 0) {
            this.coordinates.push(coordinate);
            return;
        }
        var exists = false;
        for (var i = 0; i < this.coordinates.length; i++) {
            if (this.coordinates[i].x() === coordinate.x() && this.coordinates[i].y() === coordinate.y()) {
                exists = true;
            }
        }
        if (!exists) {
            this.coordinates.push(coordinate);
            this.isBuilt = false;
        }
    };
    CoordinatePlane.prototype.remove = function (coordinate) {
        this.coordinates.filter(function (value) { return value.x() === coordinate.x() && value.y() === coordinate.y(); });
    };
    CoordinatePlane.prototype.read = function () {
        if (!this.isBuilt) {
            return "Coordinate plane is not constructed yet!";
        }
        var str = "Coordinates:\n0:(".concat(this.coordinates[0].x(), ",").concat(this.coordinates[0].y(), ")");
        var last = this.coordinates[0].y();
        for (var i = 1; i < this.coordinates.length; i++) {
            if (this.coordinates[i].y() !== last) {
                str += "\n";
            }
            str += "".concat(i, ": (").concat(this.coordinates[i].x(), ",").concat(this.coordinates[i].y(), ") ");
            last = this.coordinates[i].y();
        }
        return str;
    };
    return CoordinatePlane;
}());
var AbstractMapImage = /** @class */ (function () {
    function AbstractMapImage(contents) {
        if (typeof contents === 'undefined') {
            this.plane = new CoordinatePlane();
        }
        else {
            this.plane = contents;
        }
    }
    AbstractMapImage.prototype.add = function (cord) {
        this.plane.add(cord);
    };
    AbstractMapImage.prototype.remove = function (cord) {
        this.plane.remove(cord);
    };
    AbstractMapImage.prototype.read = function () {
        return this.plane.read();
    };
    return AbstractMapImage;
}());
var MapImage = /** @class */ (function (_super) {
    __extends(MapImage, _super);
    function MapImage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MapImage;
}(AbstractMapImage));
function generateInt(ceil) {
    return Math.floor(Math.random() * ceil);
}
var MapImageSection = /** @class */ (function (_super) {
    __extends(MapImageSection, _super);
    function MapImageSection(subject, start, end) {
        var _this = this;
        var coordinatePlane = new CoordinatePlane(CoordinatePlane.buildSubplane(subject.plane.coordinates, start, end));
        _this = _super.call(this, coordinatePlane) || this;
        _this.subject = subject;
        return _this;
    }
    return MapImageSection;
}(AbstractMapImage));
var start = new Coordinate(2, 3, "START?!?!?!");
var end = new Coordinate(5, 6, "END!?!?!?");
var plane = new CoordinatePlane();
plane.add(start);
plane.add(end);
for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
        var coord = new Coordinate(i, j, "".concat(i).concat(j, "?!??!"));
        plane.add(coord);
    }
}
var mapImage = new MapImage(plane);
console.log(mapImage.read());
mapImage.plane.build();
console.log(mapImage.read());
console.log("Building map section!");
var section = new MapImageSection(mapImage, start, end);
console.log(section.read());
section.plane.build();
console.log(section.read());
