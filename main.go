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
	
	  fmt.Println("---------------------------")
    fmt.Println("--- LRU Cache Test ---")

    // Create a new cache with a capacity of 3
    cache := linkedList.NewLRUCache[string, int](3)

    // Put some items in the cache
    cache.Put("a", 1)
    cache.Put("b", 2)
    cache.Put("c", 3)
    cache.Print() // Expected: {c 3} -> {b 2} -> {a 1}

    // Get an item, which should move it to the front
    val, ok := cache.Get("a")
    if ok {
        fmt.Printf("Got key 'a', value: %d\n", val)
    }
    cache.Print() // Expected: {a 1} -> {c 3} -> {b 2}

    // Put a new item, which should evict the least recently used item ('b')
    cache.Put("d", 4)
    fmt.Println("Put key 'd', value 4. Key 'b' should be evicted.")
    cache.Print() // Expected: {d 4} -> {a 1} -> {c 3}

    // Try to get the evicted item
    _, ok = cache.Get("b")
    if !ok {
        fmt.Println("Key 'b' not found (correctly evicted).")
    }
}
