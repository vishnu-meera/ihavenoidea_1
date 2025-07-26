package stackqueue

type MSNode struct {
	value int
	next *MSNode
	prev *MSNode
}

type MSHeap struct {
	data []*MSNode
}

func NewMSHeap() *MSHeap {
	return &MSHeap{ data : []*MSNode{} }
}

func (this *MSHeap) Enqueue(node *MSNode) {
	this.data = append(this.data, node)
	this.heapifyUp(len(this.data)-1)
}

func (this *MSHeap) Dequeue()(node *MSNode,ok bool) {
	if len(this.data) == 0 {
		return nil, false
	}
	n := this.data[0]
	lastIndex := len(this.data) - 1
	this.data[0] = this.data[lastIndex]
	this.data = this.data[:lastIndex]
	if len(this.data) > 0 {
		this.heapifyDown(0)
	}
	return n, true
}

func (this *MSHeap) Peek()(node *MSNode, ok bool) {
	if len(this.data) == 0 {
		return nil, false
	}
	return this.data[0], true
}

func (this *MSHeap) heapifyDown(index int) {
	n := len(this.data) - 1
	for {
		left , right, largest := 2 * index + 1, 2 * index + 2, index

		if left <= n && this.data[left].value >= this.data[largest].value {
			largest = left
		}
		if right <= n && this.data[right].value >= this.data[largest].value {
			largest = right
		}
		if largest == index {
			break
		}
		this.data[index] , this.data[largest] = this.data[largest] , this.data[index]
		index = largest
	}
}

func (this *MSHeap) heapifyUp(index int) {
	for index > 0 {
		parent := (index - 1) / 2
		if this.data[index].value >= this.data[parent].value {
			this.data[index] , this.data[parent] = this.data[parent] , this.data[index]
			index = parent
		}else {
			break
		}
	}
}

type MaxStack struct {
    head *MSNode
	tail *MSNode
	heap *MSHeap
}

func Constructor() MaxStack {
    head := &MSNode{}
	tail := &MSNode{}
	head.next = tail
	tail.prev = head

	return MaxStack {
		head : head,
		tail : tail,
		heap : NewMSHeap(),
	}
}

func (this *MaxStack) Push(x int)  {
    node := &MSNode{value : x}
	this.addNode(node)
	this.heap.Enqueue(node)
}

func (this *MaxStack) Pop() int {
	if this.head.next == this.tail {
		return -1
	}
	node := this.tail.prev 
	this.removeNode(node)
	return node.value
}

func (this *MaxStack) Top() int {
	if this.head.next == this.tail {
		return -1
	}
	return this.tail.prev.value
}

func (this *MaxStack) PeekMax() int {
	this.cleanup()
	node, ok := this.heap.Peek()
	if !ok {
		return -1
	}
	return node.value
}

func (this *MaxStack) PopMax() int {
	this.cleanup()
	node, ok:= this.heap.Dequeue()
	if !ok {
		return -1
	}
	this.removeNode(node)
	return node.value
}

func (this *MaxStack) addNode(node *MSNode) {
	last := this.tail.prev
	last.next = node
	node.prev = last
	node.next = this.tail
	this.tail.prev = node
}

func (this *MaxStack) removeNode(node *MSNode) {
	if node.prev == nil || node.next == nil {
        return
    }
	node.prev.next = node.next
	node.next.prev = node.prev
	node.next = nil
	node.prev = nil
}

func (this *MaxStack) cleanup() {
	for {
		node, ok := this.heap.Peek()
		if !ok || node.prev != nil {
			break
		}
		this.heap.Dequeue()
	}
}