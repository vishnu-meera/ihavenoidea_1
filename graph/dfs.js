function dfs(root) {
    const visited = {}
    const stack = [root]
    const result = []

    while (stack.length) {
        const node = stack.pop()

        if (!(node.value in visited)) {
            visited[node.value] = true
            result.push(node.value)
            for (const n of node.neighbours) {
                stack.push(n)
            }
        }
    }

    return result
}


const nodeA = { value: 'A', neighbours: [] }
const nodeB = { value: 'B', neighbours: [] }
const nodeC = { value: 'C', neighbours: [] }
const nodeD = { value: 'D', neighbours: [] }

// Connect nodes
nodeA.neighbours = [nodeB, nodeC]
nodeB.neighbours = [nodeD]
nodeC.neighbours = [nodeD]
nodeD.neighbours = []

console.log(dfs(nodeA)) // Output: ['A', 'C', 'D', 'B'] (order may vary)