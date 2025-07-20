package arrays

var basicArray = []int{1, 2, 3, 4, 5, 6}

func GetBasicArray() []int {
	return basicArray
}

func Reverse[T any](s *[]T) {
	slice := *s
	for i, j := 0, len(slice)-1; i < j; i, j = i+1, j-1 {
		slice[i], slice[j] = slice[j], slice[i]
	}
}
