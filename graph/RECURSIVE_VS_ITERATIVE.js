// ═══════════════════════════════════════════════════════════════
// 🔄 RECURSIVE VS ITERATIVE - SIDE BY SIDE COMPARISON
// ═══════════════════════════════════════════════════════════════

/*

┌─────────────────────────────────────────────────────────────┐
│ 📊 COMPARISON TABLE                                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│ Aspect          │ Recursive        │ Iterative              │
│ ────────────────┼──────────────────┼────────────────────────│
│ Code Length     │ ~20 lines ✅     │ ~60 lines ❌          │
│ Readability     │ High ✅          │ Medium ⚠️              │
│ Intuition       │ Natural ✅       │ Requires thinking ⚠️   │
│ State Mgmt      │ Automatic ✅     │ Manual (queues) ❌     │
│ Space (stack)   │ O(h) height ⚠️   │ O(w) width ⚠️          │
│ Debugging       │ Easier ✅        │ Harder ❌              │
│ Memoization     │ Built-in ✅      │ Separate logic ❌      │
│                                                              │
└─────────────────────────────────────────────────────────────┘


═══════════════════════════════════════════════════════════════
RECURSIVE APPROACH (Current Implementation)
═══════════════════════════════════════════════════════════════
*/

function encodeTreeRecursive(node, children, memo = {}) {
    // Already computed? Return cached result
    if (memo[node]) {
        return memo[node]
    }
    
    // Leaf node? Base case
    if (!children[node] || children[node].length === 0) {
        memo[node] = "()"
        return "()"
    }
    
    // Recursive case: encode all children
    const childEncodings = []
    for (const child of children[node]) {
        childEncodings.push(encodeTreeRecursive(child, children, memo))
    }
    
    // Sort and wrap
    childEncodings.sort()
    const encoding = `(${childEncodings.join('')})`
    memo[node] = encoding
    
    return encoding
}

/*
✅ PROS:
  - Clean, readable, intuitive
  - Natural for tree problems
  - Easy to understand and debug
  - Automatic call stack management
  - Memoization prevents recomputation

⚠️ CONS:
  - Stack overflow risk for VERY deep trees (rare in practice)
  - Uses call stack space O(height)


═══════════════════════════════════════════════════════════════
ITERATIVE APPROACH (Bottom-Up with Queue)
═══════════════════════════════════════════════════════════════
*/

function encodeTreeIterative(rootedTree) {
    const { children, root } = rootedTree
    const encoding = {}
    
    // Find all leaf nodes
    const allNodes = Object.keys(children)
    const leafNodes = []
    
    for(const node of allNodes) {
        if(children[node].length === 0) {
            leafNodes.push(node)
            encoding[node] = "()"
        }
    }
    
    // Calculate in-degrees
    const inDegree = {}
    for(const node of allNodes) {
        inDegree[node] = children[node].length
    }
    
    // Build parent map
    const parent = {}
    for(const node of allNodes) {
        for(const child of children[node]) {
            parent[child] = node
        }
    }
    
    // Process layer by layer
    let queue = [...leafNodes]
    const processed = new Set(leafNodes)
    
    while(queue.length > 0) {
        const nextQueue = []
        
        for(const node of queue) {
            const parentNode = parent[node]
            
            if(parentNode && !processed.has(parentNode)) {
                inDegree[parentNode]--
                
                if(inDegree[parentNode] === 0) {
                    const childEncodings = children[parentNode]
                        .map(child => encoding[child])
                        .sort()
                    
                    encoding[parentNode] = `(${childEncodings.join('')})`
                    processed.add(parentNode)
                    nextQueue.push(parentNode)
                }
            }
        }
        
        queue = nextQueue
    }
    
    return encoding[root]
}

/*
✅ PROS:
  - No stack overflow risk
  - Explicit control of processing order
  - Good for very deep trees

⚠️ CONS:
  - More complex code (~3x longer)
  - Need to manage: queues, in-degrees, parent map, processed set
  - Harder to understand and maintain
  - More opportunities for bugs


═══════════════════════════════════════════════════════════════
WHEN TO USE WHICH?
═══════════════════════════════════════════════════════════════

USE RECURSIVE when:
✅ Tree height is reasonable (< 1000 levels)
✅ You want clean, maintainable code
✅ Readability is important
✅ You're learning or teaching the algorithm
✅ Most real-world scenarios (99% of cases!)

USE ITERATIVE when:
✅ Tree is EXTREMELY deep (> 10,000 levels)
✅ Stack overflow is a concern
✅ You need explicit control of processing order
✅ Performance-critical systems with limited stack

VERDICT for isomorphic trees:
🏆 RECURSIVE WINS! 
   - Trees are rarely deep enough to overflow
   - Code clarity is more important
   - Easier to understand and maintain


═══════════════════════════════════════════════════════════════
EXAMPLE: Same Tree, Both Approaches
═══════════════════════════════════════════════════════════════

Tree:       1
           / \
          2   3
         /     \
        4       5

RECURSIVE TRACE:
-----------------
encode(1)
├─ encode(2)
│  └─ encode(4) → "()"
│  └─ return "(())"
├─ encode(3)
│  └─ encode(5) → "()"
│  └─ return "(())"
└─ sort ["(())", "(())"] 
└─ return "((())(()))"

ITERATIVE TRACE:
-----------------
1. Find leaves: [4, 5]
2. Encode leaves: {4: "()", 5: "()"}
3. Layer 1: Process 4, 5
   - 4's parent is 2, decrease inDegree[2]
   - 5's parent is 3, decrease inDegree[3]
   - Both now have inDegree 0
4. Layer 2: Process 2, 3
   - Encode 2: "(())"
   - Encode 3: "(())"
   - 2's parent is 1, decrease inDegree[1]
   - 3's parent is 1, decrease inDegree[1]
   - 1 now has inDegree 0
5. Layer 3: Process 1
   - Encode 1: "((())(()))"

RESULT: Both get "((())(()))" ✅

But recursive is MUCH cleaner! 🌟


═══════════════════════════════════════════════════════════════
CODE REUSE: THE WINNING STRATEGY
═══════════════════════════════════════════════════════════════

Our final implementation combines:

1. treeCenter() → Find center [REUSED ✅]
2. rootedTree() → Root the tree [REUSED ✅]
3. encodeTreeRecursive() → Encode [NEW, RECURSIVE ✅]

Benefits:
✨ Modular, testable components
✨ Each function has one job
✨ Easy to understand
✨ Easy to maintain
✨ Minimal code duplication

This is the BEST approach! 🏆


═══════════════════════════════════════════════════════════════
MEMORY MANTRA
═══════════════════════════════════════════════════════════════

"Recursion for trees is like breathing - natural and automatic"

1. Base case: Leaves → "()"
2. Recursive: Children first
3. Sort: Canonical form
4. Wrap: Parentheses
5. Cache: Memoize

CREC: Center, Root, Encode (Recursive), Compare

Remember: Trust the recursion! 🚀

*/
