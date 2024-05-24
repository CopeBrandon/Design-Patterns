let counter = 0;
let interfaceId = 0;

abstract class State{
    constructor(){
        this.content = [String(counter)]; // just to see how many we got at this point :)
        counter++;
    }
    private content: Array<String>;
    get(): Array<String>{
        return this.content;
    }
    set(arr: Array<String>){
        this.content = arr;
    }
}

class ConcreteState extends State{ constructor(){ super(); }}

//TODO: make abstract class and make "static" variables like state etc 
interface Subject{
    observers: Array<Observer>;

    notify(): void;
    attach(observer: Observer): void;
    dettach(observer: Observer): void;
    setState(state: State): void;
    getState(): State;
}

//TODO: make abstract class and make "static" variables like state etc
interface Observer{
    id: number;
    update(): void; 
    attach(subject: Subject): void;
    dettach(): void;
    setSubject(subject: Subject): void;
    getSubject(): Subject | null;
    setState(state: State): void;
    getState(): State | null;
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
        observer.setSubject(this);
        observer.setState(this.state);
    }
    dettach(observer: Observer): void{
        observer.dettach();
        this.observers.splice(this.observers.indexOf(observer), 1);
    }

    getState(): State { return this.state; }
    setState(state: State): void{ this.state = state; this.notify(); }
}

class ConcreteObserver implements Observer{
    private subject: Subject | null = null;
    private state: State | null = null;
    id = interfaceId++;

    update(): void{
        if(this.subject){
            this.state = this.subject.getState();
        }
    }

    attach(subject: Subject): void { 
        if(this.subject){
            this.subject.dettach(this);
        }
        this.state = subject.getState();
        this.subject = subject; 
    }
    dettach(): void { this.state = null; this.subject = null; } // security idea: having to pass a hash to this function or something like that

    getState(): State | null{ return this.state; }  // not sure if this is cludgy or not... 
                                                    // at some point in the logic you'd have to check for empty objects or undefined...
    setState(state: State): void { this.state = state; }

    getSubject(): Subject | null { return this.subject; }
    setSubject(subject: Subject): void { this.subject = subject; }
}

const subjects: Subject[] = [];
const observers: Observer[] = [];
for(let i=0; i<100; i++){
    const subject: ConcreteSubject = new ConcreteSubject;
    for(const observer of observers){
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
console.log(subjects[subjects.length-1].observers.length);
let i=0; let j=0;

for(let subject of subjects){
    i++;
    while(subject.observers.length > 0){
        j++;
        subject.dettach(subject.observers[0]);
    }
}
console.log(`num s:${i} num iterations:${j}`);
console.log(subjects[subjects.length-1]);
console.log("I am done...");