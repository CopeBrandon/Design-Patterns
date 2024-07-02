function quickSort(a) {
    if (a.length <= 1) {
        return a;
    }
    var piv = 0;
    var left = [];
    var right = [];
    for (var i = 1; i < a.length; i++) {
        if (a[i] < a[piv]) {
            left.push(a[i]);
        }
        else {
            right.push(a[i]);
        }
    }
    left = quickSort(left);
    left.push(a[0]);
    return left.concat(quickSort(right));
}
function generateRandomArray(size) {
    var num = Math.floor(Math.random() * size);
    var a = [num];
    for (var i = 1; i < size; i++) {
        num = Math.random();
        a.push(num);
    }
    return a;
}
var size = 1000000;
var arr = generateRandomArray(size);
console.log(arr);
var time = Date.now();
var a2 = quickSort(arr);
var after = Date.now();
console.log(a2);
console.log("Quicksorting ".concat(size, " values took ").concat(after - time, "ms"));
