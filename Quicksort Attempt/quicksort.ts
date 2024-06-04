import util from 'node:util';

function quickSort(a: Array<number>): Array<number>{
    if(a.length <= 1){
        // console.log("ended recursion, returning" + util.inspect(a));
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
    // console.log(`left: ${util.inspect(left)}`);
    // console.log(`right: ${util.inspect(right)}`);
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
const time = Date.now();
console.log(arr);
const a2 = quickSort(arr);
console.log(a2);
console.log(`Quicksorting ${size} values took ${Date.now() - time}ms`);