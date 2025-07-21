package linkedList

import "fmt"

type DNode[T any] struct {
	value T
	next  *DNode[T]
	prev  *DNode[T]
}

type DoubleLinkedList[T any] struct {
	head *DNode[T]
	tail *DNode[T]
	size int
}

func (dl *DoubleLinkedList[T]) Append(value T) {
	newNode := &DNode[T]{value: value}
	if dl.head == nil {
		dl.head = newNode
		dl.tail = newNode
	} else {
		dl.tail.next = newNode
		newNode.prev = dl.tail
		dl.tail = newNode
	}
	dl.size++
}

func (dl *DoubleLinkedList[T]) Prepend(value T) {
	newNode := &DNode[T]{value: value}
	if dl.head == nil {
		dl.head = newNode
		dl.tail = newNode
	} else {
		newNode.next = dl.head
		dl.head.prev = newNode
		dl.head = newNode
	}
	dl.size++
}

func (dl *DoubleLinkedList[T]) RemoveFromFront() (T, bool) {
	var zero T
	if dl.head == nil {
		return zero, false
	}
	value := dl.head.value
	dl.head = dl.head.next
	if dl.head == nil {
		dl.tail = nil
	} else {
		dl.head.prev = nil
	}
	dl.size--
	return value, true
}

func (dl *DoubleLinkedList[T]) RemoveFromLast() (T, bool) {
	var zero T
	if dl.tail == nil {
		return zero, false
	}
	value := dl.tail.value
	dl.tail = dl.tail.prev
	if dl.tail == nil {
		dl.head = nil
	} else {
		dl.tail.next = nil
	}
	dl.size--
	return value, true
}

func (dl *DoubleLinkedList[T]) Size() int {
	return dl.size
}

func (dl *DoubleLinkedList[T]) Print() {
	curr := dl.head
	for curr != nil {
		fmt.Printf("%v -> ", curr.value)
		curr = curr.next
	}
	fmt.Println("nil")
}

func (dl *DoubleLinkedList[T]) ReversePrint() {
	curr := dl.tail
	for curr != nil {
		fmt.Printf("%v <- ", curr.value)
		curr = curr.prev
	}
	fmt.Println("nil")
}

func (dl *DoubleLinkedList[T]) Find(value T) bool {
	curr := dl.head
	for curr != nil {
		if curr.value == value {
			return true
		}
		curr = curr.next
	}
	return false
}

func (dl *DoubleLinkedList[T]) Delete(value T) bool {
	if dl.isEmpty() {
		return false
	}
	curr := dl.head
	for curr != nil {
		if curr.value == value {
			dl.size--
			if curr.prev == nil && curr.next == nil {
				dl.head = nil
				dl.tail = nil
				return true
			}
			if curr.prev == nil {
				dl.head = curr.next
				dl.head.prev = nil
				return true
			}
			if curr.next == nil {
				dl.tail = curr.prev
				if dl.tail != nil {
					dl.tail.next = nil
				}
				return true
			}
			curr.prev.next = curr.next
			curr.next.prev = curr.prev
			return true
		}
		curr = curr.next
	}
	return false
}

func (dl *DoubleLinkedList[T]) isEmpty() bool {
	return dl.size == 0
}
