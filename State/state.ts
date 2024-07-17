import { inspect } from "node:util";

abstract class State{
    protected static instance: State;
    private instanceExistsAndIsSamePrototype(): boolean { 
        return !State.instance || Object.getPrototypeOf(State.instance) !== Object.getPrototypeOf(this);
    }
    constructor(){
        if(this.instanceExistsAndIsSamePrototype()){
            State.instance = this.singletonMutate();
        }
        return State.instance;
    }
    value: number = 0;
    abstract statefulMethod(): void;
    protected abstract singletonMutate(): State;
}

class StateA extends State{
    statefulMethod(): void {
        console.log(`I am currently StateA.`);
    }
    singletonMutate(): State {
        this.value = 5;
        return this;
    }
}
class StateB extends State{
    statefulMethod(): void {
        console.log(`I am currently StateB.`);
    }
    singletonMutate(): State {
        this.value = -1;
        return this;
    }
}


class StateUser{
    state: State;
    constructor(state: State){
        this.state = state;
    }
}


const stateUser = new StateUser(new StateA());
stateUser.state.statefulMethod();
console.log('stateUser.state.value: ' + stateUser.state.value)
stateUser.state = new StateB();
stateUser.state.statefulMethod();
console.log('stateUser.state.value: ' + stateUser.state.value);
stateUser.state = new StateB();
stateUser.state.statefulMethod();
console.log('stateUser.state.value: ' + stateUser.state.value);
stateUser.state = new StateA();
stateUser.state.statefulMethod();
console.log('stateUser.state.value: ' + stateUser.state.value);

