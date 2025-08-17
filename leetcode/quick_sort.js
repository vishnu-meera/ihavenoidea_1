const qs = (array, low, high ) =>{
    if (low>= high){
        return
    }

    const pivot = getPivotIndex(array,low,high)
    qs(array,low,pivot-1)
    qs(array,pivot+1,high)
}

const getPivotIndex = (array, low, high) => {
    const pivot = array[high]
    let idx = low - 1

    for (let i = low; i < high; i++) {
        if(array[i] <= pivot){
            idx++
            const temp = array[i]
            array[i] = array[idx]
            array[idx] = temp
        }
    }
    idx++
    array[high] = array[idx]
    array[idx] = pivot
    return idx
}

function qucik_sort(array) {
    console.log(array)
    qs(array,0,array.length-1)
    return array    
}

const arr = [3, 6, 8, 10, 1, 2, 1];
console.log(qucik_sort(arr));