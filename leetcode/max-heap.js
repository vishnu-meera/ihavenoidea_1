

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