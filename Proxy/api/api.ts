class Coordinate{
    private _x: number;
    private _y: number;
    private _desc: string;
    constructor(x: number, y: number, desc: string){
        this._x = x; this._y = y; this._desc = desc;
    }
    x(){return this._x;}
    y(){return this._y;}
    set(x: number, y: number){ this._x = x; this._y = y;}
    isRight(cord: Coordinate): boolean{
        return this.x() >= cord.x();
    }
    isBelow(cord: Coordinate): boolean{
        return this.y() >= cord.y();
    }
}

class CoordinatePlane{
    coordinates: Coordinate[];
    isBuilt: boolean = false;

    constructor(coordinates?: Coordinate[]){
        if(typeof coordinates === 'undefined'){
            this.coordinates = new Array<Coordinate>;
        } else {
            this.coordinates = coordinates;
        }
    }
    build(){
        this.coordinates.sort((a,b) => {
            const y = a.y() - b.y();
            const x = a.x() - b.x();
            return y !== 0 ? y : x;
        })
        this.isBuilt = true;
    }
    static construct(coords: Coordinate[]): Coordinate[]{
        return coords.sort((a,b) => {
            const y = a.y() - b.y();
            const x = a.x() - b.x();
            return y !== 0 ? y : x;
        })
    }
    static buildSubplane(coords: Coordinate[], start: Coordinate, end: Coordinate): Coordinate[]{
        //i need to pull out the index of the first time that coordinate shows up?
        //TODO: This probably doesn't work, because I think indexof relies on reference.
        //we'll figure it out
        return coords.slice(coords.indexOf(start), coords.indexOf(end));
    }
    add(coordinate: Coordinate){
        if(this.coordinates.length === 0){
            this.coordinates.push(coordinate);
            return;
        }

        let exists = false;
        for(let i=0; i<this.coordinates.length; i++){
            if(this.coordinates[i].x() === coordinate.x() && this.coordinates[i].y() === coordinate.y()){
                exists = true;
            }
        }

        if(!exists){
            this.coordinates.push(coordinate);
            this.isBuilt = false;   
        }    
    }
    remove(coordinate: Coordinate){
        this.coordinates.filter(value => value.x() === coordinate.x() && value.y() === coordinate.y());
    }
    read(){
        if(!this.isBuilt){
            return "Coordinate plane is not constructed yet!";
        }
        let str = `Coordinates:\n0:(${this.coordinates[0].x()},${this.coordinates[0].y()})`;
        let last = this.coordinates[0].y();
        for(let i=1; i<this.coordinates.length; i++){
            if(this.coordinates[i].y() !== last){
                str+="\n";
            }
            str+=`${i}: (${this.coordinates[i].x()},${this.coordinates[i].y()}) `;
            last = this.coordinates[i].y();
        }
        return str;
    }
}

abstract class AbstractMapImage{
    plane: CoordinatePlane;
    constructor(contents?: CoordinatePlane){

        if(typeof contents === 'undefined'){
            this.plane = new CoordinatePlane();
        } else {
            this.plane = contents;
        }
    }
    add(cord: Coordinate){
        this.plane.add(cord);
    }
    remove(cord: Coordinate){
        this.plane.remove(cord);
    }
    read(): string{
        return this.plane.read();
    }
}

class MapImage extends AbstractMapImage{
}

function generateInt(ceil: number): number{
    return Math.floor(Math.random() * ceil);
}

class MapImageSection extends AbstractMapImage{
    subject: MapImage;
    constructor(subject: MapImage, start: Coordinate, end: Coordinate){
        const coordinatePlane = new CoordinatePlane(CoordinatePlane.buildSubplane(subject.plane.coordinates, start, end))
        super(coordinatePlane);
        this.subject = subject;
    }   
}


const start = new Coordinate(2,3, "START?!?!?!");
const end = new Coordinate(5,6, "END!?!?!?")
const plane = new CoordinatePlane();
plane.add(start);
plane.add(end);

for(let i=0; i< 10; i++){
    for(let j=0; j<10; j++){
        const coord = new Coordinate(i,j, `${i}${j}?!??!`);
        plane.add(coord);
    }
}

const mapImage = new MapImage(plane);
console.log(mapImage.read());
mapImage.plane.build();
console.log(mapImage.read());

console.log("Building map section!");
const section = new MapImageSection(mapImage, start, end);
console.log(section.read());
section.plane.build();
console.log(section.read());