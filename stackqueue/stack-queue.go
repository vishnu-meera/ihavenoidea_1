package stackqueue

type StackArray[T any] struct{
	data []T
}

func (sa *StackArray[T]) Push(value T){
	sa.data = append(sa.data, value)
}

func (sa *StackArray[T]) Pop()(value T, ok bool){
	if len(sa.data) == 0{
		var zero T 
		return zero, false
	}
	val:= sa.data[len(sa.data) - 1]
	sa.data = sa.data[:len(sa.data)-1]
	return val, true
}

type StackNode[T any] struct{
	value T 
	next *StackNode[T]
}

type StackList[T any] struct {
	top *StackNode[T]
	size int
}

func (sl *StackList[T]) Push(value T){
	sl.top = &StackNode[T]{value: value, next: sl.top}
	sl.size++
}

func (sl *StackList[T]) Pop()(value T, ok bool){
	if sl.top == nil{
		var zero T 
		return zero, false
	}
	val:= sl.top.value
	sl.top = sl.top.next
	sl.size--
	return val, true
}

type QueueArray[T any] struct {
	buffer []T
	head int
	tail int 
	size int
	capacity int 
}

func NewQueueArray[T any](cap int)*QueueArray[T]{
	return &QueueArray[T]{buffer: make([]T, cap),capacity : cap}
}

func (qa *QueueArray[T]) Enqueue(value T){
	if qa.size == qa.capacity{
		qa.buffer[qa.head] = value
		qa.head = (qa.head+1)%qa.capacity
		qa.tail = (qa.tail+1)%qa.capacity
	}else {
		qa.buffer[qa.tail] = value
		qa.tail = (qa.tail+1)%qa.capacity
		qa.size++
	}
}

func (qa *QueueArray[T])Dequeue()(value T){
	if qa.size == 0 {
		var zero T
		return zero
	}

	val := qa.buffer[qa.head]
	qa.head = (qa.head+1)%qa.capacity
	qa.size--
	return val
}

type QueueNode[T any] struct{
	value T 
	next *QueueNode[T]
}

type QueueList[T any] struct {
	head *QueueNode[T]
	tail *QueueNode[T]
	size int
}

func (ql *QueueList[T]) Enqueue(value T){
	newNode := &QueueNode[T]{value: value}
	if ql.head == nil {
		ql.head = newNode
		ql.tail = newNode
	}else{
		ql.tail.next = newNode
		ql.tail = newNode
	}
	ql.size++
}

func (ql *QueueList[T]) Dequeue()(value T){
	if ql.head == nil{
		var zero T
		return zero
	}
	retVal := ql.head.value
	ql.head = ql.head.next
	if ql.head == nil {
		ql.tail = nil
	}
	ql.size--
	return retVal
}