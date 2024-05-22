abstract class State{
    constructor(s?: String){
        this.content = new Array<String>;
        if(s) this.content.push(s);
    }
    private content: Array<String>;
    get(): Array<String>{
        return this.content;
    }
    set(arr: Array<String>){
        this.content = arr;
    }
}

class ConcreteState extends State{ constructor(s?: String){super(s); }}

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
    observers: Array<Observer> = [];
    private state: State = new ConcreteState();
    notify(): void {
        for(const o of this.observers){
            console.log("Notified observer.");
            o.update();
        }
    }
    attach(observer: Observer): void{ 
        this.observers.push(observer);
    }
    dettach(observer: Observer): void{ 
        
        if(this.observers.includes(observer)){
            this.observers.splice(this.observers.indexOf(observer), 1);
        }
    }
    getState(): State { return this.state; }
    setState(state: State): void{ this.state = state; this.notify(); }
}

class ConcreteObserver implements Observer{
    subject: ConcreteSubject | null = null;
    state: State | null = null;
    update(): void{
        if(this.subject){
            this.state = this.subject.getState();
        }
    }
    attachTo(subject: ConcreteSubject){
        subject.attach(this);
        this.subject = subject;
    }
    dettach(): void{
        if(this.subject){
            this.subject.dettach(this);
            this.subject = null;
        }
    }
}


const subj = new ConcreteSubject();
const obs = new ConcreteObserver();
obs.attachTo(subj);

console.log(subj);
console.log(obs);
console.log(`Updating state!`);
subj.setState(new ConcreteState("NEW STATE WOO"));
console.log(subj);
console.log(obs);
obs.dettach();
console.log(`I dettached the observer, so now this is the subj:`);
console.log(subj);
console.log(obs);