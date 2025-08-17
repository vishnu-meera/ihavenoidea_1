class Node {
    constructor(value){
        this.value = value
        this.prev = null
    }
}


class Queue{
    constructor(){
        this.head = null
        this.length = 0
    }

    push(value){
        const newNode = new Node(value)
        if (this.length === 0){
            this.head = newNode //A
        }else {
            newNode.prev = this.head // A<-B<-C<-D
            this.head = newNode
        }
        this.length++
    }

    pop(){
        if(this.length === 0){
            return undefined
        }
        const curHead = this.head
        this.head = this.head.prev
        curHead.prev = null
        this.length-- 
        return curHead.value
    }

    peek(){
        if(this.length === 0){
            return undefined
        }
        return this.head.value
    }
}