abstract class Vector{
    private _x0: number;
    private _y0: number;
    private _x1: number;
    private _y1: number;
    private _a: number;
    private _s: number;

    constructor(x0:number, y0:number, x1:number, y1:number, a:number, s:number){
        this._x0 = x0; this._y0 = y0; this._x1 = x1; this._y1 = y1; this._a = a; this._s = s;
    }
    x0(): number{ return this._x0; }
    y0(): number{ return this._y0; }
    x1(): number{ return this._x1; }
    y1(): number{ return this._y1; }
    a():  number{ return this._a;  }
    s():  number{ return this._s;  }
}

class CartesianVector extends Vector{
    //gets position at start(x0, y0) and position at tip(x1,y1) and generates vector angle
    constructor(x0: number, y0: number, x1: number, y1: number){
        const dx = x1 - x0;
        const dy = y1 - y0;
        const a = dx === 0 ? 0 : Math.atan(dy/dx);
        const m = dx === 0 ? 0 : dx/Math.cos(a);
        super(x0, y0, x1, y1, a, m); 
    }
}

class RadialVector extends Vector{
    //gets position at start(x0, y0), scalar multiplier or magnitude(s), and vector angle(a), and generates position at tip(x1, y1)
    constructor(x0: number, y0: number, a: number, s: number){
        const x1 = 0;
        const y1 = 0;
        super(x0, y0, 0, 0, a, s);
    }
}

/**
 * @enum {number}
 */
enum VectorTypes{ RADIAL, CARTESIAN }

/**
 * @param {VectorTypes} vectorTypes - {@link VectorTypes} Enum describing which vector to build. 
 *  require different components in order to work or else it will throw an error.
 * 
 * @param {Object} VectorComponents - Destructured object that contains required components of 
 * @param {number} [x0=0] - Origin point of vector in X direction. Defaults to 0.
 * @param {number} [y0=0] - Origin point of vector in Y direction. Defaults to 0.
 * @param {number} [x1] - Tip point of vector in X direction. Required for CartesianVector.
 * @param {number} [y1] - Tip point of vector in X direction. Required for CartesianVector.
 * @param {number} [a] - Origin point of vector in X direction. Required for RadialVector.
 * @param {number} [a] - Origin point of vector in X direction. Required for RadialVector.
 * @returns {Vector} Vector containing all data of relevant position, magnitude, and angle relative to origin of vector.
 * @returns {Error} Error if vector format not properly followed.
 */
class VectorBuilder{
    static VectorTypes = VectorTypes;
    static build(
        vectorType: VectorTypes, 
        {x0 = 0, y0 = 0, x1, y1, a, s}: {x0?: number, y0?: number, x1?: number, y1?: number, a?: number, s?: number})
    : Vector | Error{
        console.log(`Building Vector:${vectorType}. x0: ${x0} y0: ${y0}, x1: ${x1}, y1: ${y1}, a: ${a}, s:${s}`);
        switch(vectorType){
            case VectorTypes.CARTESIAN:
                if(x1 === undefined || y1 === undefined){
                    return Error("Vector format not followed, requires x1 and y1 for CartesianVector.");
                }
                return new CartesianVector(x0, y0, x1, y1);
            case VectorTypes.RADIAL:
                if(a === undefined || s === undefined){
                    let e = Error("asdf");
                    
                    return new Error("Vector format not followed, requires a and s for RadialVector.");
                }
                return new RadialVector(x0, y0, a, s);
            default: return Error("erm...? How did you pass in something that wasn't a VectorType?");
        }
    }
}

let v = VectorBuilder.build(VectorBuilder.VectorTypes.CARTESIAN, { x0: 0, y0: 0, x1: 1, y1: 1});
console.log(v);
v = VectorBuilder.build(VectorBuilder.VectorTypes.RADIAL, { x0: 0, y0: 0, a: 1, s: 1});
console.log(v);
v = VectorBuilder.build(VectorBuilder.VectorTypes.CARTESIAN, { x0: 0, y0: 0, a: 1, s: 1});
console.log(v);

//TODO: figure out how to handle errors on the output side.