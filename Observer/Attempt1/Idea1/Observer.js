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
var counter = 0;
var interfaceId = 0;
var State = /** @class */ (function () {
    function State() {
        this.content = [String(counter)]; // just to see how many we got at this point :)
        counter++;
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
        observer.setSubject(this);
        observer.setState(this.state);
    };
    ConcreteSubject.prototype.dettach = function (observer) {
        observer.dettach();
        this.observers.splice(this.observers.indexOf(observer), 1);
    };
    ConcreteSubject.prototype.getState = function () { return this.state; };
    ConcreteSubject.prototype.setState = function (state) { this.state = state; this.notify(); };
    return ConcreteSubject;
}());
var ConcreteObserver = /** @class */ (function () {
    function ConcreteObserver() {
        this.subject = null;
        this.state = null;
        this.id = interfaceId++;
    }
    ConcreteObserver.prototype.update = function () {
        if (this.subject) {
            this.state = this.subject.getState();
        }
    };
    ConcreteObserver.prototype.attach = function (subject) {
        if (this.subject) {
            this.subject.dettach(this);
        }
        this.state = subject.getState();
        this.subject = subject;
    };
    ConcreteObserver.prototype.dettach = function () { this.state = null; this.subject = null; }; // security idea: having to pass a hash to this function or something like that
    ConcreteObserver.prototype.getState = function () { return this.state; }; // not sure if this is cludgy or not... 
    // at some point in the logic you'd have to check for empty objects or undefined...
    ConcreteObserver.prototype.setState = function (state) { this.state = state; };
    ConcreteObserver.prototype.getSubject = function () { return this.subject; };
    ConcreteObserver.prototype.setSubject = function (subject) { this.subject = subject; };
    return ConcreteObserver;
}());
var subjects = [];
var observers = [];
for (var i_1 = 0; i_1 < 2000; i_1++) {
    var subject = new ConcreteSubject;
    for (var _i = 0, observers_1 = observers; _i < observers_1.length; _i++) {
        var observer = observers_1[_i];
        subject.attach(observer);
    }
    observers.push(new ConcreteObserver());
    subject.setState(new ConcreteState());
    subjects.push(subject);
}
// for(let subject of subjects){
// console.log(`Subject: ${subject.getState().get()}`)
// console.log(subject);
// }
console.log(subjects[subjects.length - 1].observers.length);
var i = 0;
var j = 0;
for (var _a = 0, subjects_1 = subjects; _a < subjects_1.length; _a++) {
    var subject = subjects_1[_a];
    i++;
    while (subject.observers.length > 0) {
        j++;
        subject.dettach(subject.observers[0]);
    }
}
console.log("num s:".concat(i, " num iterations:").concat(j));
console.log(subjects[subjects.length - 1]);
console.log("I am done...");
