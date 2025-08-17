/**
 * @param {string} s
 * @return {string}
 */
var minRemoveToMakeValid = function(s) {
    const ret = Array.from(s)
    let extra_open = 0
    let total_open = 0
    let j = 0
    for(let i=0;i<ret.length; i++){
        const ch = ret[i]
        if (ch===")"){
            if (extra_open === 0) {
                continue
            }
            extra_open--
            ret[j++] = ch
        }else if (ch==="(") {
            extra_open++
            total_open++
            ret[j++] = ch
        }
        else {
            ret[j++] = ch
        }
    }
    let keep = total_open - extra_open
    let k = 0
    for(let i=0;i<j;i++){
        const ch = ret[i]
        if (ch === "("){
            if(keep === 0){
                continue
            }
            keep--
            ret[k++] = ch
        }else{
            ret[k++] = ch
        }
    }
    return ret.slice(0,k).join('')
};
