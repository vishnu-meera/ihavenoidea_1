package arrays

func FindMin(nums []int) int {

	left, right := 0, len(nums)-1

	for left < right {
		mid := left + (right-left)/2

		if nums[left] == nums[mid] && nums[mid] == nums[right] {
			left++
			right--
			continue
		}

		if nums[mid] > nums[right] {
			left = mid + 1
		} else {
			right = mid
		}
	}
	return nums[left]
}

//[2,2,2,0,2,2]
// left = 0, right = 5, mid = 2
// 0 === 2 && 5 === 2
// left 1, right 4 , mid =2
// 1 === 2 && 4 === 2
// left 2, right 3 , mid = 2
// 2 === 2 && 3 !== 2
// 2 > 0
// left 3, right 3

// return left 3 => 0
