"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function quickSort(a) {
    if (a.length <= 1) {
        // console.log("ended recursion, returning" + util.inspect(a));
        return a;
    }
    let piv = 0;
    let left = [];
    const right = [];
    for (let i = 1; i < a.length; i++) {
        if (a[i] < a[piv]) {
            left.push(a[i]);
        }
        else {
            right.push(a[i]);
        }
    }
    // console.log(`left: ${util.inspect(left)}`);
    // console.log(`right: ${util.inspect(right)}`);
    left = quickSort(left);
    left.push(a[0]);
    return left.concat(quickSort(right));
}
function generateRandomArray(size) {
    let num = Math.floor(Math.random() * size);
    const a = [num];
    for (let i = 1; i < size; i++) {
        num = Math.random();
        a.push(num);
    }
    return a;
}
const size = 10000000;
const arr = generateRandomArray(size);
const time = Date.now();
console.log(arr);
const a2 = quickSort(arr);
console.log(a2);
console.log(`Quicksorting ${size} values took ${Date.now() - time}ms`);
