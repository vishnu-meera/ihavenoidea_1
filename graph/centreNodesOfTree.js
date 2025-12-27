function treeCenter(edges){
    // STEP 1: Build the graph and count degrees (connections)
    const graph = {}
    const degree = {}
    let n = 0  // Total number of nodes
    
    // Build graph dynamically (handles ANY node numbers!)
    for(const [a,b] of edges){
        // Initialize if first time seeing this node
        if(!graph[a]) {
            graph[a] = []
            degree[a] = 0
            n++  // New node discovered!
        }
        if(!graph[b]) {
            graph[b] = []
            degree[b] = 0
            n++  // New node discovered!
        }
        
        // Add bidirectional edges
        graph[a].push(b)
        graph[b].push(a)
        degree[a]++
        degree[b]++
    }

    // STEP 2: Find all leaf nodes (degree = 1)
    let leaves = []
    for(const node in degree){
        if(degree[node] === 1){
            leaves.push(node)
        }
    }

    // STEP 3: "Peel the onion" - remove leaves layer by layer
    let remainingNodes = n
    
    while(remainingNodes > 2){
        // Remove current layer of leaves
        remainingNodes -= leaves.length
        const newLeaves = []
        
        // For each leaf in current layer
        for(const leaf of leaves){
            // Find its neighbor
            for(const neighbor of graph[leaf]){
                degree[neighbor]--  // Remove connection
                
                // If neighbor becomes a leaf, add to next layer
                if(degree[neighbor] === 1){
                    newLeaves.push(neighbor)
                }
            }
        }
        
        leaves = newLeaves
    }
    
    // STEP 4: Return the center(s)
    return leaves
}

module.exports = treeCenter

// Test it!
if (require.main === module) {
    const edges1 = [[0,1], [1,2], [1,3], [3,4]]
    console.log("Tree 1 center:", treeCenter(edges1))

    const edges2 = [[0,1], [1,2], [2,3]]
    console.log("Tree 2 center:", treeCenter(edges2))

    const edges3 = [[0,1], [0,2], [0,3], [0,4]]
    console.log("Tree 3 center (star):", treeCenter(edges3))

    // Test with RANDOM node numbers! (your scenario)
    const edges4 = [[6,7], [7,8], [7,9], [8,10]]
    console.log("Tree 4 center (random nodes):", treeCenter(edges4))

    // Test with completely random order
    const edges5 = [[100,200], [50,100], [200,300]]
    console.log("Tree 5 center (crazy random):", treeCenter(edges5))
}