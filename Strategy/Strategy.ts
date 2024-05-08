class Composition<T>{
    private contents: Array<T>;
    private compositor: Compositor<T>;

    //linewidth, componentcount, linebreaks, linecount
    public constructor(compositor: Compositor<T>, contents: Array<T>){
        this.compositor = compositor;
        this.contents = contents;
    }
    public repair(){
       //funilly enough i saw the first example on p318 and thought it was bad and proceeded to just do this, re-read and saw that the next section explains what the right way is... this way. ha
        this.compositor.compose(this); 
       this.contents
    }
}

abstract class Compositor<T> {
    abstract compose(composition: Composition<T>): Composition<T>; 
}

class SimpleCompositor<T> extends Compositor<T>{
    compose(composition: Composition<T>): Composition<T>{
        //TODO: Do thing.
        return composition;
    }
}

class ArrayCompositor<T> extends Compositor<T>{
    compose(composition: Composition<T>): Composition<T>{
        //TODO: Do thing.
        return composition;
    }
}