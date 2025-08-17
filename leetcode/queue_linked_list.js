class Node {
    constructor(value){
        this.value = value
        this.next = null
    }
}

class Queue{
    constructor(){
        this.head = null
        this.tail = null
        this.length = 0
    }

    enqueue(value){
        const newNode = new Node(value)
        if (this.length === 0){
            this.head = newNode
            this.tail = newNode
        }else {
            this.tail.next = newNode
            this.tail = newNode
        }
        this.length++
    }

    deque(){
        if(this.length === 0){
            return undefined
        }
        const curHead = this.head
        this.head = this.head.next
        curHead.next = null
        this.length-- 
        if (this.length === 0){
            this.tail = null
        }
        return curHead.value
    }

    peek(){
        if(this.length === 0){
            return undefined
        }
        return this.head.value
    }
}