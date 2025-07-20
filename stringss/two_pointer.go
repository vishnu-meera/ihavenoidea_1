package stringss

func IsPalidrome(s string)bool {
	runes := []rune(s)
	left,right := 0, len(runes)-1

	for right > left {
		if runes[right] != runes[left]{
			return false
		}
		right--
		left++
	}
	return true
}

func ReveresedNumber(num int)int {
	revered := 0

	for num > 0{
		digit:= num % 10
		revered = revered*10 + digit
		num = num /10
	}
	return revered
}

func Anagram(s1 string, s2 string)bool {
	if len(s1) != len(s2) {
		return false
	}

	freq := make(map[rune]int)

	for _, value:= range s1 {
		freq[value]++
	}

	for _, value:= range s2 {
		freq[value]--
		if freq[value] < 0 {
			return false
		}
	}
	return true
}