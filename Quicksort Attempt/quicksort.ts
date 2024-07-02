
//TODO: There is a problem where the duration expands twice as fast as expected, 10x the value = 20x the duration. Not sure why, im sure its a logic error somewhere.
function quickSort(a: Array<number>): Array<number>{
    if(a.length <= 1){
        return a;
    }

    let piv = 0;
    let left: number[] = [];
    const right: number[] = [];

    for(let i=1; i<a.length; i++){
        if(a[i] < a[piv]){
            left.push(a[i]);
        } else {
            right.push(a[i]);
        }
    }

    left = quickSort(left);
    left.push(a[0]);
    return left.concat(quickSort(right));
}


function generateRandomArray(size: number){
    let num = Math.floor(Math.random() * size);
    const a: number[] = [num];
    for(let i=1; i<size; i++){
        
            num = Math.random();
        
        a.push(num);
    }
    return a;
}

const size = 1000000;
const arr = generateRandomArray(size);
console.log(arr);
const time = Date.now();
const a2 = quickSort(arr);
const after = Date.now();
console.log(a2);
console.log(`Quicksorting ${size} values took ${after - time}ms`);