// ============================================
// 🎨 VISUAL STEP-BY-STEP EXAMPLE
// ============================================
// Watch the encoding happen in real-time!

console.log(`
╔═══════════════════════════════════════════════════════════════╗
║           ISOMORPHIC TREES - VISUAL WALKTHROUGH              ║
╔═══════════════════════════════════════════════════════════════╗

Let's check if these two trees are isomorphic:

TREE 1:                    TREE 2:
    1                          A
   /|\\                        /|\\
  2 3 4                      B C D
 /   \\                      /   \\
5     6                    E     F


═══════════════════════════════════════════════════════════════
STEP 1: FIND CENTERS 📍
═══════════════════════════════════════════════════════════════

TREE 1 degrees:
  Node 1: degree 3 (connected to 2,3,4)
  Node 2: degree 2 (connected to 1,5)
  Node 3: degree 2 (connected to 1,6)
  Node 4: degree 1 (leaf)
  Node 5: degree 1 (leaf)
  Node 6: degree 1 (leaf)

Initial leaves: [4, 5, 6]

Peel layer 1:
  Remove 4,5,6
  Node 1: degree 3 → 2 (removed 4)
  Node 2: degree 2 → 1 (removed 5) ← becomes leaf
  Node 3: degree 2 → 1 (removed 6) ← becomes leaf
  
New leaves: [2, 3]
Remaining nodes: 3

Peel layer 2:
  Remove 2,3
  Node 1: degree 2 → 0
  Remaining: 1 node
  
CENTER OF TREE 1: Node 1 ✓

Similarly for TREE 2: CENTER is Node A ✓


═══════════════════════════════════════════════════════════════
STEP 2: ROOT THE TREES 🌳
═══════════════════════════════════════════════════════════════

TREE 1 (rooted at 1):        TREE 2 (rooted at A):
      1 (root)                     A (root)
     /|\\                          /|\\
    2 3 4                        B C D
   /   \\                        /   \\
  5     6                      E     F

Children map:
Tree 1:                      Tree 2:
  1 → [2, 3, 4]               A → [B, C, D]
  2 → [5]                     B → [E]
  3 → [6]                     C → [F]
  4 → []                      D → []
  5 → []                      E → []
  6 → []                      F → []


═══════════════════════════════════════════════════════════════
STEP 3: ENCODE ITERATIVELY (Bottom-Up) 🔤
═══════════════════════════════════════════════════════════════

TREE 1 ENCODING:
----------------

🌿 Layer 1 (Leaves): [4, 5, 6]
   Node 4: () 
   Node 5: ()
   Node 6: ()
   
   Encoding so far:
   {4: "()", 5: "()", 6: "()"}


📊 Layer 2: Process parents of leaves
   
   Node 2: children = [5]
          child encodings = ["()"]
          encoding = "(())"
          
   Node 3: children = [6]
          child encodings = ["()"]
          encoding = "(())"
          
   Node 4: already done (leaf)
   
   Encoding so far:
   {4: "()", 5: "()", 6: "()", 2: "(())", 3: "(())"}


📊 Layer 3: Process root
   
   Node 1: children = [2, 3, 4]
          child encodings = ["(())", "(())", "()"]
          SORT: ["()", "(())", "(())"]
          encoding = "()(())(())"
          
   Final encoding: "()(())(())" ✨


TREE 2 ENCODING:
----------------

🌿 Layer 1 (Leaves): [D, E, F]
   Node D: ()
   Node E: ()
   Node F: ()


📊 Layer 2:
   Node B: children = [E]
          encoding = "(())"
          
   Node C: children = [F]
          encoding = "(())"
          
   Node D: already done


📊 Layer 3:
   Node A: children = [B, C, D]
          child encodings = ["(())", "(())", "()"]
          SORT: ["()", "(())", "(())"]
          encoding = "()(())(())"
          
   Final encoding: "()(())(())" ✨


═══════════════════════════════════════════════════════════════
STEP 4: COMPARE ✅
═══════════════════════════════════════════════════════════════

Tree 1 encoding: "()(())(())"
Tree 2 encoding: "()(())(())"

"()(())(())" === "()(())(())" → TRUE! ✅

🎉 RESULT: Trees ARE ISOMORPHIC! 🎉


═══════════════════════════════════════════════════════════════
🧠 KEY INSIGHT
═══════════════════════════════════════════════════════════════

Notice that:
- Node labels are COMPLETELY DIFFERENT (1,2,3... vs A,B,C...)
- But STRUCTURE is IDENTICAL
- The encoding captures only the STRUCTURE
- Same encoding = Same structure = ISOMORPHIC!

Think of it like:
  Same skeleton 💀 Different skin 🎭


═══════════════════════════════════════════════════════════════
🎯 WHY SORTING MATTERS
═══════════════════════════════════════════════════════════════

At Node 1/A, we have children: [2,3,4] / [B,C,D]

Their encodings: ["(())", "(())", "()"]

WITHOUT sorting, we might process them in different orders:
  - Could be "(())(())()" if we process 2,3,4
  - Could be "()(())(())" if we process 4,2,3
  - Could be "(())()(())" if we process 2,4,3
  
All different codes for the SAME structure! ❌

WITH sorting: ALWAYS ["()", "(())", "(())"]
  - Result is ALWAYS "()(())(())"
  - Consistent across all trees with this structure! ✅
  
Memory anchor: "Sort = Standardize = Compare correctly"


╚═══════════════════════════════════════════════════════════════╝
`);
