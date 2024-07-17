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
var AbstractMapImage = /** @class */ (function () {
    function AbstractMapImage(contents) {
        this.contents = contents;
    }
    AbstractMapImage.prototype.getContents = function () {
        return this.contents;
    };
    AbstractMapImage.prototype.read = function () {
        console.log("Reading... " + this.contents);
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
var MapImageSection = /** @class */ (function (_super) {
    __extends(MapImageSection, _super);
    function MapImageSection(subject, start, end) {
        var _this = _super.call(this, subject.getContents().slice(start, end)) || this;
        _this.subject = subject;
        _this.coordinate = [start, end];
        return _this;
    }
    return MapImageSection;
}(AbstractMapImage));
var MapImageProxy = /** @class */ (function (_super) {
    __extends(MapImageProxy, _super);
    function MapImageProxy(subject, start, end) {
        var _this = _super.call(this, subject.getContents().slice(start, end)) || this;
        _this.subject = subject;
        _this.coordinate = [start, end];
        return _this;
    }
    return MapImageProxy;
}(AbstractMapImage));
var MapViewer = /** @class */ (function () {
    function MapViewer() {
    }
    MapViewer.prototype.read = function (map) {
        map.read();
    };
    return MapViewer;
}());
var mapViewer = new MapViewer();
var map = new MapImage("full image contents".split(""));
var mapSection = new MapImageSection(map, 5, map.getContents().length);
mapViewer.read(map);
mapViewer.read(mapSection);
