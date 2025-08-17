class BinaryTree {
    constructor(value) {
        this.value = value
        this.left = null
        this.right = null
    }
}

function preOrderTraversal(node) {
    if (node === null){
        return
    }
    console.log('node value : ', node.value)
    preOrderTraversal(node.left)
    preOrderTraversal(node.right)
}

function inOrderTravesal(node){
    if (node === null){
        return
    }

    inOrderTravesal(node.left)
    console.log(node.value)
    inOrderTravesal(node.right)
}

function postOrderTraversal(node){
    if (node === null){
        return
    }

    console.log(node.value)
    postOrderTraversal(node.left)
    postOrderTraversal(node.right)
}