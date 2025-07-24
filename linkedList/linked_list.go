package linkedList

import (
	"fmt"
)
type Node struct {
	val int
	next *Node
}

type LinkedList struct {
	head *Node
}

func (ll *LinkedList) Append(val int){
	node:= &Node{val:val}

	if ll.head == nil {
		ll.head = node
		return
	}

	curr := ll.head

	for curr.next != nil {
		curr = curr.next
	}
	curr.next = node
}

func (ll *LinkedList) Print(){
	curr := ll.head

	for curr != nil {
		fmt.Printf("%d -> ", curr.val)
		curr = curr.next
	}

	fmt.Println(nil)
}

func (ll *LinkedList) Remove(val int) {
	if ll.head == nil {
		return
	}

	if ll.head.val == val {
		ll.head = ll.head.next
		return
	}

	prev := ll.head
	curr := ll.head.next 

	for curr != nil {
		if curr.val == val {
			prev.next = curr.next
			return
		}
		prev = curr
		curr = curr.next
	}
}


type LinkedListTail struct {
	head *Node
	tail *Node 
}

func (ll *LinkedListTail) Append(val int){
	node:= &Node{val:val}

	if ll.head == nil {
		ll.head = node
		ll.tail = node
		return
	}
	ll.tail.next = node
	ll.tail = node
}

func (ll *LinkedListTail) Prepend(val int){
	node := &Node{val:val}
	node.next = ll.head
	ll.head = node

	if ll.tail == nil {
		ll.tail = node
	}
}

func (ll *LinkedListTail) Print(){
	curr := ll.head

	for curr != nil {
		fmt.Printf("%d -> ", curr.val)
		curr = curr.next
	}

	fmt.Println(nil)
}

func (ll *LinkedListTail) Remove(val int) {
	if ll.head == nil {
		return
	}

	if ll.head.val == val {
		ll.head = ll.head.next
		if ll.head == nil {
			ll.tail = nil
		}
		return
	}

	prev := ll.head
	curr := ll.head.next 

	for curr != nil {
		if curr.val == val {
			prev.next = curr.next
			if curr == ll.tail {
				ll.tail = prev
			}
			return
		}
		prev = curr
		curr = curr.next
	}
}

func (ll *LinkedList) Reverse(){
	if ll.head == nil {
		return
	}

	cur := ll.head
	next := nil
	previous := nil

	for curr != nil {
		next := curr.next
		curr.next = prev
		prev = curr
		curr = next
	}
}
