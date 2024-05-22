
abstract class State{
    constructor(){
        this.content = new Array<String>;
    }
    private content: Array<String>;
    get(): Array<String>{
        return this.content;
    }
    set(arr: Array<String>){
        this.content = arr;
    }
}

class ConcreteState extends State{ constructor(){super(); }}

interface Subject{
    observers: Array<Observer>;
    notify(): void;
    attach(observer: Observer): void;
    dettach(observer: Observer): void;
}

interface Observer{
    update(): void;
}

class ConcreteSubject implements Subject{
    observers: Array<Observer> = new Array<Observer>();
    private state: State = new ConcreteState();
    notify(): void {
        for(const o of this.observers){
            o.update();
        }
    }
    attach(observer: Observer): void{ 
        this.observers.push(observer);
    }
    dettach(observer: Observer): void{ 
        if(this.observers.includes(observer)){
            //TODO: Figure out how to dettach and remove the subject reference from the observer...
            // Idea: Have a specific notify method for individual observers that allows
            // for the specific tailoring of a "dettach from me message, or a simple observer.subject = null"
            // Idea 2: Have the observer be the only one who is sending this detach method. They'll know what to do at that point.
        }
    }
    getState(): State { return this.state; }
    setState(state: State): void{ this.state = state; this.notify(); }
}

class ConcreteObserver implements Observer{
    subject: ConcreteSubject; // TODO: this is never updated... How does it know what its subject is?
    state: State;
    update(): void{
        if(this.subject){
            this.state = this.subject.getState();
        }
    }
}


const subj = new ConcreteSubject();
const obs = new ConcreteObserver();
subj.attach(obs);

console.log(subj);
console.log(obs);
subj.notify();
console.log(`All `);
console.log(subj);
console.log(obs);
subj.dettach(obs);
console.log(`I dettached the observer, so now this is the subj:`);
console.log(subj);