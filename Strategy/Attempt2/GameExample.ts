//General Idea:
//Build it in such a way that an item
//Builds everything for itself. Ideally the strategy only needs the parent class. In order for this
//to work, the class needs to contain a reference to what the strategy needs as a property.

let idcounter = 0;

enum TargetType {
    SELF, OTHER, AREA
}

class GameEvent{
    str: String;
    constructor(eventStr: string){ this.str = eventStr; }
}

abstract class GameObject{
    id: number;
    isInvisible: boolean = false;
    target: GameObject = null;
    constructor(){
        this.id = idcounter++;
    }
}

abstract class Item extends GameObject{
    subjectType: TargetType;
    abstract effect(target: GameObject): GameEvent;

    use(user: GameObject): GameEvent{
        return this.effect(this.getTarget(user));
    }

    getTarget(user: GameObject): GameObject{
        switch(this.subjectType){
            case TargetType.SELF:
                return user;
            case TargetType.OTHER:
                if(user.target){
                    return user.target;
                } else {
                    return this.promptTarget(user);
                }
            case TargetType.AREA:
                throw new Error("Single target attempted when area effect used.");
            default:
                return user;
        }
    }

    promptTarget(user: GameObject): GameObject{ return new Character(); } //fake code !!!
}

class Character extends GameObject{
    items: Array<Item>;//obviously this should be private but w/e
    constructor(){
        super();
        this.items = new Array<Item>;
    }
    addItem(item: Item){this.items.push(item);}
}

class InvisibilityCloak extends Item{
    targetType = TargetType.SELF;
    effect(target: GameObject): GameEvent{
        if(target.isInvisible == true){
            return new GameEvent("You were already invisible!");
        } else {
            target.isInvisible = true;
            return new GameEvent("You have gone invisible!");
        }
    }
}

class RemoveInvisibilityWand extends Item{
    targetType = TargetType.OTHER;
    uses = 5;
    effect(target: GameObject): GameEvent{
        if(target.isInvisible == true){
            if(this.uses > 0){
                return new GameEvent("You removed the invisibility of your target!");
            }
            return new GameEvent("Your wand of remove invisibility is out of charges!");
        }
        return new GameEvent("The target was not invisible.");
    }
}