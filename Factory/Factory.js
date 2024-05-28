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
var Doc = /** @class */ (function () {
    function Doc(contents) {
        this._open = false;
        this.contents = contents;
        this.memory = contents;
    }
    Doc.prototype.open = function () {
        this._open = true;
    };
    Doc.prototype.close = function () {
        this._open = false;
    };
    Doc.prototype.save = function () {
        if (this._open)
            this.contents = this.memory;
    };
    Doc.prototype.revert = function () {
        this.memory = this.contents;
    };
    Doc.prototype.read = function () {
        if (this._open)
            return this.contents;
        else
            return "File is closed!";
    };
    Doc.prototype.isOpen = function () { return this._open; };
    return Doc;
}());
var App = /** @class */ (function () {
    function App() {
        this.docs = new Array();
    }
    App.prototype.newDocument = function () {
        var doc = this.createDocument();
        doc.open();
        this.docs.push(doc);
    };
    return App;
}());
var MyApp = /** @class */ (function (_super) {
    __extends(MyApp, _super);
    function MyApp() {
        return _super.call(this) || this;
    }
    MyApp.prototype.createDocument = function () {
        return Date.now() % 2 === 0 ? new MyDoc() : new OtherDoc();
    };
    return MyApp;
}(App));
var MyDoc = /** @class */ (function (_super) {
    __extends(MyDoc, _super);
    function MyDoc() {
        return _super.call(this, "This is a MyDoc!") || this;
    }
    return MyDoc;
}(Doc));
var OtherDoc = /** @class */ (function (_super) {
    __extends(OtherDoc, _super);
    function OtherDoc() {
        return _super.call(this, "This is OtherDoc!") || this;
    }
    return OtherDoc;
}(Doc));
var l = 5;
console.log("Creating app.");
var app = new MyApp();
console.log(app);
for (var i = 0; i < l; i++) {
    console.log("Creating document.");
    app.newDocument();
    console.log(app.docs[i]);
}
console.log("Completed creation of documents. Woo.");
console.log();
console.log("Modifying documents!");
console.log();
for (var i = 0; i < l; i++) {
    console.log("reading document #".concat(i, ": ").concat(app.docs[i].read()));
    console.log("closing document #".concat(i, ": ").concat(app.docs[i].close()));
    console.log("reading document #".concat(i, ": ").concat(app.docs[i].read()));
    console.log("opening document #".concat(i, ": ").concat(app.docs[i].open()));
    console.log("editing memory document #".concat(i, ": ").concat(app.docs[i].memory));
    console.log("New memory.");
    app.docs[i].memory = "New memory.";
    console.log("reading document #".concat(i, ": ").concat(app.docs[i].read()));
    console.log("Saving document #".concat(i, ": ").concat(app.docs[i].save()));
    console.log("reading document #".concat(i, ": ").concat(app.docs[i].read()));
    console.log("closing document #".concat(i, ": ").concat(app.docs[i].close()));
    console.log();
}
