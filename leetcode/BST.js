class Node {
    constructor(value) {
        this.value = value
        this.left = null
        this.right = null
    }
}


class BST {
    constructor() {
        this.root = null
    }

    insert(value) {
        if (this.root === null){
            this.root = new Node(value)
        } else {
            this.__insert(this.root,value)
        }
    }

    __insert(root, value) {
        if (value < root.value) {
            if (root.left === null) {
                root.left = new Node(value)
            } else {
                this.__insert(root.left, value)
            }
        } else if (value > root.value) {
            if (root.right === null){
                root.right = new Node(value) 
            } else {
                this.__insert(root.right, value)
            }
        } 
    }

    print(){
        function printInOrder(root,res){
            if (root === null) {
                return
            }
            if (root.left !== null) {
                printInOrder(root.left, res)
            }
            res.push(root.value)
            if (root.right !== null) {
                printInOrder(root.right, res)
            }
        }
        let res = []
        printInOrder(this.root, res)
        console.log(res.join(','))
    }

    delete(value) {
        this.root = this.__delete(this.root, value);
    }

    __delete(root, value){
        if (root === null){
            return null
        }

        if (value < root.value){
            root.left = this.__delete(root.left, value)
        } else if ( value > root.value) {
            root.right = this.__delete(root.right, value)
        } else {
            if (root.left === null) {
                return root.right;
            } else if (root.right === null) {
                return root.left;
            }

            const temp = this.__getMinimumNode(root.right)
            root.value = temp.value
            root.right = this.__delete(root.right, temp.value);
        }

        return root
    }

    __getMinimumNode(root){
        let curr = root
        while(curr !== null & curr.left !== null){
            curr = curr.left
        }
        return curr
    }
}

let tree = new BST();
tree.insert(10);
tree.insert(5);
tree.insert(15);
tree.insert(2);
tree.insert(7);
tree.insert(12);
tree.insert(20);
console.log(JSON.stringify(tree.root, null, 2));
tree.print()