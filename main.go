package main

import (
	"github.com/vishnu-meera/ihavenoidea_1/arrays"
)

func main() {
	arr := arrays.GetBasicArray()
	another := arrays.GetBasicArray()
	arrays.Reverse(&another)
	median := arrays.FindTheMedian(arr, another)

	println("median ", median)
}
