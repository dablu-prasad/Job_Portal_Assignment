
function missinElement(A){
    let n=A.length;
    let sum=(n+1)*(n+2)/2
    let trueSum=0
    for(let i=0;i<n;i++){
        trueSum+=A[i]
    }
    return sum-trueSum;
}

const A=[2,3,1,5]
console.log("Data",missinElement(A))