function DivCount(A,B,K){
    let offset=0;
    if(A%K==0) offset =1;
    return parseInt(B/K)-parseInt(A/K) + offset
}

const A= 6
const B= 11
const K=2
console.log("File changes",DivCount(A,B,K))



// I initially kept doing this: (B-A)/K + Offset and continued wondering why it didn't work. Took me a while to realize what was up. Prefix SUM!

// Task description
// Write a function:
// function solution(A, B, K);

// that, given three integers A, B and K, returns the number of integers within the range [A..B] that are divisible by K.

// For example, for A = 6, B = 11 and K = 2, your function should return 3, because there are three numbers divisible by 2 within the range [6..11], namely 6, 8 and 10.

// Write an efficient algorithm for the following assumptions:

// A and B are integers within the range [0..2,000,000,000];
// K is an integer within the range [1..2,000,000,000];
// A less than or equal to B.