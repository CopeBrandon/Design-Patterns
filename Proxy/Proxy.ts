abstract class AbstractMapImage{
    protected contents: string[];
    constructor(contents: string[]){
        this.contents = contents;
    }
    
    getContents(): string[]{
        return this.contents;
    }
    read(): void{
        console.log("Reading... " + this.contents);
    }
}

class MapImage extends AbstractMapImage{
    // what would a mapimage do that an abstractmapimage not do? 
}

class MapImageSection extends AbstractMapImage{
    subject: MapImage;
    coordinate: [number, number];
    
    constructor(subject: MapImage, start: number, end: number){
        super(subject.getContents().slice(start, end));
        this.subject = subject;
        this.coordinate = [start, end];
    }
    read(): void{
        console.log(this.contents);
    }
}

class MapImageProxy extends AbstractMapImage{
    subject: MapImage;
    coordinate: [number, number];

    constructor(subject: MapImage, start: number, end: number){
        super(subject.getContents().slice(start, end));
        this.subject = subject;
        this.coordinate = [start, end];
    }
}

class MapViewer {
    read(map: AbstractMapImage): void{
        map.read();
    }
}

