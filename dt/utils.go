package dt

var basicArray = []int{1, 2, 3, 4, 5}

func GetBasicArray() []int {
	return basicArray
}

func reverse[T any](s []T) {
	for i, j := 0, len(s)-1; i < j; i, j = i+1, j-1 {
		s[i], s[j] = s[j], s[i]
	}
}
