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

*/
//Items(in D&D) are used by characters like strategies, there would be a general use action for most
//  where the item would be blankly plopped into a use() function that has a item as a param.
// You can call the methods that are contained in the strategy(item) and they will have
// differing behaviors based on what the item in question is designed to do.

let idcounter = 0;

enum TargetType {
    self, other
}

class GameEvent{
    str: String;
    constructor(eventStr: string){
        this.str = eventStr;
    }
}

abstract class GameObject{
    id: number;
    isInvisible: boolean = false;
    constructor(){
        this.id = idcounter++;
    }
}

class Character extends GameObject{
    items: Array<Item>;
    constructor(){
        super();
        this.items = new Array<Item>;
    }
    addItem(item: Item){this.items.push(item);}
}

abstract class Item extends GameObject{
    targetType: TargetType;
    abstract use(obj: GameObject): GameEvent; 
}

class InvisibilityCloak extends Item{
    targetType = TargetType.self;
    use(user: GameObject): GameEvent{
        user.isInvisible = true;
        //some other stuff happens etc.
        return new GameEvent("You have gone invisible.");
    }
}

class DetectionGoggles extends Item{
    targetType = TargetType.other;
    use(subject: GameObject){
        if(subject.isInvisible){
            return new GameEvent("You have detected someone with your goggles!");
        }
        return new GameEvent("You perceive no one invisible with your detection goggles.");
    }
}


let character = new Character();
let subject = new Character();
character.addItem(new InvisibilityCloak());
character.addItem(new DetectionGoggles());
character.items.forEach(item => {
    let result: GameEvent;
    // this is a frustrating implementation considering strategy is kinda meant to avoid testing like this
    // I don't know if there's a way to not require some sort of switch statement to determine
    // what the proper subject of the item would be.
    // only solution that comes to mind would require the class itself to just take both references
    // and then determine which one it needs itself... which is super annoying.
    // the only reason this is a problem is that the blueprint for an abstract/interface requires
    // that the parameters for the function call remain the same for all implementations...
    // which makes sense, I suppose that's why it's common for all of them to accept numerous
    // inputs that they dont individually need, or just the entire space of all possibiliies
    //                                                 (like the object being mutated)
    switch(item.targetType){ 
        case TargetType.self:
            result = item.use(character); break;
        case TargetType.other:
            result = item.use(subject); break;
    }
    console.log(`You used an item... here's the result: ${result.str}`);
})