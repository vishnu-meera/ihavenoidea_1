/**
 * @param {number[]} arr
 * @return {void} Do not return anything, modify arr in-place instead.
 */
var duplicateZeros = function(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === 0){
            arr.splice(i,0,0)
            const x = arr.pop()
            console.log(x)
            i++
        }
    }
};
var arr = [1,0,2,3,0,4,5,0]
console.log(arr)
duplicateZeros(arr)
console.log(arr)

// [1,0,2,3,0,4,5,0]  // [0]
// [1,0,0,2,3,0]