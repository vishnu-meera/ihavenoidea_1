package main

import (
	"fmt"

	"github.com/vishnu-meera/ihavenoidea_1/dt"
)

func main() {
	arr := dt.GetBasicArray()

	for _, value := range arr {
		println(value)
	}

	arr = append(arr, 6, 7, 8)
	for _, value := range arr {
		println(value)
	}

	arr = append(arr[:0], arr[1:]...) // Remove the first element
	println("After deletion:")
	for _, value := range arr {
		println(value)
	}

	differentArr := []interface{}{42, "hello", 3.14}
	for _, v := range differentArr {
		fmt.Printf("value: %v, type: %T\n", v, v) // Type assertion for string
	}

	println("Array length:", len(arr))

	median := dt.findTheMedian(arr, dt.reverse(arr))

	println("median ", median)
}
