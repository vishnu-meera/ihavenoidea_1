package stackqueue

type MaxStackNode[T int | float64] struct {
	value T
	maxValue T
	next *MaxStackNode[T]
}

type MaxStackList[T int | float64] struct {
	top *MaxStackNode[T]
}

func (sa *MaxStackList[T])Push(val T) {
	newMax := val 
	if sa.top != nil && sa.top.maxValue > val {
		newMax = sa.top.maxValue
	}
	sa.top = &MaxStackNode{value: val, maxValue: newMax, next: sa.top}
}

func (sa *MaxStackList[T])Pop()(val T) {
	if sa.top == nil {
		var zero T
		return zero
	}

	val := sa.top.value 
	sa.top = sa.top.next 
	return val
}

func (sa *MaxStackList[T])GetMax()(val T) {
	if sa.top == nil {
		var zero T 
		return zero
	}
	return sa.top.maxValue
}