function rootedTree(edges, rootvalue){
    const graph = {}

    for (const [a,b] of edges){
        if(!(graph[a])) graph[a] = []
        if(!(graph[b])) graph[b] = []
        graph[a].push(b)
        graph[b].push(a)
    }

    const parent = {[rootvalue]: null}
    const children = {}
    const queue = [rootvalue]

    while (queue.length > 0) {
        const node = queue.shift()
        children[node] = []

        for (const neigbours of graph[node]){
            if(!(neigbours in parent)){
                parent[neigbours] = node
                children[node].push(neigbours)
                queue.push(neigbours)
            }
        }
    }
    
    return { children, root: rootvalue, parent }
}

module.exports = rootedTree