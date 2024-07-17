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
let mapViewer: MapViewer = new MapViewer();
const map = new MapImage("full image contents".split(""));
const mapSection = new MapImageSection(map, 5, map.getContents().length);
mapViewer.read(map);
mapViewer.read(mapSection);