abstract class Doc{
    constructor(contents: String){ 
        this.contents = contents; 
        this.memory = contents;
    }
    
    private _open: boolean = false;
    private contents: String;
    memory: String;

    open(): void{
        this._open = true;
    }
    close(): void{
        this._open = false;
    }
    save(): void{
        if(this._open) this.contents = this.memory;    
    }
    revert(): void{
        this.memory = this.contents;
    }
    read(): String{
        if(this._open) return this.contents;
        else return "File is closed!";
    }
    isOpen(): boolean{ return this._open; }
}

abstract class App{
    protected abstract createDocument(): Doc; // having this be protected allows the subclass to implement this
    docs: Array<Doc> = new Array<Doc>(); 
    newDocument(){  // newDocument calls the implemented class, which means that it can be run regardless of the document being created!
                    // the ultimate question though, is why do we need to do this if we are already creating the document in another class?
                    // couldn't we open and push to docs in that method? I guess this reduces wetness...
        const doc = this.createDocument();
        doc.open();
        this.docs.push(doc); 
    }
}



class MyApp extends App{
    constructor(){
        super();
    }
    protected createDocument(): Doc {
        return Date.now() % 2 === 0 ? new MyDoc() : new OtherDoc();
    }
}

class MyDoc extends Doc{
    constructor(){
        super("This is a MyDoc!");
    }
}
class OtherDoc extends Doc{
    constructor(){
        super("This is OtherDoc!");
    }
}


let l = 5;
console.log("Creating app.");
const app = new MyApp();
console.log(app);
for(let i=0; i<l; i++){
    console.log("Creating document.");
    app.newDocument();
    console.log(app.docs[i]);
}
console.log("Completed creation of documents. Woo.");
console.log();
console.log("Modifying documents!");
console.log();
for(let i=0; i<app.docs.length; i++){
    console.log(`reading document #${i}: ${app.docs[i].read()}`);
    console.log(`closing document #${i}: ${app.docs[i].close()}`);
    console.log(`reading document #${i}: ${app.docs[i].read()}`);
    console.log(`opening document #${i}: ${app.docs[i].open()}`);
    console.log(`editing memory document #${i}: ${app.docs[i].memory}`);
    console.log(`New memory.`); app.docs[i].memory = "New memory.";
    console.log(`reading document #${i}: ${app.docs[i].read()}`);
    console.log(`Saving document #${i}: ${app.docs[i].save()}`);
    console.log(`reading document #${i}: ${app.docs[i].read()}`);
    console.log(`closing document #${i}: ${app.docs[i].close()}`);
    console.log();
}