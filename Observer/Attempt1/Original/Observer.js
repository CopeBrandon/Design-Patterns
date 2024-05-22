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
var State = /** @class */ (function () {
    function State() {
        this.content = new Array;
    }
    State.prototype.get = function () {
        return this.content;
    };
    State.prototype.set = function (arr) {
        this.content = arr;
    };
    return State;
}());
var ConcreteState = /** @class */ (function (_super) {
    __extends(ConcreteState, _super);
    function ConcreteState() {
        return _super.call(this) || this;
    }
    return ConcreteState;
}(State));
var ConcreteSubject = /** @class */ (function () {
    function ConcreteSubject() {
        this.observers = new Array();
        this.state = new ConcreteState();
    }
    ConcreteSubject.prototype.notify = function () {
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var o = _a[_i];
            o.update();
        }
    };
    ConcreteSubject.prototype.attach = function (observer) {
        this.observers.push(observer);
    };
    ConcreteSubject.prototype.dettach = function (observer) {
        if (this.observers.includes(observer)) {
            //TODO: Figure out how to dettach and remove the subject reference from the observer...
            // Idea: Have a specific notify method for individual observers that allows
            // for the specific tailoring of a "dettach from me message, or a simple observer.subject = null"
            // Idea 2: Have the observer be the only one who is sending this detach method. They'll know what to do at that point.
        }
    };
    ConcreteSubject.prototype.getState = function () { return this.state; };
    ConcreteSubject.prototype.setState = function (state) { this.state = state; this.notify(); };
    return ConcreteSubject;
}());
var ConcreteObserver = /** @class */ (function () {
    function ConcreteObserver() {
    }
    ConcreteObserver.prototype.update = function () {
        if (this.subject) {
            this.state = this.subject.getState();
        }
    };
    return ConcreteObserver;
}());
var subj = new ConcreteSubject();
var obs = new ConcreteObserver();
subj.attach(obs);
console.log(subj);
console.log(obs);
subj.notify();
console.log("All ");
console.log(subj);
console.log(obs);
subj.dettach(obs);
console.log("I dettached the observer, so now this is the subj:");
console.log(subj);
