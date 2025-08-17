class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

class DoubleLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    push(value){
        const node = new Node(value)
        if(this.length === 0){
            this.tail = node
            this.head = node
        }else {
            this.tail.next = node
            node.prev = this.tail
            this.tail = node
        }
        this.length+=1
    }

    pop() {
        if (this.length === 0) {
            return undefined;
        }
        const currentTail = this.tail;
        if (this.length === 1) {
            this.head = null;
            this.tail = null;
        } else {
            this.tail = currentTail.prev;
            this.tail.next = null;
        }
        this.length -= 1;
        return currentTail.value;
    }

    unshift(value) {
        const node = new Node(value);
        if (this.length === 0) {
            this.head = node;
            this.tail = node;
        } else {
            node.next = this.head;
            this.head.prev = node;
            this.head = node;
        }
        this.length += 1;
    }

    shift() {
        if (this.length === 0) {
            return undefined;
        }
        const currentHead = this.head;
        if (this.length === 1) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = currentHead.next;
            this.head.prev = null;
        }
        this.length -= 1;
        return currentHead.value;
    }
    
    __getNode(index){
        if (index < 0 || index >= this.length) {
            return null
        }
        let curNode = this.head
        for (let i = 0; i < index; i++) {
            curNode = curNode.next     
        }
        return curNode
    }
    insertAt(value, index) {
        if (index < 0 || index > this.length) {
            return false;
        }
        if (index === 0) {
            this.unshift(value);
            return true;
        }
        if (index === this.length) {
            this.push(value);
            return true;
        }
        const newNode = new Node(value);
        const currentNode = this.__getNodeAt(index);
        newNode.next = currentNode;
        newNode.prev = currentNode.prev;
        currentNode.prev.next = newNode;
        currentNode.prev = newNode;
        this.length += 1;
        return true;
    }

    removeAt(index) {
        if (index < 0 || index >= this.length) {
            return undefined;
        }
        if (index === 0) {
            return this.shift();
        }
        if (index === this.length - 1) {
            return this.pop();
        }
        const currentNode = this.__getNodeAt(index);
        currentNode.prev.next = currentNode.next;
        currentNode.next.prev = currentNode.prev;
        this.length -= 1;
        return currentNode.value;
    }

    get(index){
        const node = this.__getNode(index)
        return node === null ? undefined: node.value
    }
}

const newLL = new LinkedList()