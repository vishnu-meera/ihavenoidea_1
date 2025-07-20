package main

import (
	"fmt"

	"github.com/vishnu-meera/ihavenoidea_1/arrays"
	"github.com/vishnu-meera/ihavenoidea_1/stringss"
)

func main() {
	arr := arrays.GetBasicArray()
	another := arrays.GetBasicArray()
	arrays.Reverse(&another)
	median := arrays.FindTheMedian(arr, another)
	isPalidrome := stringss.IsPalidrome("malayalam")
	println("median ", median)
	println("IsPalidrome: ", isPalidrome)
	println("vishnu ispalindrome: ", stringss.IsPalidrome("vishnu"))
	println("reverse 1234567890123112345: ", stringss.ReveresedNumber(1234567890123112345))


	fmt.Println(stringss.Anagram("listen", "silent"))     // true
    fmt.Println(stringss.Anagram("hello", "oellh"))       // true
    fmt.Println(stringss.Anagram("hello", "world"))       // false
    fmt.Println(stringss.Anagram("aab", "abb"))           // false
    fmt.Println(stringss.Anagram("💖😊", "😊💖"))         // true
}
