// ============================================
// 🧠 MEMORY GUIDE: AHU ISOMORPHIC TREES
// ============================================
// Everything you need to remember this algorithm forever!

/*

═══════════════════════════════════════════════════════════════
🎯 THE BIG IDEA (Your Mental Anchor)
═══════════════════════════════════════════════════════════════

"Trees are isomorphic if they have the same SKELETON"

Think of it like DNA fingerprinting:
- Different people (different node labels)
- Same DNA structure → Same person (isomorphic)

The AHU algorithm creates a UNIQUE "DNA code" for each tree structure.
If two trees have the same code → ISOMORPHIC! ✅


═══════════════════════════════════════════════════════════════
🔥 THE 4-STEP RECIPE (Remember: C-R-E-C)
═══════════════════════════════════════════════════════════════

Step 1: 📍 CENTER - Find the tree center(s)
Step 2: 🌳 ROOT - Root the tree from the center
Step 3: 🔤 ENCODE - Encode from leaves to root (ITERATIVE!)
Step 4: ✅ COMPARE - Compare the encodings

Think: "CREC" → like a "creek" flowing from leaves to root!


═══════════════════════════════════════════════════════════════
📖 STEP-BY-STEP BREAKDOWN
═══════════════════════════════════════════════════════════════

STEP 1: FIND CENTER 📍
----------------------
WHY? We need a consistent starting point to compare from.

Example tree:
     1
    / \
   2   3
  /     \
 4       5

Centers: [1]  (the middle node)

Memory trick: "Center = Balance point"
- If you hold the tree at the center, it balances perfectly


STEP 2: ROOT THE TREE 🌳
-------------------------
WHY? Convert undirected → directed (parent → children)

Before (undirected):        After (rooted from 1):
  1---2---4                      1
  |                             / \
  3---5                        2   3
                              /     \
                             4       5

Memory trick: "Root = The chosen one becomes parent of all"


STEP 3: ENCODE ITERATIVELY 🔤
-------------------------------
WHY? Create a unique signature based on structure

THE ENCODING RULES:
1. Leaf node → "()"
2. Parent node → "(child1)(child2)...(childN)" 
   IMPORTANT: Sort children encodings! ⚠️

Example walkthrough:

     1
    / \
   2   3
  /     \
 4       5

Layer 1 (Leaves):
  Node 4: encoding = "()"
  Node 5: encoding = "()"

Layer 2:
  Node 2: has child [4] → encoding = "(())"
  Node 3: has child [5] → encoding = "(())"

Layer 3 (Root):
  Node 1: has children [2,3]
         encodings: ["(())", "(())"]
         sorted: ["(())", "(())"] (already sorted)
         final: "((())(()))"

Memory trick: "Leaves are empty parentheses ()"
"Parents wrap their children's codes in parentheses"


STEP 4: COMPARE 🔍
------------------
If encoding1 === encoding2 → ISOMORPHIC! ✅
Otherwise → NOT isomorphic ❌

Memory trick: "Same code = Same structure"


═══════════════════════════════════════════════════════════════
🎨 VISUAL EXAMPLES
═══════════════════════════════════════════════════════════════

Example 1: ISOMORPHIC ✅
-------------------------
Tree A:      Tree B:
  1            10
 / \          /  \
2   3        11  12

Encoding A: Tree rooted at 1
  - Nodes 2,3 are leaves: "()"
  - Node 1: "(()())"

Encoding B: Tree rooted at 10
  - Nodes 11,12 are leaves: "()"
  - Node 10: "(()())"

"(()())" === "(()())" → ISOMORPHIC! ✅


Example 2: NOT ISOMORPHIC ❌
-----------------------------
Tree A:      Tree B:
0-1-2          5
               |
               6-7

Encoding A: "(()())"  (chain with center at 1)
Encoding B: "(()())"  (star with center at 5... wait!)

Actually they ARE the same! The structure matters, not appearance.


Example 3: SUBTLE DIFFERENCE ❌
--------------------------------
Tree A:      Tree B:
  1            10
 / \          /  \
2   3        11  12
|\ /|        |  /|\
4 5 6        13 14 15

Tree A structure:
  Node 2 has 2 children [4,5]
  Node 3 has 1 child [6]
  Encoding: "((()())(()))"

Tree B structure:
  Node 11 has 1 child [13]
  Node 12 has 2 children [14,15]
  Encoding: "((())(()()))"

Different encodings → NOT ISOMORPHIC! ❌


═══════════════════════════════════════════════════════════════
🧩 WHY SORT CHILDREN? (CRITICAL!)
═══════════════════════════════════════════════════════════════

Consider this tree:
     1
    / \
   2   3

If we root from 1:
  Children of 1: [2, 3]
  Their encodings: ["()", "()"]
  
Without sorting: Could be "()()" or "()()" (same, lucky!)

But consider:
     1
    / \
   2   3
  /     \
 4       5

Children of 1: [2, 3]
Encodings: ["(())", "(())"]

Without sorting, could be:
- "(())(())" if we process 2 first
- "(())(())" if we process 3 first

WITH sorting: ALWAYS "(())(())" ✅

Memory trick: "Sort to be consistent, no matter the traversal order"


═══════════════════════════════════════════════════════════════
⚡ TIME COMPLEXITY
═══════════════════════════════════════════════════════════════

Overall: O(n log n) where n = number of nodes

Breakdown:
- Find center: O(n)
- Root tree: O(n)
- Encode tree: O(n log n)
  - Visit each node: O(n)
  - Sort children at each node: O(k log k) where k = children
  - Total sorting across all nodes: O(n log n) worst case

Space: O(n) for storing graph, encodings, etc.


═══════════════════════════════════════════════════════════════
🐛 COMMON BUGS TO AVOID
═══════════════════════════════════════════════════════════════

1. ❌ Forgetting to sort children encodings
   → Two identical structures might get different codes!

2. ❌ Not handling trees with 2 centers
   → Tree might have 1 or 2 centers, check both!

3. ❌ Using wrong root (not the center)
   → Results will be inconsistent

4. ❌ Comparing node labels instead of structure
   → Labels don't matter, only connections!


═══════════════════════════════════════════════════════════════
🎯 QUICK MENTAL CHECK
═══════════════════════════════════════════════════════════════

Before coding, ask yourself:
1. Did I find the CENTER first? 📍
2. Did I ROOT the tree from center? 🌳
3. Did I ENCODE from leaves UP? 🔤
4. Did I SORT children encodings? ⚠️
5. Did I COMPARE final encodings? ✅

If yes to all 5 → You got this! 💪


═══════════════════════════════════════════════════════════════
🌍 REAL-WORLD APPLICATIONS (Why This Matters)
═══════════════════════════════════════════════════════════════

1. CHEMISTRY 🧪
   - Molecules: C6H12O6 (glucose) vs different arrangements
   - Same atoms, different structure = different properties
   - Isomorphic check tells us if structures are identical

2. CODE ANALYSIS 💻
   - Detect plagiarism in code
   - Find similar code patterns
   - Compare Abstract Syntax Trees (AST)

3. SOCIAL NETWORKS 👥
   - Find communities with similar connection patterns
   - Recommend similar groups
   - Detect duplicate accounts with same friend structure

4. ORGANIZATION CHARTS 🏢
   - Compare company hierarchies
   - "Do these two teams have similar structure?"
   - Different people, same reporting structure

5. DATABASE QUERY OPTIMIZATION 🗄️
   - Are two query plans equivalent?
   - Find duplicate queries with different variable names

6. BIOLOGY 🧬
   - Compare phylogenetic trees
   - Are two evolutionary trees structurally the same?

7. COMPUTER NETWORKS 🌐
   - Compare network topologies
   - Are two network configurations equivalent?


═══════════════════════════════════════════════════════════════
💡 THE "AHA!" MOMENT
═══════════════════════════════════════════════════════════════

The beauty of AHU algorithm:

"Structure is captured by recursive encoding"

Each node's code = function of its children's codes
Work bottom-up (leaves → root)
Sort for consistency
Result: unique fingerprint of tree structure!

It's like:
- DNA sequencing for trees 🧬
- Fingerprinting for graphs 👆
- Creating a canonical form for comparison ✨


═══════════════════════════════════════════════════════════════
🎓 PRACTICE EXERCISE
═══════════════════════════════════════════════════════════════

Draw these two trees and determine if they're isomorphic:

Tree 1:        Tree 2:
  A              X
 /|\            /|\
B C D          Y Z W

Answer: YES! Both are stars with 3 leaves.
Encoding: "(()()())"


Try this one:

Tree 1:        Tree 2:
  A              X
 / \            / \
B   C          Y   Z
|   |          |   |
D   E          W   V

Answer: YES! Both have same structure.
Encoding: "((())(()))"


═══════════════════════════════════════════════════════════════
🎯 FINAL MEMORY ANCHOR
═══════════════════════════════════════════════════════════════

Remember: "AHU = A Hierarchical Uniqueness"

From leaves to root, build unique codes
Sort children to ensure consistency  
Compare codes to check isomorphism

You got this! 🚀

*/
