package trees

type TreeNode struct {
	value int
	left  *TreeNode
	right *TreeNode
	size  int
}

type BST struct {
	root *TreeNode
}

func NewBST() *BST {
	return &BST{root: nil}
}

func (t *BST) Add(value int) {
	node := &TreeNode{value: value, size: 1}
	if t.root == nil {
		t.root = node
	} else {
		currNode := t.root
		for {
			currNode.size++
			if node.value > currNode.value {
				if currNode.right == nil {
					currNode.right = node
					break
				} else {
					currNode = currNode.right
				}
			} else {
				if currNode.left == nil {
					currNode.left = node
					break
				} else {
					currNode = currNode.left
				}
			}
		}
	}
}

func (t *BST) PreOrder() []int {
	var result []int
	var stack []*TreeNode
	if t.root == nil {
		return result
	}
	stack = append(stack, t.root)

	for len(stack) > 0 {
		node := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		if node != nil {
			result = append(result, node.value)
			if node.right != nil {
				stack = append(stack, node.right)
			}
			if node.left != nil {
				stack = append(stack, node.left)
			}
		}
	}

	return result
}

func (t *BST) PostOrder() []int {
	var result []int
	var temp []int
	var stack []*TreeNode
	if t.root == nil {
		return temp
	}
	stack = append(stack, t.root)

	for len(stack) > 0 {
		node := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		if node != nil {
			temp = append(temp, node.value)
			if node.left != nil {
				stack = append(stack, node.left)
			}
			if node.right != nil {
				stack = append(stack, node.right)
			}
		}
	}

	for len(temp) > 0 {
		value := temp[len(temp)-1]
		temp = temp[:len(temp)-1]
		result = append(result, value)
	}

	return result
}

func (t *BST) InOrder() []int {
	var result []int
	var stack []*TreeNode
	if t.root == nil {
		return result
	}
	currNode := t.root

	for currNode != nil || len(stack) > 0 {
		for currNode != nil {
			stack = append(stack, currNode)
			currNode = currNode.left
		}
		node := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		result = append(result, node.value)
		currNode = node.right

	}

	return result
}

func (t *BST) Remove(value int) bool {
	if t.root == nil {
		panic("BST is empty")
	}

	currNode := t.root
	var parent *TreeNode

	for currNode != nil {
		if value < currNode.value {
			parent = currNode
			currNode = currNode.left
		} else if value > currNode.value {
			parent = currNode
			currNode = currNode.right
		} else {
			if currNode.left != nil && curr.Node.right != nil {
				succParent = currNode
				succ = currNode.right

				for succ.left != nil {
					succParent = succ
					succ = succ.left
				}

				currNode.value = succ.value

				if succParent.left == succ {
					succParent.left = succ.right
				} else {
					succParent.right = succ.right
				}

			} else {
				child := currNode.left
				if child == nil {
					child = currNode.right
				}
				if parent == nil {
					t.root = child
				} else if parent.left == currNode {
					parent.left = child
				} else {
					parent.right = child
				}
			}
			return true
		}
	}
	return false
}

func (t *BST) Search(value int) bool {
	if t.root == nil {
		return false
	}

	curr := t.root
	for curr != nil {
		if value == curr.value {
			return true
		} else if value < curr.value {
			curr = curr.left
		} else {
			curr = curr.right
		}
	}
	return false
}

func (t *BST) Min() (int, bool) {
	if t.root == nil {
		return 0, false
	}

	n := t.root
	for n.left != nil {
		n = n.left
	}
	return n.value, true
}

func (t *BST) Max() (int, bool) {
	if t.root == nil {
		return 0, false
	}

	n := t.root
	for n.right != nil {
		n = n.right
	}
	return n.value, true
}

func (t *BST) GetNode(value int) (*TreeNode, bool) {
	n := t.root
	for n != nil {
		if value < n.value {
			n = n.left
		} else if value > n.value {
			n = n.right
		} else {
			return n, true
		}
	}
	return nil, false
}

func (t *BST) InOrderSuccessor(value int) (*TreeNode, bool) {
	currNode := t.root
	var succ *TreeNode

	for currNode != nil {
		if value < currNode.value {
			succ = currNode
			currNode = currNode.left
		} else if value > currNode.value {
			currNode = currNode.right
		} else {
			break
		}
	}

	if currNode == nil {
		return nil, false
	}

	if currNode.right != nil {
		currNode = currNode.right
		for currNode.left != nil {
			currNode = currNode.left
		}
		return currNode, true
	}

	if succ != nil {
		return succ, true
	}

	return nil, false
}

func IsBST(root *TreeNode) bool {
	currNode := root
	var stack []*TreeNode
	var prev int
	hasPrevious := false

	for currNode != nil || len(stack) > 0 {
		for currNode != nil {
			stack = append(stack, currNode)
			currNode = currNode.left
		}

		node := stack[len(stack)-1]
		stack = stack[:len(stack)-1]

		if hasPrevious && node.value <= prev {
			return false
		}

		hasPrevious = true
		prev = node.value
		currNode = node.right
	}

	return true
}

type bounds struct {
	node           *TreeNode
	min, max       int
	minSet, maxSet bool
}

func IsBST(root *TreeNode) bool {
	stack := []bounds{{node: root}}
	for len(stack) > 0 {
		bound := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		value := bound.node.value

		if bound.minSet && value <= bound.min {
			return false
		}
		if bound.maxSet && value >= bound.max {
			return false
		}

		if bound.node.right != nil {
			stack = append(stack, bounds{
				node:   bound.node.right,
				max:    bound.max,
				maxSet: bound.maxSet,
				min:    value,
				minSet: true,
			})
		}

		if bound.node.left != nil {
			stack = append(stack, bounds{
				node:   bound.node.left,
				min:    bound.min,
				minSet: bound.minSet,
				max:    value,
				maxSet: true,
			})
		}
	}
	return true
}

func ConvertToSortedArray(root *TreeNode) []int {
	var result []int
	if root == nil {
		return result
	}

	var stack []*TreeNode
	currNode := root
	for currNode != nil || len(stack) > 0 {
		for currNode != nil {
			stack = append(stack, currNode)
			currNode = currNode.left
		}

		node := stack[len(stack)-1]
		stack = stack[:len(stack)-1]

		result = append(result, node.value)

		currNode = node.right
	}
	return result
}

func KthElement(root *TreeNode, k int) (int, bool) {
	if root == nil || k <= 0 || k > root.size {
		return 0, false
	}
	curr := root
	for curr != nil {
		leftSize := 0
		if curr.left != nil {
			leftSize = curr.left.size
		}
		if k == leftSize+1 {
			return curr.value, true
		} else if k <= leftSize {
			curr = curr.left
		} else {
			k = k - leftSize - 1
			curr = curr.right
		}
	}
	return 0, false
}

func LCA(a *TreeNode, b *TreeNode, root *TreeNode) (*TreeNode, bool) {
	if root == nil {
		return nil, false
	}
	curr := root
	for curr != nil {
		if a.value < curr.value && b.value < curr.value {
			curr = curr.left
		} else if a.value > curr.value && b.value > curr.value {
			curr = curr.right
		} else {
			return curr, true
		}
	}
	return nil, false
}
