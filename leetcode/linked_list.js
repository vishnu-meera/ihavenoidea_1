class Node {
    constructor(value){
        this.value = value
        this.next = null
    }
}

class LinkedList {
    constructor(){
        this.head = null
        this.tail = null
        this.length = 0
    }
    push(value){
        const node = new Node(value)
        if(this.length === 0){
            this.tail =node
            this.head = node
        }else {
            this.tail.next = node
            this.tail = node
        }
        this.length+=1
    }
    pop(){
        if(this.length === 0){
            return undefined
        }
        let curNode = this.head // A
        let newTail = curNode  // A

        while(curNode.next){
            newTail = curNode // A B
            curNode = curNode.next // B C
        }

        this.tail = newTail
        this.tail.next = null
        this.length --
        if(this.length === 0){
            this.tail = null
            this.head = null
        }
        return curNode.value
    }
    unshift(value){
        const node = new Node(value)
        if(this.length === 0){
            this.tail =node
            this.head = node
        }else {
            node.next  = this.head
            this.head = node
        }
        this.length+=1
    }
    shift() {
        if(this.length === 0){
            return undefined
        }
        const curHead = this.head
        this.head = curHead.next
        this.length --
        if(this.length === 0){
            this.tail = null
        }
        return curHead.value
    }
    #_getNodeAt(index){
        if (index < 0 || index >= this.length) {
            return null
        }
        let curNode = this.head
        for (let i = 0; i < index; i++) {
            curNode = curNode.next     
        }
        return curNode
    }
    insertAt(value,index){ 
        if (index < 0 || index > this.length) {
            return false
        }
        if (index === 0){
            this.unshift(value)
            return true
        }
        if (index === this.length){
            this.push(value)
            return true
        }
        const newNode = new Node(value) 
        const prevNode = this.#_getNodeAt(index-1) 
        newNode.next = prevNode.next
        prevNode.next = newNode
        this.length+=1
        return true
    }
    removeAt(index){
        if (index < 0 || index >= this.length) {
            return undefined
        }
        if (index === 0){
            return this.shift()
        }
        if (index === this.length -1){
            return this.pop()
        }
        const prevNode = this.#_getNodeAt(index-1)
        const removeNode = prevNode.next
        prevNode.next = removeNode.next
        this.length--
        return removeNode.value
    }
    get(index){
        const node = this.#_getNodeAt(index)
        return node === null ? undefined: node.value
    }
}

const newLL = new LinkedList()