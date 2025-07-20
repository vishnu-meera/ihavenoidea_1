package arrays

func FindTheMedian(nums1 []int, nums2 []int) float64 {
	m, n := len(nums1), len(nums2)
	if m == 0 && n == 0 {
		return 0
	}

	i, j, median1, median2, count := 0, 0, 0, 0, 0

	for count <= (m+n)/2 {
		median2 = median1
		if i < m && (j >= n || nums1[i] <= nums2[j]) {
			median1 = nums1[i]
			i++
		} else {
			median1 = nums2[j]
			j++
		}
		count++
	}

	if (m+n)%2 == 1 {
		return float64(median1)
	}
	return float64(median1+median2) / 2.0
}
