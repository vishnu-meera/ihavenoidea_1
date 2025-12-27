// ═══════════════════════════════════════════════════════════════
// 🔍 WHY SORTING IS CRITICAL - CONCRETE DEMONSTRATION
// ═══════════════════════════════════════════════════════════════

const treeCenter = require('./centreNodesOfTree.js')
const rootedTree = require('./rootedtree.js')

console.log(`
╔═══════════════════════════════════════════════════════════════╗
║     🚨 THE SORTING PROBLEM - WHY IT'S CRITICAL 🚨            ║
╚═══════════════════════════════════════════════════════════════╝
`)

// ═══════════════════════════════════════════════════════════════
// ENCODING WITHOUT SORTING (BROKEN!)
// ═══════════════════════════════════════════════════════════════

function encodeWithoutSort(node, children, memo = {}) {
    if (memo[node]) return memo[node]
    
    if (!children[node] || children[node].length === 0) {
        memo[node] = "()"
        return "()"
    }
    
    const childEncodings = []
    for (const child of children[node]) {
        const childEncoding = encodeWithoutSort(child, children, memo)
        childEncodings.push(childEncoding)
    }
    
    // ❌ NO SORTING! Just join directly
    const encoding = `(${childEncodings.join('')})`
    memo[node] = encoding
    
    return encoding
}

// ═══════════════════════════════════════════════════════════════
// ENCODING WITH SORTING (CORRECT!)
// ═══════════════════════════════════════════════════════════════

function encodeWithSort(node, children, memo = {}) {
    if (memo[node]) return memo[node]
    
    if (!children[node] || children[node].length === 0) {
        memo[node] = "()"
        return "()"
    }
    
    const childEncodings = []
    for (const child of children[node]) {
        const childEncoding = encodeWithSort(child, children, memo)
        childEncodings.push(childEncoding)
    }
    
    // ✅ SORTING! Creates canonical form
    childEncodings.sort()
    const encoding = `(${childEncodings.join('')})`
    memo[node] = encoding
    
    return encoding
}

// ═══════════════════════════════════════════════════════════════
// TEST CASE 1: Same structure, different node order in edges
// ═══════════════════════════════════════════════════════════════

console.log(`
┌─────────────────────────────────────────────────────────────┐
│ 📊 TEST 1: SAME TREE, DIFFERENT EDGE ORDER                  │
└─────────────────────────────────────────────────────────────┘

These are IDENTICAL trees, just edges listed differently:

Tree A:       1              Tree B:       1
             /|\\                          /|\\
            2 3 4                        4 3 2
           /   \\                        /   \\
          5     6                      6     5

Tree A edges: [[1,2], [1,3], [1,4], [2,5], [3,6]]
Tree B edges: [[1,4], [1,3], [1,2], [3,6], [2,5]]  (reversed order!)
`)

const treeA_edges = [[1,2], [1,3], [1,4], [2,5], [3,6]]
const treeB_edges = [[1,4], [1,3], [1,2], [3,6], [2,5]]

const rootedA = rootedTree(treeA_edges, 1)
const rootedB = rootedTree(treeB_edges, 1)

console.log("Tree A children map:", rootedA.children)
console.log("Tree B children map:", rootedB.children)

console.log("\n🔴 WITHOUT SORTING:")
const encodingA_noSort = encodeWithoutSort(1, rootedA.children)
const encodingB_noSort = encodeWithoutSort(1, rootedB.children)

console.log(`Tree A encoding: "${encodingA_noSort}"`)
console.log(`Tree B encoding: "${encodingB_noSort}"`)
console.log(`Are they equal? ${encodingA_noSort === encodingB_noSort}`)

if (encodingA_noSort !== encodingB_noSort) {
    console.log("\n❌ PROBLEM: Same tree, different encodings!")
    console.log("   These SHOULD be isomorphic but appear different!")
}

console.log("\n✅ WITH SORTING:")
const encodingA_withSort = encodeWithSort(1, rootedA.children)
const encodingB_withSort = encodeWithSort(1, rootedB.children)

console.log(`Tree A encoding: "${encodingA_withSort}"`)
console.log(`Tree B encoding: "${encodingB_withSort}"`)
console.log(`Are they equal? ${encodingA_withSort === encodingB_withSort}`)

if (encodingA_withSort === encodingB_withSort) {
    console.log("\n✅ SUCCESS: Same tree, same encoding!")
    console.log("   Correctly identified as isomorphic!")
}


// ═══════════════════════════════════════════════════════════════
// TEST CASE 2: Why order matters
// ═══════════════════════════════════════════════════════════════

console.log(`\n
┌─────────────────────────────────────────────────────────────┐
│ 📊 TEST 2: THE ROOT CAUSE - CHILDREN ORDER                  │
└─────────────────────────────────────────────────────────────┘

Consider a node with 3 children that have different encodings:
Child A: "()"
Child B: "(())"  
Child C: "(()())"

WITHOUT SORTING, encoding depends on processing order:
`)

const testChildren = {
    root: ['A', 'B', 'C'],
    A: [],
    B: ['X'],
    C: ['Y', 'Z'],
    X: [],
    Y: [],
    Z: []
}

