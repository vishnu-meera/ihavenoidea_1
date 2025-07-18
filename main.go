package main

import (
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

	println("Array length:", len(arr))
	dt.Reverse(&arr)
	for _, value := range arr {
		println(value)
	}
	median := dt.FindTheMedian(arr, dt.GetBasicArray())

	println("median ", median)
}
