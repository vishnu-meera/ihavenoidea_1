package main

import (
	"fmt"

	"github.com/vishnu-meera/ihavenoidea_1/arrays"
	"github.com/vishnu-meera/ihavenoidea_1/stringss"
	"github.com/vishnu-meera/ihavenoidea_1/linkedList"
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

	ll := &linkedList.LinkedList{}

    ll.Append(10)
    ll.Append(20)
    ll.Append(30)
    ll.Print() // 10 -> 20 -> 30 -> nil

    ll.Remove(20)
    ll.Print() // 10 -> 30 -> nil

	fmt.Println("---------------------------")


	lt := &linkedList.LinkedListTail{}

	lt.Append(10)
	lt.Append(20)
	lt.Append(30)
	lt.Print() // 10 -> 20 -> 30 -> nil

	lt.Prepend(5)
	lt.Print() // 5 -> 10 -> 20 -> 30 -> nil

	lt.Remove(30)
	lt.Print() // 5 -> 10 -> 20 -> nil

	lt.Remove(5)
	lt.Print() // 10 -> 20 -> nil

	lt.Remove(10)
	lt.Remove(20)
	lt.Print() // nil (head and tail should both be nil)
}
