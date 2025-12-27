// ═══════════════════════════════════════════════════════════════
// 🎯 SORTING: THE ONE-PAGE EXPLANATION
// ═══════════════════════════════════════════════════════════════

/*

╔═══════════════════════════════════════════════════════════════╗
║  ❓ QUESTION: Why is sorting CRITICAL?                        ║
╚═══════════════════════════════════════════════════════════════╝

SHORT ANSWER:
─────────────
Without sorting, the SAME tree can produce DIFFERENT encodings
depending on the order children are processed → Algorithm breaks!


╔═══════════════════════════════════════════════════════════════╗
║  🔴 THE PROBLEM (Without Sorting)                             ║
╚═══════════════════════════════════════════════════════════════╝

Example Tree:
       A
      /|\
     B C D

Scenario 1: Children stored as [B, C, D]
───────────────────────────────────────
encode(B) → "()"
encode(C) → "()"
encode(D) → "()"
Concatenate: "()" + "()" + "()" → "(()()()"
Result: "(()()()" ✅

Scenario 2: Children stored as [D, C, B] (different order!)
────────────────────────────────────────────────────────────
encode(D) → "()"
encode(C) → "()"
encode(B) → "()"
Concatenate: "()" + "()" + "()" → "(()()()"
Result: "(()()()" ✅

Wait, these are the same! That's because all children are leaves.

Let's try a different example:

       A
      /|\
     B C D
     |   |
     E   F

Scenario 1: Children of A stored as [B, C, D]
─────────────────────────────────────────────
encode(B) → "(())" (B has child E)
encode(C) → "()"   (C is leaf)
encode(D) → "(())" (D has child F)
Concatenate WITHOUT SORT: "(())" + "()" + "(())"
Result: "((())()(()))" ❌

Scenario 2: Children of A stored as [D, C, B]
─────────────────────────────────────────────
encode(D) → "(())" (D has child F)
encode(C) → "()"   (C is leaf)
encode(B) → "(())" (B has child E)
Concatenate WITHOUT SORT: "(())" + "()" + "(())"
Result: "((())()(()))" ❌

Wait, these are STILL the same because D and B have same structure!

Let's make it DIFFERENT:

       A
      /|\
     B C D
    /    |\
   E     F G

Scenario 1: Children of A = [B, C, D]
─────────────────────────────────────
B has [E]: encode(B) → "(())"
C has []:  encode(C) → "()"
D has [F,G]: encode(D) → "(()())"
Concatenate WITHOUT SORT: "(())" + "()" + "(()())"
Result: "((())()(()()))" ❌

Scenario 2: Children of A = [D, B, C] (different order!)
────────────────────────────────────────────────────────
D has [F,G]: encode(D) → "(()())"
B has [E]:   encode(B) → "(())"
C has []:    encode(C) → "()"
Concatenate WITHOUT SORT: "(()())" + "(())" + "()"
Result: "((()())(())())" ❌

"((())()(()()))" ≠ "((()())(())())"

🚨 SAME TREE, DIFFERENT ENCODINGS! 🚨


╔═══════════════════════════════════════════════════════════════╗
║  ✅ THE SOLUTION (With Sorting)                               ║
╚═══════════════════════════════════════════════════════════════╝

Same tree, different child order:

Scenario 1: Children of A = [B, C, D]
─────────────────────────────────────
Encodings: ["(())", "()", "(())"]
SORT: ["()", "(())", "(())"]
Result: "(()(())(()))" ✅

Scenario 2: Children of A = [D, B, C]
─────────────────────────────────────
Encodings: ["(())", "()", "(())"]
SORT: ["()", "(())", "(())"]  (SAME!)
Result: "(()(())(()))" ✅

"(()(())(()))" === "(()(())(()))" → CORRECT! ✅


╔═══════════════════════════════════════════════════════════════╗
║  📊 VISUAL COMPARISON                                         ║
╚═══════════════════════════════════════════════════════════════╝

WITHOUT SORTING:          |  WITH SORTING:
─────────────────────────────────────────────────────────────────
                          |
Tree with children        |  Tree with children
[B, C, D]:                |  [B, C, D]:
  Codes: [a, b, c]        |    Codes: [a, b, c]
  Result: "abc" ❌        |    Sort: [a, b, c]
                          |    Result: "abc" ✅
                          |
Tree with children        |  Tree with children
[D, B, C]:                |  [D, B, C]:
  Codes: [c, a, b]        |    Codes: [c, a, b]
  Result: "cab" ❌        |    Sort: [a, b, c]
                          |    Result: "abc" ✅
                          |
"abc" ≠ "cab" 🚨          |  "abc" === "abc" ✅


╔═══════════════════════════════════════════════════════════════╗
║  💡 KEY INSIGHTS                                              ║
╚═══════════════════════════════════════════════════════════════╝

1. CANONICAL FORM
   ─────────────────
   Sorting creates a STANDARD representation
   Same structure → ALWAYS same encoding
   
2. ORDER-INDEPENDENT
   ─────────────────
   Doesn't matter how children are stored in memory
   Doesn't matter which order edges were added
   Result is CONSISTENT
   
3. DETERMINISTIC
   ─────────────────
   Same input → ALWAYS same output
   Reliable and predictable
   
4. NECESSARY FOR CORRECTNESS
   ─────────────────────────
   Without sorting: FALSE NEGATIVES
   (Says trees are different when they're the same)
   
   With sorting: CORRECT RESULTS
   (Properly identifies isomorphic trees)


╔═══════════════════════════════════════════════════════════════╗
║  🧠 MEMORY ANCHOR                                             ║
╚═══════════════════════════════════════════════════════════════╝

"Sorting is the STANDARDIZATION step"

Think of it like addresses:
  Without standard: "Main St, 123" vs "123 Main St" → Different!
  With standard: Always "123 Main St" → Same! ✅

Or phone numbers:
  Without standard: "555-1234" vs "5551234" → Different!
  With standard: Always "555-1234" → Same! ✅

Tree encoding:
  Without sorting: ["a","b","c"] vs ["c","a","b"] → Different!
  With sorting: Always ["a","b","c"] → Same! ✅


╔═══════════════════════════════════════════════════════════════╗
║  ⚠️ WHAT HAPPENS WITHOUT SORTING?                            ║
╚═══════════════════════════════════════════════════════════════╝

Real-world consequences:

1. FALSE NEGATIVES (Most common)
   ─────────────────────────────
   Two identical trees appear different
   Algorithm fails to recognize isomorphism
   
   Example in practice:
   - Same molecular structure detected as different
   - Same code AST marked as plagiarism
   - Same network topology treated as unique

2. UNRELIABLE RESULTS
   ───────────────────
   Running algorithm twice might give different results
   Results depend on:
   • How graph was constructed
   • Edge insertion order
   • Memory layout
   • Hash table iteration order

3. IMPOSSIBLE TO DEBUG
   ────────────────────
   "Works on my machine" syndrome
   Different results on different runs
   Impossible to reproduce bugs

4. ALGORITHM IS BROKEN
   ────────────────────
   The AHU algorithm mathematically REQUIRES canonical form
   Without it, the theoretical guarantees don't hold


╔═══════════════════════════════════════════════════════════════╗
║  ✅ CORRECT CODE                                              ║
╚═══════════════════════════════════════════════════════════════╝

function encode(node, children, memo) {
    if (memo[node]) return memo[node]
    if (!children[node]?.length) return "()"
    
    const childEncodings = children[node].map(child => 
        encode(child, children, memo)
    )
    
    childEncodings.sort()  // ⚠️ THIS LINE IS CRITICAL!
    
    const result = `(${childEncodings.join('')})`
    memo[node] = result
    return result
}

Without that .sort() line, the entire algorithm is broken! 🚨


╔═══════════════════════════════════════════════════════════════╗
║  🎯 FINAL ANSWER                                              ║
╚═══════════════════════════════════════════════════════════════╝

Q: Why is sorting critical?

A: Because tree children can be stored in ANY order, and without
   sorting, the SAME tree produces DIFFERENT encodings depending
   on that order. This breaks the algorithm's ability to detect
   isomorphism correctly.

Q: What happens without sorting?

A: The algorithm gives WRONG RESULTS:
   - Same trees appear different (false negatives)
   - Results are non-deterministic
   - Algorithm is fundamentally broken

Q: How does sorting fix it?

A: Sorting creates a CANONICAL (standardized) encoding where:
   - Same structure → Always same encoding
   - Order-independent → Reliable results
   - Deterministic → Reproducible behavior


Remember: "Sort = Standard = Correct" 🎯

*/
