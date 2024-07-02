"use strict";
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
exports.__esModule = true;
var State = /** @class */ (function () {
    function State() {
        this.value = 0;
        if (this.instanceExistsAndIsSamePrototype()) {
            State.instance = this.singletonMutate();
        }
        return State.instance;
    }
    State.prototype.instanceExistsAndIsSamePrototype = function () {
        return !State.instance || Object.getPrototypeOf(State.instance) !== Object.getPrototypeOf(this);
    };
    return State;
}());
var StateA = /** @class */ (function (_super) {
    __extends(StateA, _super);
    function StateA() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StateA.prototype.statefulMethod = function () {
        console.log("I am currently StateA.");
    };
    StateA.prototype.singletonMutate = function () {
        this.value = 5;
        return this;
    };
    return StateA;
}(State));
var StateB = /** @class */ (function (_super) {
    __extends(StateB, _super);
    function StateB() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StateB.prototype.statefulMethod = function () {
        console.log("I am currently StateB.");
    };
    StateB.prototype.singletonMutate = function () {
        this.value = -1;
        return this;
    };
    return StateB;
}(State));
var StateUser = /** @class */ (function () {
    function StateUser(state) {
        this.state = state;
    }
    return StateUser;
}());
var stateUser = new StateUser(new StateA());
stateUser.state.statefulMethod();
console.log('stateUser.state.value: ' + stateUser.state.value);
stateUser.state = new StateB();
stateUser.state.statefulMethod();
console.log('stateUser.state.value: ' + stateUser.state.value);
stateUser.state = new StateB();
stateUser.state.statefulMethod();
console.log('stateUser.state.value: ' + stateUser.state.value);
stateUser.state = new StateA();
stateUser.state.statefulMethod();
console.log('stateUser.state.value: ' + stateUser.state.value);
