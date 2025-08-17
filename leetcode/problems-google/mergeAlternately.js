/**
 * @param {string} word1
 * @param {string} word2
 * @return {string}
 */
var mergeAlternately = function(word1, word2) {
    let w1 = word1.length
    let w2 = word2.length
    let retvalue = ''
    let len = Math.min(w1,w2)
    let i = 0
    while(i<len){
        retvalue+= word1[i] + word2[i]
        i++
    }
    if(w1<w2){
        retvalue+=word2.slice(i)
    }else if(w2<w1){
        retvalue+=word1.slice(i)
    }
    return retvalue
};