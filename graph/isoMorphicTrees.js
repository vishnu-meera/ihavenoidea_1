// ============================================
// ISOMORPHIC TREES using AHU Algorithm
// ============================================
// Two trees are isomorphic if they have the same structure
// (regardless of node labels or IDs)

// Import existing functions
const treeCenter = require('./centreNodesOfTree.js')
const rootedTree = require('./rootedtree.js')

/**
 * STEP 3: Encode tree structure (RECURSIVE APPROACH)
 * This is the heart of AHU algorithm!
 * 
 * Key Idea: Recursively encode each node based on its children
 * Each node gets an encoding based on its children's encodings
 * 
 * Example encoding:
 * - Leaf node → "()"
 * - Node with children [(), ()] → "(()())"
 * - Node with children [(), (()), (())] → "(()(())(()))"
 *   (children sorted to ensure consistent encoding)
 */
function encodeTreeRecursive(node, children, memo = {}) {
    // Base case: if already encoded, return memoized result
    if (memo[node]) {
        return memo[node]
    }
    
    // Base case: leaf node (no children)
    if (!children[node] || children[node].length === 0) {
        console.log(`🌿 Leaf node ${node}: encoding = "()"`)
        memo[node] = "()"
        return "()"
    }
    
    // Recursive case: encode all children first
    console.log(`📊 Processing node ${node} with children: [${children[node]}]`)
    
    const childEncodings = []
    for (const child of children[node]) {
        const childEncoding = encodeTreeRecursive(child, children, memo)
        childEncodings.push(childEncoding)
    }
    
    // CRITICAL: Sort children encodings for canonical form!
    childEncodings.sort()
    
    // Wrap sorted children encodings in parentheses
    const encoding = `(${childEncodings.join('')})`
    memo[node] = encoding
    
    console.log(`  ✨ Node ${node}: children encodings [${childEncodings}] → "${encoding}"`)
    
    return encoding
}

/**
 * Wrapper function to encode the entire tree
 */
function encodeTree(rootedTreeData) {
    const { children, root } = rootedTreeData
    console.log(`\n🌳 Starting recursive encoding from root: ${root}`)
    const encoding = encodeTreeRecursive(root, children)
    console.log(`\n✨ Final encoding for root ${root}: "${encoding}"`)
    return encoding
}

/**
 * STEP 4: Check if two trees are isomorphic
 * Compare their canonical encodings
 * 
 * Uses the existing treeCenter and rootedTree functions!
 */
function areTreesIsomorphic(edges1, edges2) {
    // Edge case: different number of edges → not isomorphic
    if(edges1.length !== edges2.length) {
        return false
    }
    
    // Special case: single node
    if(edges1.length === 0 && edges2.length === 0) {
        return true
    }
    
    const centers1 = treeCenter(edges1)
    const centers2 = treeCenter(edges2)
    
    const rooted1 = rootedTree(edges1, centers1[0])
    const encoding1 = encodeTree(rooted1)
    
    const rooted2 = rootedTree(edges2, centers2[0])
    const encoding2 = encodeTree(rooted2)
    
    // STEP 4: Compare encodings
    if(encoding1 === encoding2) {
        console.log("\n✅ RESULT: Trees ARE isomorphic!")
        console.log(`Both have encoding: "${encoding1}"`)
        return true
    }
    
    // If tree has 2 centers, try the second center too
    if(centers1.length === 2 && centers2.length === 2) {
        console.log("\n🔄 Trying second center...")
        const rooted1Alt = rootedTree(edges1, centers1[1])
        const encoding1Alt = encodeTree(rooted1Alt)
        
        if(encoding1Alt === encoding2) {
            console.log("\n✅ RESULT: Trees ARE isomorphic!")
            console.log(`Both have encoding: "${encoding1Alt}"`)
            return true
        }
    }
    
    console.log("\n❌ RESULT: Trees are NOT isomorphic")
    console.log(`Tree 1: "${encoding1}"`)
    console.log(`Tree 2: "${encoding2}"`)
    return false
}

// ============================================
// TEST CASES
// ============================================

console.log("\n" + "🧪 TEST 1: Simple Isomorphic Trees".padEnd(60, "="))
// Tree 1:  0-1-2    Tree 2:  5-6-7
// Both are simple chains → ISOMORPHIC
const tree1 = [[0,1], [1,2]]
const tree2 = [[5,6], [6,7]]
areTreesIsomorphic(tree1, tree2)

console.log("\n\n" + "🧪 TEST 2: Star Trees (Isomorphic)".padEnd(60, "="))
// Tree 1:    1         Tree 2:    10
//          / | \                 / | \
//         0  2  3               9 11 12
const tree3 = [[1,0], [1,2], [1,3]]
const tree4 = [[10,9], [10,11], [10,12]]
areTreesIsomorphic(tree3, tree4)

console.log("\n\n" + "🧪 TEST 3: Different Structures (NOT Isomorphic)".padEnd(60, "="))
// Tree 1:  0-1-2    Tree 2:  5-6
//                            |
//                            7
const tree5 = [[0,1], [1,2]]
const tree6 = [[5,6], [5,7]]
areTreesIsomorphic(tree5, tree6)

console.log("\n\n" + "🧪 TEST 4: Complex Isomorphic Trees".padEnd(60, "="))
// Both trees have same structure but different labels
//     1              10
//    / \            /  \
//   2   3          11  12
//  /     \        /      \
// 4       5      13      14
const tree7 = [[1,2], [1,3], [2,4], [3,5]]
const tree8 = [[10,11], [10,12], [11,13], [12,14]]
areTreesIsomorphic(tree7, tree8)

console.log("\n\n" + "🧪 TEST 5: Subtle Difference (NOT Isomorphic)".padEnd(60, "="))
//     1              10
//    / \            /  \
//   2   3          11  12
//  / \   \        /    / \
// 4   5   6      13   14 15
const tree9 = [[1,2], [1,3], [2,4], [2,5], [3,6]]
const tree10 = [[10,11], [10,12], [11,13], [12,14], [12,15]]
areTreesIsomorphic(tree9, tree10)
