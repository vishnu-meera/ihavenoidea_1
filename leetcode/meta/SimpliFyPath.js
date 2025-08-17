const simplifyPath = function (path) {
    if(path.length < 1){
        return undefined
    }

    const tokens = []
    let result = ""
    for (let i = 0; i < path.length; i++) {
        if (path[i] === "/" ){
            if (result.length > 0) {
                if(result === ".."){
                    if(tokens.length > 0) {
                        tokens.pop()
                    }
                    result=""
                    continue
                }else if(result === "."){
                    result=""
                    continue
                }else{
                    tokens.push("/"+result)
                    result=""
                }
            }
        }
        else if (path[i] !== "/"){
            result+=path[i]
        }
    }

    if (result.length > 0) {
        tokens.push("/"+result)
        result=""
    }
    
    if(tokens.length === 0 && path.length !== 0 ) {
        return "/"
    }else {
        for(let i=0; i<tokens.length;i++){
            result+=tokens[i]
        }
        return result
    }
};

const changeDirectory = function(cwd, path){
    if(path[0]==="/"){
        return simplifyPath(path)
    }else {
        const currDir = simplifyPath(cwd)
        return simplifyPath(currDir + "/" + path)
    }
}

console.log(simplifyPath("/.../a/../b/c/../d/./"))
console.log(simplifyPath("/../"))
console.log(simplifyPath("/home/user/Documents/../Pictures"))
console.log(changeDirectory("/a/b/c", "/d/./e"))
console.log(changeDirectory("", "/d/./e"))
console.log(changeDirectory("/a/b/c", ""))
console.log(changeDirectory("/a/b", ".//c/../../d/f"))