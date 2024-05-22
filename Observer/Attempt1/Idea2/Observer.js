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
    function State(s) {
        this.content = new Array;
        if (s)
            this.content.push(s);
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
    function ConcreteState(s) {
        return _super.call(this, s) || this;
    }
    return ConcreteState;
}(State));
var ConcreteSubject = /** @class */ (function () {
    function ConcreteSubject() {
        this.observers = [];
        this.state = new ConcreteState();
    }
    ConcreteSubject.prototype.notify = function () {
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var o = _a[_i];
            console.log("Notified observer.");
            o.update();
        }
    };
    ConcreteSubject.prototype.attach = function (observer) {
        this.observers.push(observer);
    };
    ConcreteSubject.prototype.dettach = function (observer) {
        if (this.observers.includes(observer)) {
            this.observers.splice(this.observers.indexOf(observer), 1);
        }
    };
    ConcreteSubject.prototype.getState = function () { return this.state; };
    ConcreteSubject.prototype.setState = function (state) { this.state = state; this.notify(); };
    return ConcreteSubject;
}());
var ConcreteObserver = /** @class */ (function () {
    function ConcreteObserver() {
        this.subject = null;
        this.state = null;
    }
    ConcreteObserver.prototype.update = function () {
        if (this.subject) {
            this.state = this.subject.getState();
        }
    };
    ConcreteObserver.prototype.attachTo = function (subject) {
        subject.attach(this);
        this.subject = subject;
    };
    ConcreteObserver.prototype.dettach = function () {
        if (this.subject) {
            this.subject.dettach(this);
            this.subject = null;
        }
    };
    return ConcreteObserver;
}());
var subj = new ConcreteSubject();
var obs = new ConcreteObserver();
obs.attachTo(subj);
console.log(subj);
console.log(obs);
console.log("Updating state!");
subj.setState(new ConcreteState("NEW STATE WOO"));
console.log(subj);
console.log(obs);
obs.dettach();
console.log("I dettached the observer, so now this is the subj:");
console.log(subj);
console.log(obs);
