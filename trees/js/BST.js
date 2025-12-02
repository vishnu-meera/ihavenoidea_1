class Node {
    constructor(value) {
        this.left = null
        this.right = null
        this.value = value
        this.nodes = 0
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null
    }

    add(value) {
        const node = new Node(value)
        if (this.root === null) {
            this.root = node
        } else {
            let currNode = this.root
            while (true) {
                if (node.value < currNode.value) {
                    if (currNode.left === null) {
                        currNode.left = node
                        break
                    } else {
                        currNode = currNode.left
                    }
                } else {
                    if (currNode.right === null) {
                        currNode.right = node
                        break
                    } else {
                        currNode = currNode.right
                    }
                }
            }
        }

        this.nodes++
    }

    preOrder() {
        const stack = [this.root]
        const result = []
        while (stack.length) {
            const node = stack.pop()
            if (node) {
                result.push(node.value)
                if (node.right) {
                    stack.push(node.right)
                }
                if (node.left) {
                    stack.push(node.left)
                }
            }
        }

        return result
    }

    postOrder() {
        const stack = [this.root]
        const out = []
        const result = []
        while (stack.length) {
            const node = stack.pop()
            if (node) {
                out.push(node.value)
                if (node.left) {
                    stack.push(node.left)
                }
                if (node.right) {
                    stack.push(node.right)
                }
            }
        }
        while (out.length){
            let value = out.pop()
            result.push(value)
        }
        return result
    }

    inOrder() {
        const stack = []
        const result = []
        let currNode = this.root
        while (currNode ||stack.length) {
            while(currNode){
                stack.push(currNode)
                currNode = currNode.left
            }
            const node = stack.pop()
            result.push(node.value)
            currNode = node.right
        }

        return result
    }

    remove(value){
        if(this.root === null){
            throw ("BST is empty")
        }

        let currNode = this.root
        let parent = null
        while(currNode){
            if(val < currNode.value) {
                parent = currNode
                currNode = currNode.left
            } else if (value > currNode.value) {
                parent = currNode
                currNode = currNode.right
            } else {
                if(currNode.left && currNode.right){
                    let inorderSuccParent = currNode
                    let inorderSucc = currNode.right
                    while(inorderSucc.left) {
                        inorderSuccParent = inorderSucc
                        inorderSucc = inorderSucc.left
                    }
                    currNode.value = inorderSucc.value
                    if(inorderSuccParent.left === inorderSucc){
                        inorderSuccParent.left = inorderSucc.right
                    } else {
                         inorderSuccParent.right = inorderSucc.right
                    }
                } else {
                    let child = currNode.left ? currNode.left : currNode.right
                    if(parent === null){
                        parent = child
                    } else if (parent.left === currNode){
                        parent.left = child
                    } else {
                        parent.right = child
                    }
                } 
                return
            }
        }

    }

    search(value) {
        if (this.root === null) {
            return false
        }
        currNode = this.root 
        while (currNode) {
            if (currNode.value === value){
                return true
            }
            if (value < currNode.value){
                currNode = currNode.left
            } else {
                currNode = currNode.right
            }
        }
        return false
    }

}

const bst = new BinarySearchTree();
bst.add(5);
bst.add(3);
bst.add(7);
bst.add(2);
bst.add(4);
bst.add(6);
bst.add(8);

console.log('Pre-order:', bst.preOrder());   
console.log('Post-order:', bst.postOrder());
console.log('Post-order:', bst.inOrder());