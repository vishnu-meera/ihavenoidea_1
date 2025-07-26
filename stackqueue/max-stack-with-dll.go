package stackqueue

type Ordered interface {
    ~int | ~float64 | ~string
}

type MaxStackNode[T Ordered] struct {
	value T
	next  *MaxStackNode[T]
	prev  *MaxStackNode[T]
}

type MaxStackGeneric[T Ordered] struct {
	head *MaxStackNode[T]
	tail *MaxStackNode[T]
	heap *MaxHeap[T]
}

func ConstructorGeneric[T Ordered]() *MaxStackGeneric[T] {
	head := &MaxStackNode[T]{}
	tail := &MaxStackNode[T]{}
	head.next = tail
	tail.prev = head

	return &MaxStackGeneric[T]{
		head: head,
		tail: tail,
		heap: NewMaxHeap[T](),
	}
}

func (ms *MaxStackGeneric[T]) Push(val T) {
	node := &MaxStackNode[T]{value: val}
	ms.addNode(node)
	ms.heap.Enqueue(node)
}

func (ms *MaxStackGeneric[T]) Pop() (T, bool) {
	if ms.Empty() {
		var zero T
		return zero, false
	}
	node := ms.tail.prev
	ms.removeNode(node)
	return node.value, true
}

func (ms *MaxStackGeneric[T]) Top() (T, bool) {
	if ms.Empty() {
		var zero T
		return zero, false
	}
	return ms.tail.prev.value, true
}

func (ms *MaxStackGeneric[T]) PeekMax() (T, bool) {
	ms.cleanup()
	node, ok := ms.heap.Peek()
	if !ok {
		var zero T
		return zero, false
	}
	return node.value, true
}

func (ms *MaxStackGeneric[T]) PopMax() (T, bool) {
	ms.cleanup()
	node, ok := ms.heap.Dequeue()
	if !ok {
		var zero T
		return zero, false
	}
	ms.removeNode(node)
	return node.value, true
}

func (ms *MaxStackGeneric[T]) Empty() bool {
	return ms.head.next == ms.tail
}

func (ms *MaxStackGeneric[T]) addNode(node *MaxStackNode[T]) {
	last := ms.tail.prev
	last.next = node
	node.prev = last
	node.next = ms.tail
	ms.tail.prev = node
}

func (ms *MaxStackGeneric[T]) removeNode(node *MaxStackNode[T]) {
	node.prev.next = node.next
	node.next.prev = node.prev
	node.prev = nil
	node.next = nil
}

func (ms *MaxStackGeneric[T]) cleanup() {
	for {
		node, ok := ms.heap.Peek()
		if !ok || node.prev != nil || node.next != nil {
			break
		}
		ms.heap.Dequeue()
	}
}

type MaxHeap[T Ordered] struct {
	data []*MaxStackNode[T]
}

func NewMaxHeap[T Ordered]() *MaxHeap[T] {
	return &MaxHeap[T]{data: []*MaxStackNode[T]{}}
}

func (mh *MaxHeap[T]) Enqueue(node *MaxStackNode[T]) {
	mh.data = append(mh.data, node)
	mh.heapifyUp(len(mh.data) - 1)
}

func (mh *MaxHeap[T]) Dequeue() (*MaxStackNode[T], bool) {
	if len(mh.data) == 0 {
		return nil, false
	}
	top := mh.data[0]
	last := len(mh.data) - 1
	mh.data[0] = mh.data[last]
	mh.data = mh.data[:last]
	mh.heapifyDown(0)
	return top, true
}

func (mh *MaxHeap[T]) Peek() (*MaxStackNode[T], bool) {
	if len(mh.data) == 0 {
		return nil, false
	}
	return mh.data[0], true
}

func (mh *MaxHeap[T]) heapifyUp(index int) {
	for index > 0 {
		parent := (index - 1) / 2
		if mh.data[index].value <= mh.data[parent].value {
			break
		}
		mh.data[parent], mh.data[index] = mh.data[index], mh.data[parent]
		index = parent
	}
}

func (mh *MaxHeap[T]) heapifyDown(index int) {
	n := len(mh.data)
	for {
		largest := index
		left := 2*index + 1
		right := 2*index + 2

		if left < n && mh.data[left].value > mh.data[largest].value {
			largest = left
		}
		if right < n && mh.data[right].value > mh.data[largest].value {
			largest = right
		}

		if largest == index {
			break
		}
		mh.data[index], mh.data[largest] = mh.data[largest], mh.data[index]
		index = largest
	}
}
