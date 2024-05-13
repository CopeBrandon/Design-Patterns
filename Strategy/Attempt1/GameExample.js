/*
Structure of a Strategy:
Strategy abstract class, child classes that implement the method.
Class that passes in the strategy when you use the constructor.
The abstract class creates the template for methods that allows you to use said method that has the
    same inputs but not the same internal workings. Results will vary, outputs types need to be
    the same for languages like Java, though.

    When you're creating a Game object it has a certain set of fields like hit points or whatever.
    By passing in an interface, you can create the ability for any class to have a behavior. A
    strategy, on the other hand, allows you to create a single class that has multiple different
    behaviors depending on the strategy passed in. The distinction lies in the label for the
    object type. At the end of the day, I don't know what the mechanical distinction is in the
    results for either of these though.

    Sudden thought: Depending on the interface, you could perhaps force a particular kind of strategy?
        Is that how that works?
*/
//Items(in D&D) are used by characters like strategies, there would be a general use action for most
//  where the item would be blankly plopped into a use() function that has a item as a param.
// You can call the methods that are contained in the strategy(item) and they will have
// differing behaviors based on what the item in question is designed to do.
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
var idcounter = 0;
var TargetType;
(function (TargetType) {
    TargetType[TargetType["self"] = 0] = "self";
    TargetType[TargetType["other"] = 1] = "other";
})(TargetType || (TargetType = {}));
var GameEvent = /** @class */ (function () {
    function GameEvent(eventStr) {
        this.str = eventStr;
    }
    return GameEvent;
}());
var GameObject = /** @class */ (function () {
    function GameObject() {
        this.isInvisible = false;
        this.id = idcounter++;
    }
    return GameObject;
}());
var Character = /** @class */ (function (_super) {
    __extends(Character, _super);
    function Character() {
        var _this = _super.call(this) || this;
        _this.items = new Array;
        return _this;
    }
    Character.prototype.addItem = function (item) { this.items.push(item); };
    return Character;
}(GameObject));
var Item = /** @class */ (function (_super) {
    __extends(Item, _super);
    function Item() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Item;
}(GameObject));
var InvisibilityCloak = /** @class */ (function (_super) {
    __extends(InvisibilityCloak, _super);
    function InvisibilityCloak() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.targetType = TargetType.self;
        return _this;
    }
    InvisibilityCloak.prototype.use = function (user) {
        user.isInvisible = true;
        //some other stuff happens etc.
        return new GameEvent("You have gone invisible.");
    };
    return InvisibilityCloak;
}(Item));
var DetectionGoggles = /** @class */ (function (_super) {
    __extends(DetectionGoggles, _super);
    function DetectionGoggles() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.targetType = TargetType.other;
        return _this;
    }
    DetectionGoggles.prototype.use = function (subject) {
        if (subject.isInvisible) {
            return new GameEvent("You have detected someone with your goggles!");
        }
        return new GameEvent("You perceive no one invisible with your detection goggles.");
    };
    return DetectionGoggles;
}(Item));
var character = new Character();
var subject = new Character();
character.addItem(new InvisibilityCloak());
character.addItem(new DetectionGoggles());
character.items.forEach(function (item) {
    var result;
    switch (item.targetType) {
        case TargetType.self:
            result = item.use(character);
            break;
        case TargetType.other:
            result = item.use(subject);
            break;
    }
    console.log("You used an item... here's the result: ".concat(result.str));
});