console.log("Children of root: ['A', 'B', 'C']")
console.log("Child A encoding: '()'")
console.log("Child B encoding: '(())'")
console.log("Child C encoding: '(()())'")

console.log("\n🔴 WITHOUT SORTING:")
const rootEncoding_noSort = encodeWithoutSort('root', testChildren)
console.log(`Result: "${rootEncoding_noSort}"`)
console.log("Order: A, B, C → ()(())(()())")

// Now let's reverse the children order
const testChildrenReversed = {
    root: ['C', 'B', 'A'],  // Reversed!
    A: [],
    B: ['X'],
    C: ['Y', 'Z'],
    X: [],
    Y: [],
    Z: []
}

console.log("\nNow if children are stored as ['C', 'B', 'A']:")
const rootEncoding_noSort2 = encodeWithoutSort('root', testChildrenReversed, {})
console.log(`Result: "${rootEncoding_noSort2}"`)
console.log("Order: C, B, A → (()())(())()")
console.log(`\n❌ DIFFERENT! "${rootEncoding_noSort}" ≠ "${rootEncoding_noSort2}"`)
console.log("   Same structure, but different codes = FALSE NEGATIVE!")

console.log("\n✅ WITH SORTING:")
const rootEncoding_withSort = encodeWithSort('root', testChildren, {})
const rootEncoding_withSort2 = encodeWithSort('root', testChildrenReversed, {})
console.log(`Tree 1 result: "${rootEncoding_withSort}"`)
console.log(`Tree 2 result: "${rootEncoding_withSort2}"`)
console.log(`\n✅ SAME! "${rootEncoding_withSort}" === "${rootEncoding_withSort2}"`)
console.log("   Sorting creates CANONICAL form - always same result!")


// ═══════════════════════════════════════════════════════════════
// THE CORE PROBLEM EXPLAINED
// ═══════════════════════════════════════════════════════════════

console.log(`\n
╔═══════════════════════════════════════════════════════════════╗
║                    🎯 THE CORE PROBLEM                        ║
╚═══════════════════════════════════════════════════════════════╝

WITHOUT SORTING:
────────────────
• Encoding depends on ORDER children are processed
• Same tree structure can produce DIFFERENT encodings
• Graph traversal order affects the result
• Edge list order affects the result
• Results are NON-DETERMINISTIC

Example:
  Children [A, B, C] with codes ["()", "(())", "()"]
  → Without sort: "()(())()" if processed A,B,C
  → Without sort: "(())()()" if processed B,A,C
  → Different codes for SAME structure! ❌

WITH SORTING:
─────────────
• Creates CANONICAL FORM (standardized representation)
• Same structure ALWAYS produces same encoding
• Order-independent - consistent results
• Deterministic - same input → same output

Example:
  Children [A, B, C] with codes ["()", "(())", "()"]
  → Sort: ["()", "()", "(())"]
  → Result: ALWAYS "()()(())" ✅
  
  Children [C, B, A] with codes ["()", "(())", "()"]  
  → Sort: ["()", "()", "(())"]
  → Result: ALWAYS "()()(())" ✅
  
  SAME RESULT regardless of order! ✅


╔═══════════════════════════════════════════════════════════════╗
║                   💡 WHY IT'S CRITICAL                        ║
╚═══════════════════════════════════════════════════════════════╝

1. FALSE NEGATIVES:
   Without sorting, isomorphic trees might appear different
   → Algorithm says "NOT isomorphic" when they ARE
   
2. FALSE POSITIVES (less likely but possible):
   Without sorting, different trees might get same encoding by luck
   → Algorithm says "isomorphic" when they're NOT

3. NON-DETERMINISTIC:
   Same trees compared at different times might give different results
   → Unreliable algorithm
   
4. BREAKS THE ALGORITHM:
   The AHU algorithm REQUIRES canonical encoding
   → Without it, the algorithm is fundamentally broken


╔═══════════════════════════════════════════════════════════════╗
║                  🧠 MEMORY ANCHOR                             ║
╚═══════════════════════════════════════════════════════════════╝

"Sorting creates the FINGERPRINT"

Think of it like:
• Your fingerprint is UNIQUE to you
• It doesn't change based on which finger you scan first
• Similarly, tree encoding must be UNIQUE to structure
• It can't depend on which child we process first

Sorting = Creating a unique, order-independent fingerprint

Without sorting:
  🎲 Random encoding (depends on luck/order)
  
With sorting:
  🔒 Canonical encoding (always the same)


╔═══════════════════════════════════════════════════════════════╗
║                 ✅ THE SOLUTION                               ║
╚═══════════════════════════════════════════════════════════════╝

ALWAYS sort children encodings before wrapping:

  const childEncodings = children.map(encode)
  childEncodings.sort()  // ⚠️ CRITICAL!
  return \`(\${childEncodings.join('')})\`

This ensures:
✅ Same structure → Same encoding
✅ Order-independent
✅ Deterministic results
✅ Correct isomorphism detection

`)
