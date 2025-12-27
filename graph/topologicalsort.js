function topologicalsort(edges){
	const graph ={}
	const degree = {}
	let totalnodes = 0
	for (const [from ,to] of edges) {
		if (!(graph[from])) graph[from] = []
		if (!(graph[to])) graph[to] = []
		if (degree[from]===undefined) degree[from] = 0
		if (degree[to]===undefined) degree[to] = 0

		graph[from].push(to)
		degree[to]++
	}

	const q = []
	for(const node in degree) {
		if (degree[node] === 0){
			q.push(node)
		}
	}
	
	const result = []
	while(q.length > 0){
		const node = q.shift()
		result.push(node)
		for(const neigbour of graph[node]){
			degree[neigbour]--
			if (degree[neigbour] === 0){
				q.push(neigbour)
			}
		}
	}
	if (totalnodes !== result.length){
		return null
	}
	return result
}


