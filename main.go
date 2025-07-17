package main

import "github.com/vishnu-meera/ihavenoidea_1/dt/basic_array"

func main() {
	arr := basic_array.GetBasicArray()

	for _, value := range arr {
		println(value)
	}
}
