/**
 * @param {string} s
 * @return {string}
 */

var isVowel = c => {
    if (c === 'a' || c === 'e' || c === 'i' || c === 'o' || c === 'u' || c === 'A' || c === 'E' || c === 'I' || c === 'O' || c === 'U'){
        return true
    }
    return false
}
var reverseVowels = function(s) {
    const stack = []
    let retValue = ''
    for (const c of s){
        if (isVowel(c)){
            stack.push(c)
        }
    }
    for (const c of s){
        if (isVowel(c)){
            retValue+=stack.pop()
        } else{
            retValue+=c
        }
    }
    return retValue
};

console.log(reverseVowels('vishnu'))