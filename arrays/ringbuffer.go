package arrays

import (
	"container/ring"
	"fmt"
	"time"
)

type RingBuffer[T any] struct {
	buffer []T
	head int
	tail int
	size int
	cap  int
}

func NewRingBuffer[T any](capacity int)*RingBuffer[T]{
	return &RingBuffer[T]{buffer: make([]T, capacity), cap : capacity}
}

func(rb *RingBuffer[T]) IsFull() bool { return rb.size == rb.cap } 
func(rb *RingBuffer[T]) IsEmpty() bool { return rb.size == 0 } 

func(rb *RingBuffer[T]) Push(value T) {
	if rb.IsFull() {
		rb.buffer[rb.head] = value
		rb.head = (rb.head + 1) % rb.cap 
		rb.tail = (rb.tail + 1) % rb.cap
	} else {
		rb.buffer[rb.tail] = value
		rb.tail = (rb.tail + 1) % rb.cap 
		rb.size++
	}
}

func(rb *RingBuffer[T]) Pop()(value T, ok bool) {
	if rb.IsEmpty() {
		var zero T 
		return zero, false
	}
	value = rb.buffer[rb.head]
	rb.head = (rb.head + 1)%rb.cap
	rb.size--
	return value, true
}

func(rb *RingBuffer[T]) Print(){
	fmt.Print("RingBuffer: ")

	for i, count:= rb.head, 0; count < rb.size ; count++ {
		fmt.Printf("%v ", rb.buffer[i])
		i = (i + 1) % rb.cap
	}
	fmt.Println()
}

func BenchmarkRingBuffer() {
	fmt.Println("\nBenchmarking container/ring vs custom RingBuffer...")
	const N = 1_000_000

	// Using container/ring
	start := time.Now()
	r := ring.New(N)
	for i := 0; i < N; i++ {
		r.Value = i
		r = r.Next()
	}
	durRing := time.Since(start)
	fmt.Printf("container/ring: %v\n", durRing)

	// Using custom ring buffer
	start = time.Now()
	rb := NewRingBuffer[int](N)
	for i := 0; i < N; i++ {
		rb.Push(i)
	}
	durCustom := time.Since(start)
	fmt.Printf("custom RingBuffer: %v\n", durCustom)
}