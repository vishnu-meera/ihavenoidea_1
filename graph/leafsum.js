function leafsum(root){
    let total = 0
    let stack = [root]
    let visited = {}

    while (stack.length > 0) {
        const node = stack.pop()
        if (!(node.id in visited)) {
            visited[node.id] = true
            if (node.children.length === 0){
                total+= node.value
                continue
            }else {
                for (const child of node.children) {
                    stack.push(child)
                }
            }
        }
    }

    return total
}