
//Consecutive operation
function maxCounteters(N,A){
    let counter =new Array(N).fill(0)
    let maxCounterValue=0
    function setToMax(Arr){
        for(let i=0;i<Arr.length;i++){
            Arr[i]+=maxCounterValue;
        }
        return Arr;
    }
    
    // performing the operation on the counter
    for(let i=0;i<A.length;i++){
        let counterPos=A[i];
        console.log("counterPos",counterPos)
        if(counterPos>N){
            setToMax(counter);
            continue;
        }
        console.log("counter[counterPos-1]",counter[counterPos-1])
        counter[counterPos-1]++;
        if(counter[counterPos-1]>maxCounterValue){
            maxCounterValue=counter[counterPos-1];
        }
    }
    return counter
    }
    
    const NumOfCounter=5
    const ConsecutiveOperation=[3,4,4,6,1,4,4]
    console.log("You are given N Counter: ",maxCounteters(NumOfCounter,ConsecutiveOperation))




//     Task Description:
// You are given N counters, initially set to 0, and you have two possible operations on them:

// increase(X) − counter X is increased by 1,
// max counter − all counters are set to the maximum value of any counter.
// A non-empty array A of M integers is given. This array represents consecutive operations:

// if A[K] = X, such that 1 ≤ X ≤ N, then operation K is increase(X),
// if A[K] = N + 1 then operation K is max counter.
// For example, given integer N = 5 and array A such that:

//     A[0] = 3
//     A[1] = 4
//     A[2] = 4
//     A[3] = 6
//     A[4] = 1
//     A[5] = 4
//     A[6] = 4
// the values of the counters after each consecutive operation will be:

//     (0, 0, 1, 0, 0)
//     (0, 0, 1, 1, 0)
//     (0, 0, 1, 2, 0)
//     (2, 2, 2, 2, 2)
//     (3, 2, 2, 2, 2)
//     (3, 2, 2, 3, 2)
//     (3, 2, 2, 4, 2)
// The goal is to calculate the value of every counter after all operations.
