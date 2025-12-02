var moveZeroes = function(nums) {
    let left = 0
    for(let right = 0; right < nums.length; right++){
        if (nums[right] !== 0){
            let t = nums[right]
            nums[right] = nums[left]
            nums[left] = t
            left++
        }
    }
}

var moveZeroesToBeg = function(nums) {
    let left = nums.length-1
    for(let right = nums.length-1; right >=0; right--){
        if (nums[right] !== 0){
            let t = nums[right]
            nums[right] = nums[left]
            nums[left] = t
            left--
        }
    }
}

let nums = [0,1,0,3,12]
moveZeroesToBeg(nums)
console.log(nums)

//[0,0,1,12,3]
//.      L
//.  R