const crystal_ball = (floors ) => {
    const jumpAmount = Math.floor(Math.sqrt(floors))
    let i = jumpAmount
    for (; index < floors.length; i++) {
        if (floors[i]){
            break;
        }
        
    }
    i=i-jumpAmount
    for (let index = 0; index < i && index < floors.length; index++, i++) {
        if(floors[i]){
            return i
        }
    }
    return -1
}