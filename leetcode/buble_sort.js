const bubble_sort = (numbers) => {
    for (let i = numbers.length-1; i >0; i--) {
        for (let j = 0; j < i; j++) {
            if(numbers[j] > numbers[j+1]){
                c = numbers [j+1]
                numbers [j+1] = numbers[j]
                numbers[j] =c
            }
        }
    }
}


// [1,3,4,2,7,3,0,9] // 8-1 = 7
// for i 0 to n-1
//      if a[i] > a[i+1]
//          c = a[i+1]
//          a[i+1] = a[i]
//          a[i] = c