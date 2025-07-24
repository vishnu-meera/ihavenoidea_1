package linkedList


type CNode[T comparable] struct {
	value T
	next *CNode[T]
	prev *CNode[T]
}

type CircularDeque[T comparable] struct {
	head *CNode[T]
	tail *CNode[T]
	size int
	capacity int
}

func NewCircularDeque[T comparable](capacity int) *CircularDeque[T] {
	return &CircularDeque[T]{capacity:capacity}
}

func (cd *CircularDeque[T comparable]) IsEmpty() bool { return cd.size == 0 }
func (cd *CircularDeque[T comparable]) IsFull() bool { return cd.size == cd.capacity }

func (cd *CircularDeque[T comparable]) PushFront(value T) (ok bool) {
	if cd.isFull() {
		return false
	}

	newNode := &CNode[T]{value: value}
	if cd.head == nil {
		cd.head = newNode
		cd.tail = newNode
		newNode.next = newNode
		newNode.prev = newNode
	}else {
		newNode.next = cd.head
		newNode.prev = cd.tail
		cd.tail.next = newNode
		cd.head.prev = newNode
		cd.head = newNode
	}
	cd.size++
	return true
}

func (cd *CircularDeque[T comparable]) PushBack(value T) (ok bool) {
	if cd.isFull() {
		return false
	}

	newNode := &CNode[T]{value: value}
	if cd.head == nil {
		cd.head = newNode
		cd.tail = newNode
		newNode.next = newNode
		newNode.prev = newNode
	}else {
		newNode.next = cd.head
		newNode.prev = cd.tail
		cd.tail.next = newNode
		cd.head.prev = newNode
		cd.tail = newNode
	}
	cd.size++
	return true
}

func (cd *CircularDeque[T comparable]) PopFront() (value T, ok bool) {
	if cd.isEmpty() {
		var zero T
		return zero, false
	}
	if cd.size == 1 {
		value:= cd.head.value
		cd.head = nil
		cd.tail = nil
		cd.size = 0
		return value, true
	}

	value:= cd.head.value
	cd.head = cd.head.next
	cd.tail.next = cd.head
	cd.head.prev = cd.tail
	cd.size--
	return value, true
}

func (cd *CircularDeque[T comparable]) PopBack() (value T, ok bool) {
	if cd.isEmpty() {
		var zero T
		return zero, false
	}	

	if cd.size == 1 {
		value:= cd.head.value
		cd.head = nil
		cd.tail = nil
		cd.size = 0
		return value, true
	}

	value:= cd.tail.value
	cd.tail = cd.tail.prev
	cd.head.prev = cd.tail
	cd.tail.next = cd.head
	cd.size--
	return value, true
}

func (dq *CircularDeque[T]) Print() {
	if dq.IsEmpty() {
		fmt.Println("(empty)")
		return
	}
	curr := dq.head
	for i := 0; i < dq.size; i++ {
		fmt.Printf("%v <-> ", curr.value)
		curr = curr.next
	}
	fmt.Println("(head)")
}
