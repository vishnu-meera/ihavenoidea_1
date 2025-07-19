package main

import (
	"github.com/vishnu-meera/ihavenoidea_1/dt"
)

func main() {
	arr := dt.GetBasicArray()
	another := dt.GetBasicArray()
	dt.Reverse(&another)
	median := dt.FindTheMedian(arr, another)

	println("median ", median)
}
