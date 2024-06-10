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
var Vector = /** @class */ (function () {
    function Vector(x0, y0, x1, y1, a, s) {
        this._x0 = x0;
        this._y0 = y0;
        this._x1 = x1;
        this._y1 = y1;
        this._a = a;
        this._s = s;
    }
    Vector.prototype.x0 = function () { return this._x0; };
    Vector.prototype.y0 = function () { return this._y0; };
    Vector.prototype.x1 = function () { return this._x1; };
    Vector.prototype.y1 = function () { return this._y1; };
    Vector.prototype.a = function () { return this._a; };
    Vector.prototype.s = function () { return this._s; };
    return Vector;
}());
var CartesianVector = /** @class */ (function (_super) {
    __extends(CartesianVector, _super);
    //gets position at start(x0, y0) and position at tip(x1,y1) and generates vector angle
    function CartesianVector(x0, y0, x1, y1) {
        var dx = x1 - x0;
        var dy = y1 - y0;
        var a = dx === 0 ? 0 : Math.atan(dy / dx);
        var m = dx === 0 ? 0 : dx / Math.cos(a);
        return _super.call(this, x0, y0, x1, y1, a, m) || this;
    }
    return CartesianVector;
}(Vector));
var RadialVector = /** @class */ (function (_super) {
    __extends(RadialVector, _super);
    //gets position at start(x0, y0), scalar multiplier or magnitude(s), and vector angle(a), and generates position at tip(x1, y1)
    function RadialVector(x0, y0, a, s) {
        var x1 = 0;
        var y1 = 0;
        return _super.call(this, x0, y0, 0, 0, a, s) || this;
    }
    return RadialVector;
}(Vector));
/**
 * @enum {number}
 */
var VectorTypes;
(function (VectorTypes) {
    VectorTypes[VectorTypes["RADIAL"] = 0] = "RADIAL";
    VectorTypes[VectorTypes["CARTESIAN"] = 1] = "CARTESIAN";
})(VectorTypes || (VectorTypes = {}));
/**
 * @param {VectorTypes} vectorTypes - {@link VectorTypes} Enum describing which vector to build.
 *  require different components in order to work or else it will throw an error.
 *
 * @param {Object} VectorComponents - Destructured object that contains required components of
 * @param {number} [x0=0] - Origin point of vector in X direction. Defaults to 0.
 * @param {number} [y0=0] - Origin point of vector in Y direction. Defaults to 0.
 * @param {number} [x1] - Tip point of vector in X direction. Required for CartesianVector.
 * @param {number} [y1] - Tip point of vector in X direction. Required for CartesianVector.
 * @param {number} [a] - Origin point of vector in X direction. Required for RadialVector.
 * @param {number} [a] - Origin point of vector in X direction. Required for RadialVector.
 * @throws Error If vector format not properly followed.
 */
var VectorBuilder = /** @class */ (function () {
    function VectorBuilder() {
    }
    VectorBuilder.build = function (vectorType, _b) {
        var _c = _b.x0, x0 = _c === void 0 ? 0 : _c, _d = _b.y0, y0 = _d === void 0 ? 0 : _d, x1 = _b.x1, y1 = _b.y1, a = _b.a, s = _b.s;
        console.log("Building Vector:".concat(vectorType, ". x0: ").concat(x0, " y0: ").concat(y0, ", x1: ").concat(x1, ", y1: ").concat(y1, ", a: ").concat(a, ", s:").concat(s));
        switch (vectorType) {
            case VectorTypes.CARTESIAN:
                if (x1 === undefined || y1 === undefined) {
                    throw Error("Vector format not followed, requires x1 and y1 for CartesianVector.");
                }
                return new CartesianVector(x0, y0, x1, y1);
            case VectorTypes.RADIAL:
                if (a === undefined || s === undefined) {
                    var e = Error("asdf");
                    throw new Error("Vector format not followed, requires a and s for RadialVector.");
                }
                return new RadialVector(x0, y0, a, s);
            default: throw Error("erm...? How did you pass in something that wasn't a VectorType?");
        }
    };
    VectorBuilder.VectorTypes = VectorTypes;
    return VectorBuilder;
}());
try {
    var v = VectorBuilder.build(VectorBuilder.VectorTypes.CARTESIAN, { x0: 0, y0: 0, x1: 1, y1: 1 });
    console.log(v);
    v = VectorBuilder.build(VectorBuilder.VectorTypes.RADIAL, { x0: 0, y0: 0, a: 1, s: 1 });
    console.log(v);
    v = VectorBuilder.build(VectorBuilder.VectorTypes.CARTESIAN, { x0: 0, y0: 0, a: 1, s: 1 });
    console.log(v);
    throw Error;
}
catch (e) {
    var nodeError = e;
    console.log(nodeError.message);
}
