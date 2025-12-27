

class MaxHeap {
    constructor () {
        this.heap = []
    }
    getParentIndex(idx) {
        return Math.floor((idx-1)/2)
    }
    getLeftIndex(idx) {
        return 2*idx+1
    }
    getRightndex(idx) {
        return 2*idx+2
    }
    swap(idx1,idx2){
        [this.heap[idx1],this.heap[idx2]] = [this.heap[idx2],this.heap[idx1]] 
    }
    heapifyUp(idx) {
        if(idx === 0) {
            return;
        }

        const parentIdx = this.getParentIndex(idx)
        if (this.heap[parentIdx] < this.heap[idx]){
            this.swap(parentIdx,idx)
            this.heapifyUp(parentIdx)
        }
    }
    heapifyDown(idx) {
        let largestIdx = idx
        const leftIdx = this.getLeftIndex(idx)
        const rightIdx = this.getRightndex(idx)

        if(leftIdx < this.heap.length && this.heap[leftIdx] > this.heap[largestIdx]){
            largestIdx = leftIdx
        }
        if(rightIdx < this.heap.length && this.heap[rightIdx] > this.heap[largestIdx]){
            largestIdx = rightIdx
        }

        if(largestIdx !== idx){
            this.swap(largestIdx,idx)
            this.heapifyDown(largestIdx)
        }
    }
    push(item){
        this.heap.push(item)
        this.heapifyUp(this.heap.length-1)
    }
    pop(){
        if(this.heap.length === 0){
            throw new Error("heap is empty")
        }
        if(this.heap.length === 1){
            return this.heap.pop()
        }
        const max = this.heap[0]
        this.heap[0] = this.heap.pop()
        this.heapifyDown(0)
        return max
    }
    peek() {
        if (this.heap.length === 0) {
            throw new Error('Heap is empty');
        }
        return this.heap[0];
    }

    size() {
        return this.heap.length;
    }
}

// Index Heap - allows O(log n) update/delete of arbitrary elements by key
class IndexedMaxHeap {
    constructor() {
        this.heap = []           // stores keys (indices)
        this.position = {}       // maps key -> position in heap
        this.values = {}         // maps key -> actual value
    }

    getParentIndex(idx) {
        return Math.floor((idx-1)/2)
    }

    getLeftIndex(idx) {
        return 2*idx+1
    }

    getRightIndex(idx) {
        return 2*idx+2
    }

    swap(idx1, idx2) {
        // Update position map when swapping
        const key1 = this.heap[idx1]
        const key2 = this.heap[idx2]
        
        this.position[key1] = idx2
        this.position[key2] = idx1
        
        [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]]
    }

    heapifyUp(idx) {
        if(idx === 0) return

        const parentIdx = this.getParentIndex(idx)
        const key = this.heap[idx]
        const parentKey = this.heap[parentIdx]

        if (this.values[parentKey] < this.values[key]) {
            this.swap(parentIdx, idx)
            this.heapifyUp(parentIdx)
        }
    }

    heapifyDown(idx) {
        let largestIdx = idx
        const leftIdx = this.getLeftIndex(idx)
        const rightIdx = this.getRightIndex(idx)

        if(leftIdx < this.heap.length) {
            const key = this.heap[largestIdx]
            const leftKey = this.heap[leftIdx]
            if(this.values[leftKey] > this.values[key]) {
                largestIdx = leftIdx
            }
        }

        if(rightIdx < this.heap.length) {
            const key = this.heap[largestIdx]
            const rightKey = this.heap[rightIdx]
            if(this.values[rightKey] > this.values[key]) {
                largestIdx = rightIdx
            }
        }

        if(largestIdx !== idx) {
            this.swap(largestIdx, idx)
            this.heapifyDown(largestIdx)
        }
    }

    // Insert or update with key-value pair
    push(key, value) {
        if(this.contains(key)) {
            // Update existing
            this.update(key, value)
        } else {
            // Insert new
            this.values[key] = value
            this.heap.push(key)
            this.position[key] = this.heap.length - 1
            this.heapifyUp(this.heap.length - 1)
        }
    }

    pop() {
        if(this.heap.length === 0) {
            throw new Error("heap is empty")
        }
        if(this.heap.length === 1) {
            const key = this.heap.pop()
            delete this.position[key]
            const value = this.values[key]
            delete this.values[key]
            return {key, value}
        }

        const maxKey = this.heap[0]
        const maxValue = this.values[maxKey]
        
        const lastKey = this.heap.pop()
        this.heap[0] = lastKey
        this.position[lastKey] = 0
        delete this.position[maxKey]
        delete this.values[maxKey]
        
        this.heapifyDown(0)
        return {key: maxKey, value: maxValue}
    }

    peek() {
        if (this.heap.length === 0) {
            throw new Error('Heap is empty')
        }
        const key = this.heap[0]
        return {key, value: this.values[key]}
    }

    // Check if key exists in heap
    contains(key) {
        return this.position.hasOwnProperty(key)
    }

    // Update value for existing key - O(log n)
    update(key, newValue) {
        if(!this.contains(key)) {
            throw new Error(`Key ${key} not found in heap`)
        }

        const oldValue = this.values[key]
        this.values[key] = newValue
        const pos = this.position[key]

        if(newValue > oldValue) {
            this.heapifyUp(pos)
        } else if(newValue < oldValue) {
            this.heapifyDown(pos)
        }
    }

    // Delete specific key - O(log n)
    delete(key) {
        if(!this.contains(key)) {
            throw new Error(`Key ${key} not found in heap`)
        }

        const pos = this.position[key]
        const value = this.values[key]

        if(pos === this.heap.length - 1) {
            this.heap.pop()
            delete this.position[key]
            delete this.values[key]
            return value
        }

        const lastKey = this.heap.pop()
        this.heap[pos] = lastKey
        this.position[lastKey] = pos
        delete this.position[key]
        delete this.values[key]

        // May need to heapify up or down
        const parentIdx = this.getParentIndex(pos)
        if(parentIdx >= 0 && this.values[this.heap[parentIdx]] < this.values[lastKey]) {
            this.heapifyUp(pos)
        } else {
            this.heapifyDown(pos)
        }

        return value
    }

    size() {
        return this.heap.length
    }
}

// Example usage:
// const heap = new IndexedMaxHeap()
// heap.push('task1', 10)
// heap.push('task2', 20)
// heap.push('task3', 15)
// heap.update('task1', 25)  // O(log n) - can't do this with regular heap!
// heap.delete('task2')       // O(log n) - remove specific element
// console.log(heap.peek())   // {key: 'task1', value: 25}